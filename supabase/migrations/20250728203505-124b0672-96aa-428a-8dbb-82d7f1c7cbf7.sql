-- Corrigir a função initialize_user_data que está causando erro "case not found"
-- Removendo o CASE statement problemático e simplificando a função

CREATE OR REPLACE FUNCTION public.initialize_user_data(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
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