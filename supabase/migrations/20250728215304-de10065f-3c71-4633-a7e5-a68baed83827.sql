-- Criar função que não está com search_path correto
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Habilitar RLS em mais tabelas que podem estar sem
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Lista de tabelas que precisam de RLS baseado nos dados que vimos
    FOR r IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        AND table_name IN (
            'subscription_plans',
            'user_history', 
            'subscriber_audit',
            'profiles',
            'company_users'
        )
    LOOP
        BEGIN
            EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.table_name);
        EXCEPTION WHEN OTHERS THEN
            -- Ignorar erros (tabela já tem RLS ou não existe)
        END;
    END LOOP;
END
$$;

-- Criar políticas básicas para tabelas importantes que podem estar faltando
DO $$
BEGIN
    -- Profiles
    BEGIN
        CREATE POLICY "Users can view their own profile"
        ON public.profiles
        FOR SELECT
        USING (id = auth.uid());
    EXCEPTION WHEN duplicate_object THEN
        -- Política já existe
    END;
    
    BEGIN
        CREATE POLICY "Users can update their own profile"
        ON public.profiles
        FOR UPDATE
        USING (id = auth.uid())
        WITH CHECK (id = auth.uid());
    EXCEPTION WHEN duplicate_object THEN
        -- Política já existe
    END;
    
    -- Company Users
    BEGIN
        CREATE POLICY "Users can view their company users"
        ON public.company_users
        FOR SELECT
        USING (user_id = auth.uid() OR company_id = get_user_company_id(auth.uid()));
    EXCEPTION WHEN duplicate_object THEN
        -- Política já existe
    END;
    
    BEGIN
        CREATE POLICY "Admins can manage company users"
        ON public.company_users
        FOR ALL
        USING (company_id = get_user_company_id(auth.uid()))
        WITH CHECK (company_id = get_user_company_id(auth.uid()));
    EXCEPTION WHEN duplicate_object THEN
        -- Política já existe
    END;
    
END
$$;