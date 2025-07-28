import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use the service role key to perform writes (upsert) in Supabase
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Check if user is admin (creator) - replace with your email
    const adminEmails = ["paodanonafornecedores@gmail.com"]; // TODO: Replace with your actual email
    const isAdmin = adminEmails.includes(user.email);
    logStep("Admin check", { isAdmin, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, checking admin status");
      
      if (isAdmin) {
        logStep("Admin user detected, granting full access");
        await supabaseClient.from("subscribers").upsert({
          email: user.email,
          user_id: user.id,
          stripe_customer_id: null,
          subscribed: true,
          subscription_tier: "Admin",
          subscription_end: null,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'email' });
        return new Response(JSON.stringify({ 
          subscribed: true, 
          subscription_tier: "Admin",
          subscription_end: null
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
      
      logStep("Regular user with no customer, updating unsubscribed state");
      await supabaseClient.from("subscribers").upsert({
        email: user.email,
        user_id: user.id,
        stripe_customer_id: null,
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check for both active and trialing subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 10,
    });
    
    // Find active or trialing subscription
    const activeOrTrialingSub = subscriptions.data.find(sub => 
      sub.status === "active" || sub.status === "trialing"
    );
    
    const hasActiveSub = !!activeOrTrialingSub;
    let subscriptionTier = null;
    let subscriptionEnd = null;
    let isTrialing = false;
    let trialEnd = null;

    if (hasActiveSub) {
      const subscription = activeOrTrialingSub;
      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      isTrialing = subscription.status === "trialing";
      
      if (isTrialing && subscription.trial_end) {
        trialEnd = new Date(subscription.trial_end * 1000).toISOString();
        logStep("Trial subscription found", { 
          subscriptionId: subscription.id, 
          trialEnd,
          status: subscription.status 
        });
      } else {
        logStep("Active subscription found", { 
          subscriptionId: subscription.id, 
          endDate: subscriptionEnd,
          status: subscription.status 
        });
      }
      
      // Determina o tier baseado no preço (R$ 39,00 = OrderFlow Pro)
      const priceId = subscription.items.data[0].price.id;
      const price = await stripe.prices.retrieve(priceId);
      const amount = price.unit_amount || 0;
      
      if (amount === 3900) { // R$ 39,00 em centavos
        subscriptionTier = isTrialing ? "OrderFlow Pro (Trial)" : "OrderFlow Pro";
      } else {
        subscriptionTier = isTrialing ? "Premium (Trial)" : "Premium"; // fallback
      }
      logStep("Determined subscription tier", { 
        priceId, 
        amount, 
        subscriptionTier, 
        isTrialing 
      });
    } else if (isAdmin) {
      // Admin override
      logStep("Admin user with no subscription, granting admin access");
      await supabaseClient.from("subscribers").upsert({
        email: user.email,
        user_id: user.id,
        stripe_customer_id: customerId,
        subscribed: true,
        subscription_tier: "Admin",
        subscription_end: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
      return new Response(JSON.stringify({
        subscribed: true,
        subscription_tier: "Admin",
        subscription_end: null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      logStep("No active or trial subscription found");
    }

    await supabaseClient.from("subscribers").upsert({
      email: user.email,
      user_id: user.id,
      stripe_customer_id: customerId,
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' });

    logStep("Updated database with subscription info", { 
      subscribed: hasActiveSub, 
      subscriptionTier, 
      isTrialing,
      trialEnd 
    });
    
    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
      is_trialing: isTrialing,
      trial_end: trialEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});