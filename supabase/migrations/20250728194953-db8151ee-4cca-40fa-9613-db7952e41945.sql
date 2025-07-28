-- Remover trigger antes de alterar as funções
DROP TRIGGER IF EXISTS on_auth_user_created_microsaas ON auth.users;

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
    
    -- Inserir produtos baseados no fornecedor (só alguns para teste)
    CASE supplier_data.id
      WHEN '1' THEN -- CIERS
        INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
        (p_user_id, new_supplier_uuid, '1-1', 'RICCA FOLHADA'),
        (p_user_id, new_supplier_uuid, '1-2', 'BARRA AO LEITE'),
        (p_user_id, new_supplier_uuid, '1-3', 'BARRA MARFIM');
      WHEN '2' THEN -- BOM PRINCÍPIO
        INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
        (p_user_id, new_supplier_uuid, '2-1', 'RECHEIO DE UVA'),
        (p_user_id, new_supplier_uuid, '2-2', 'DOCE DE LEITE');
      WHEN '3' THEN -- NESTLÉ
        INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
        (p_user_id, new_supplier_uuid, '3-1', 'LEITE CONDENSADO BASE'),
        (p_user_id, new_supplier_uuid, '3-2', 'BRIGADEIRO BASE');
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

-- Recriar trigger
CREATE TRIGGER on_auth_user_created_microsaas
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_signup();

DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = '';