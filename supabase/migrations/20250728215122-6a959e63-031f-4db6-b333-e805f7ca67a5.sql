-- Habilitar RLS em todas as tabelas que precisam
ALTER TABLE public.chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriber_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Criar políticas básicas para as tabelas que precisam
-- Chart of Accounts
CREATE POLICY "Users can manage their company chart of accounts"
ON public.chart_of_accounts
USING (company_id = get_user_company_id(auth.uid()))
WITH CHECK (company_id = get_user_company_id(auth.uid()));

-- Cost Centers
CREATE POLICY "Users can manage their company cost centers"
ON public.cost_centers
USING (company_id = get_user_company_id(auth.uid()))
WITH CHECK (company_id = get_user_company_id(auth.uid()));

-- User Products
CREATE POLICY "Users can manage their own products"
ON public.user_products
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- User Suppliers
CREATE POLICY "Users can manage their own suppliers"
ON public.user_suppliers
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Subscribers
CREATE POLICY "Users can view their own subscription"
ON public.subscribers
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "System can manage subscriptions"
ON public.subscribers
USING (true)
WITH CHECK (true);

-- User History
CREATE POLICY "Users can view their own history"
ON public.user_history
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "System can create history entries"
ON public.user_history
FOR INSERT
WITH CHECK (true);

-- Subscriber Audit
CREATE POLICY "Admins can view subscriber audit"
ON public.subscriber_audit
FOR SELECT
USING (true);

CREATE POLICY "System can create audit entries"
ON public.subscriber_audit
FOR INSERT
WITH CHECK (true);

-- Corrigir funções sem search_path
CREATE OR REPLACE FUNCTION public.get_user_company_id(user_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  RETURN (
    SELECT company_id
    FROM public.company_users
    WHERE public.company_users.user_id = get_user_company_id.user_id
    LIMIT 1
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.initialize_user_data(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  supplier_data RECORD;
  new_supplier_uuid UUID;
BEGIN
  -- Lista dos 3 fornecedores principais para inicialização simples
  FOR supplier_data IN 
    SELECT * FROM (VALUES
      ('1', 'CIERS'),
      ('2', 'BOM PRINCÍPIO'),
      ('3', 'NESTLÉ')
    ) AS suppliers(id, name)
  LOOP
    -- Inserir fornecedor
    INSERT INTO public.user_suppliers (user_id, supplier_id, name)
    VALUES (p_user_id, supplier_data.id, supplier_data.name)
    RETURNING id INTO new_supplier_uuid;
    
    -- Inserir produtos baseados no fornecedor - apenas produtos básicos
    IF supplier_data.id = '1' THEN -- CIERS
      INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
      (p_user_id, new_supplier_uuid, '1-1', 'RICCA FOLHADA'),
      (p_user_id, new_supplier_uuid, '1-2', 'BARRA AO LEITE'),
      (p_user_id, new_supplier_uuid, '1-3', 'BARRA MARFIM');
    ELSIF supplier_data.id = '2' THEN -- BOM PRINCÍPIO
      INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
      (p_user_id, new_supplier_uuid, '2-1', 'RECHEIO DE UVA'),
      (p_user_id, new_supplier_uuid, '2-2', 'DOCE DE LEITE'),
      (p_user_id, new_supplier_uuid, '2-3', 'ABACAXI');
    ELSIF supplier_data.id = '3' THEN -- NESTLÉ
      INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
      (p_user_id, new_supplier_uuid, '3-1', 'LEITE CONDENSADO BASE'),
      (p_user_id, new_supplier_uuid, '3-2', 'BRIGADEIRO BASE'),
      (p_user_id, new_supplier_uuid, '3-3', 'CHOCOLATE BASE');
    END IF;
  END LOOP;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  -- Inserir no subscribers
  INSERT INTO public.subscribers (user_id, email)
  VALUES (NEW.id, NEW.email);
  
  -- Inicializar dados padrão
  PERFORM public.initialize_user_data(NEW.id);
  
  RETURN NEW;
END;
$function$;