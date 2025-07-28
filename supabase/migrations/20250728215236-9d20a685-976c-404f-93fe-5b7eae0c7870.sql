-- Habilitar RLS apenas nas tabelas que ainda não têm
DO $$
BEGIN
    -- Tentar habilitar RLS, ignorar erro se já estiver habilitado
    BEGIN
        ALTER TABLE public.chart_of_accounts ENABLE ROW LEVEL SECURITY;
    EXCEPTION WHEN OTHERS THEN
        -- Ignorar se já estiver habilitado
    END;
    
    BEGIN
        ALTER TABLE public.cost_centers ENABLE ROW LEVEL SECURITY;
    EXCEPTION WHEN OTHERS THEN
        -- Ignorar se já estiver habilitado
    END;
    
    BEGIN
        ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
    EXCEPTION WHEN OTHERS THEN
        -- Ignorar se já estiver habilitado
    END;
END
$$;

-- Criar apenas as políticas que não existem
DO $$
BEGIN
    -- Chart of Accounts
    BEGIN
        CREATE POLICY "Users can manage their company chart of accounts"
        ON public.chart_of_accounts
        USING (company_id = get_user_company_id(auth.uid()))
        WITH CHECK (company_id = get_user_company_id(auth.uid()));
    EXCEPTION WHEN duplicate_object THEN
        -- Política já existe, ignorar
    END;
    
    -- Cost Centers
    BEGIN
        CREATE POLICY "Users can manage their company cost centers"
        ON public.cost_centers
        USING (company_id = get_user_company_id(auth.uid()))
        WITH CHECK (company_id = get_user_company_id(auth.uid()));
    EXCEPTION WHEN duplicate_object THEN
        -- Política já existe, ignorar
    END;
    
    -- Subscribers
    BEGIN
        CREATE POLICY "Allow all operations on subscribers"
        ON public.subscribers
        USING (true)
        WITH CHECK (true);
    EXCEPTION WHEN duplicate_object THEN
        -- Política já existe, ignorar
    END;
END
$$;

-- Sempre recriar as funções para garantir search_path correto
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
  -- Lista dos 3 fornecedores principais
  FOR supplier_data IN 
    SELECT * FROM (VALUES
      ('1', 'CIERS'),
      ('2', 'BOM PRINCÍPIO'),
      ('3', 'NESTLÉ')
    ) AS suppliers(id, name)
  LOOP
    INSERT INTO public.user_suppliers (user_id, supplier_id, name)
    VALUES (p_user_id, supplier_data.id, supplier_data.name)
    RETURNING id INTO new_supplier_uuid;
    
    IF supplier_data.id = '1' THEN
      INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
      (p_user_id, new_supplier_uuid, '1-1', 'RICCA FOLHADA'),
      (p_user_id, new_supplier_uuid, '1-2', 'BARRA AO LEITE'),
      (p_user_id, new_supplier_uuid, '1-3', 'BARRA MARFIM');
    ELSIF supplier_data.id = '2' THEN
      INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
      (p_user_id, new_supplier_uuid, '2-1', 'RECHEIO DE UVA'),
      (p_user_id, new_supplier_uuid, '2-2', 'DOCE DE LEITE'),
      (p_user_id, new_supplier_uuid, '2-3', 'ABACAXI');
    ELSIF supplier_data.id = '3' THEN
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
  INSERT INTO public.subscribers (user_id, email)
  VALUES (NEW.id, NEW.email);
  
  PERFORM public.initialize_user_data(NEW.id);
  
  RETURN NEW;
END;
$function$;