-- Habilitar RLS nas tabelas user_suppliers e user_products que estão sendo usadas na função de inicialização
ALTER TABLE public.user_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_products ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS para user_suppliers
CREATE POLICY "Users can view their own suppliers"
ON public.user_suppliers
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own suppliers"
ON public.user_suppliers
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own suppliers"
ON public.user_suppliers
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own suppliers"
ON public.user_suppliers
FOR DELETE
USING (auth.uid() = user_id);

-- Criar políticas RLS para user_products
CREATE POLICY "Users can view their own products"
ON public.user_products
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own products"
ON public.user_products
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products"
ON public.user_products
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products"
ON public.user_products
FOR DELETE
USING (auth.uid() = user_id);