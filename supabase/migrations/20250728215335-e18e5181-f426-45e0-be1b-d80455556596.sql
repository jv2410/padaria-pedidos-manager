-- Habilitar RLS nas tabelas que estão sem
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_caregiver_shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_evolutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_regimes ENABLE ROW LEVEL SECURITY;

-- Criar políticas básicas para estas tabelas
-- Cards
CREATE POLICY "Enable all operations on cards"
ON public.cards
USING (true)
WITH CHECK (true);

-- Patient Caregiver Shifts
CREATE POLICY "Enable all operations on patient_caregiver_shifts"
ON public.patient_caregiver_shifts
USING (true)
WITH CHECK (true);

-- Patient Evolutions
CREATE POLICY "Enable all operations on patient_evolutions"
ON public.patient_evolutions  
USING (true)
WITH CHECK (true);

-- Patient Info
CREATE POLICY "Enable all operations on patient_info"
ON public.patient_info
USING (true)
WITH CHECK (true);

-- Patients  
CREATE POLICY "Enable all operations on patients"
ON public.patients
USING (true)
WITH CHECK (true);

-- Subscription Plans
CREATE POLICY "Enable read access to subscription_plans"
ON public.subscription_plans
FOR SELECT
USING (true);

CREATE POLICY "Enable admin operations on subscription_plans"
ON public.subscription_plans
USING (true)
WITH CHECK (true);

-- Tax Regimes
CREATE POLICY "Enable all operations on tax_regimes"
ON public.tax_regimes
USING (true)
WITH CHECK (true);