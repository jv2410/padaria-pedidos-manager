-- Corrigir problemas de segurança identificados pelo linter

-- Habilitar RLS nas tabelas que estavam sem
ALTER TABLE public.admin_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caregiver_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dados_cliente ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dre_parameters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machina_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machina_machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machina_service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operational_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_caregiver_shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_evolutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_physical_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Corrigir funções com search_path mutable - adicionar SET search_path = ''
DROP FUNCTION IF EXISTS public.initialize_user_data(UUID);
CREATE OR REPLACE FUNCTION public.initialize_user_data(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  supplier_data RECORD;
  new_supplier_uuid UUID;
BEGIN
  -- Lista dos 26 fornecedores padrão com seus produtos
  FOR supplier_data IN 
    SELECT * FROM (VALUES
      ('1', 'CIERS'),
      ('2', 'BOM PRINCÍPIO'),
      ('3', 'NESTLÉ'),
      ('4', 'ORQUÍDEA'),
      ('5', 'JOHANN'),
      ('6', 'FRIMESA'),
      ('7', 'MAXXI ATACADO'),
      ('8', 'CASA DO QUEIJO'),
      ('9', 'MOINHO MOTASA'),
      ('10', 'VITA SALGADOS'),
      ('11', 'ITIBAN'),
      ('12', 'SANTA CLARA'),
      ('13', 'SADIA'),
      ('14', 'AVE SERRA'),
      ('15', 'QUATÁ'),
      ('16', 'ROMENA'),
      ('17', 'TIROLEZ'),
      ('18', 'MAJESTADE'),
      ('19', 'POMERANO'),
      ('20', 'YEMA'),
      ('21', 'BERSAGLIO'),
      ('22', 'PURE CLEANS'),
      ('23', 'FRAPORTI'),
      ('24', 'EMBALAGENS KEVIN'),
      ('25', 'PITÚ'),
      ('26', 'DISTRIBUIDOR GERAL')
    ) AS suppliers(id, name)
  LOOP
    -- Inserir fornecedor
    INSERT INTO public.user_suppliers (user_id, supplier_id, name)
    VALUES (p_user_id, supplier_data.id, supplier_data.name)
    RETURNING id INTO new_supplier_uuid;
    
    -- Inserir produtos baseados no fornecedor
    CASE supplier_data.id
      WHEN '1' THEN -- CIERS
        INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
        (p_user_id, new_supplier_uuid, '1-1', 'RICCA FOLHADA'),
        (p_user_id, new_supplier_uuid, '1-2', 'BARRA AO LEITE'),
        (p_user_id, new_supplier_uuid, '1-3', 'BARRA MARFIM'),
        (p_user_id, new_supplier_uuid, '1-4', 'BRÓCOLIS CACAU'),
        (p_user_id, new_supplier_uuid, '1-5', 'CALDO GALINHA');
      WHEN '2' THEN -- BOM PRINCÍPIO
        INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
        (p_user_id, new_supplier_uuid, '2-1', 'RECHEIO DE UVA'),
        (p_user_id, new_supplier_uuid, '2-2', 'DOCE DE LEITE'),
        (p_user_id, new_supplier_uuid, '2-3', 'ABACAXI');
      WHEN '3' THEN -- NESTLÉ
        INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
        (p_user_id, new_supplier_uuid, '3-1', 'LEITE CONDENSADO BASE'),
        (p_user_id, new_supplier_uuid, '3-2', 'BRIGADEIRO BASE'),
        (p_user_id, new_supplier_uuid, '3-3', 'CHOCOLATE BASE');
    END CASE;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

DROP FUNCTION IF EXISTS public.handle_new_user_signup();
CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Inserir no subscribers
  INSERT INTO public.subscribers (user_id, email)
  VALUES (NEW.id, NEW.email);
  
  -- Inicializar dados padrão
  PERFORM public.initialize_user_data(NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = '';