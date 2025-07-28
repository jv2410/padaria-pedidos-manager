import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Users, FileText, BarChart3, Check, ArrowRight, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Landing = () => {
  const { user, session } = useAuth();

  const handleSubscribe = async () => {
    if (!user) {
      // Redireciona para auth se não estiver logado
      window.location.href = '/auth';
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (error) {
        console.error('Error creating checkout:', error);
        return;
      }

      // Abre o Stripe Checkout em nova aba
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const features = [
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "26 Fornecedores Pré-cadastrados",
      description: "Acesso imediato a fornecedores organizados com produtos predefinidos"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Geração Automática de PDFs",
      description: "Crie pedidos profissionais em PDF com controle de estoque"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Histórico Completo",
      description: "Acompanhe todo o histórico de compras e pedidos realizados"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Sistema Isolado por Usuário",
      description: "Seus dados são completamente privados e seguros"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">OrderFlow Pro</span>
          </div>
          <Link to="/auth">
            <Button>
              Entrar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Sistema completo de gestão
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Gerencie seus fornecedores
            <span className="text-primary block">de forma inteligente</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sistema SaaS completo para controle de estoque, fornecedores e pedidos. 
            Mais de 26 fornecedores pré-cadastrados prontos para usar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto">
                Começar gratuitamente
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Ver demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Funcionalidades Poderosas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar fornecedores e pedidos de forma eficiente
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Acesso Completo por Apenas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Um valor justo para todas as funcionalidades do sistema, sem limites ou surpresas.
            </p>
          </div>
          <div className="flex justify-center">
            <Card className="relative border-primary shadow-lg max-w-md w-full">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                Plano Único
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">OrderFlow Pro</CardTitle>
                <CardDescription>Sistema completo de gestão</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">R$ 39,00</span>
                  <span className="text-muted-foreground">/mês</span>
                  <div className="mt-2">
                    <span className="text-sm text-green-600 font-medium">
                      🎁 7 dias grátis para novos usuários
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">26 fornecedores pré-cadastrados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Controle de estoque personalizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Geração automática de PDFs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Histórico completo de compras</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Sistema isolado por usuário</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Interface intuitiva e responsiva</span>
                  </li>
                </ul>
                <Button onClick={handleSubscribe} className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  {user ? 'Assinar Agora' : 'Criar Conta e Assinar'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">OrderFlow Pro</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 OrderFlow Pro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;