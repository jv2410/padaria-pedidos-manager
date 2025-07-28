-- Criar tabela de assinantes para controle de usuários
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT,
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Criar tabela de fornecedores por usuário
CREATE TABLE public.user_suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  supplier_id TEXT NOT NULL, -- ID original do fornecedor
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, supplier_id)
);

-- Criar tabela de produtos por usuário
CREATE TABLE public.user_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_supplier_id UUID REFERENCES public.user_suppliers(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT NOT NULL, -- ID original do produto
  name TEXT NOT NULL,
  current_stock INTEGER DEFAULT 0,
  order_quantity INTEGER DEFAULT 0,
  price NUMERIC DEFAULT 0,
  unit TEXT DEFAULT 'UNIDADE',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Criar tabela de histórico de compras por usuário
CREATE TABLE public.user_purchase_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  supplier_id TEXT NOT NULL,
  supplier_name TEXT NOT NULL,
  date TEXT NOT NULL,
  products JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchase_history ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para subscribers
CREATE POLICY "Users can view their own subscription"
ON public.subscribers
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Users can update their own subscription"
ON public.subscribers
FOR UPDATE
USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Service can manage subscriptions"
ON public.subscribers
FOR ALL
USING (true);

-- Políticas RLS para user_suppliers
CREATE POLICY "Users can manage their own suppliers"
ON public.user_suppliers
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Políticas RLS para user_products
CREATE POLICY "Users can manage their own products"
ON public.user_products
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Políticas RLS para user_purchase_history
CREATE POLICY "Users can manage their own purchase history"
ON public.user_purchase_history
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Função para inicializar dados padrão para novos usuários
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
        (p_user_id, new_supplier_uuid, '1-5', 'CALDO GALINHA'),
        (p_user_id, new_supplier_uuid, '1-6', 'CEREJA'),
        (p_user_id, new_supplier_uuid, '1-7', 'CHANTILLY'),
        (p_user_id, new_supplier_uuid, '1-8', 'CHOCOLATE FORNEÁVEL'),
        (p_user_id, new_supplier_uuid, '1-9', 'CHOCOLATE FRACIONADO BRANCO'),
        (p_user_id, new_supplier_uuid, '1-10', 'CHOCOLATE FRACIONADO PRETO');
      WHEN '2' THEN -- BOM PRINCÍPIO
        INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
        (p_user_id, new_supplier_uuid, '2-1', 'RECHEIO DE UVA'),
        (p_user_id, new_supplier_uuid, '2-2', 'DOCE DE LEITE'),
        (p_user_id, new_supplier_uuid, '2-3', 'ABACAXI'),
        (p_user_id, new_supplier_uuid, '2-4', 'LEITE CONDENSADO'),
        (p_user_id, new_supplier_uuid, '2-5', 'DAMASCO'),
        (p_user_id, new_supplier_uuid, '2-6', 'MORANGO'),
        (p_user_id, new_supplier_uuid, '2-7', 'FRUTAS VERMELHAS');
      WHEN '3' THEN -- NESTLÉ
        INSERT INTO public.user_products (user_id, user_supplier_id, product_id, name) VALUES
        (p_user_id, new_supplier_uuid, '3-1', 'LEITE CONDENSADO BASE'),
        (p_user_id, new_supplier_uuid, '3-2', 'BRIGADEIRO BASE'),
        (p_user_id, new_supplier_uuid, '3-3', 'CHOCOLATE BASE');
    END CASE;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para inicializar dados quando usuário se cadastra
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger
CREATE TRIGGER on_auth_user_created_microsaas
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_signup();

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamps
CREATE TRIGGER update_subscribers_updated_at
  BEFORE UPDATE ON public.subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_suppliers_updated_at
  BEFORE UPDATE ON public.user_suppliers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_products_updated_at
  BEFORE UPDATE ON public.user_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();