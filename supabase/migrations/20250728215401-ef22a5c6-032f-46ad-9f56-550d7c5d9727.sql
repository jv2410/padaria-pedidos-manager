-- Corrigir a última função sem search_path
CREATE OR REPLACE FUNCTION public.increment_view_count(row_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  current_count INTEGER;
BEGIN
  -- Obter a contagem atual e incrementá-la
  SELECT view_count INTO current_count
  FROM public.prompts
  WHERE id = row_id;
  
  -- Retornar a nova contagem
  RETURN COALESCE(current_count, 0) + 1;
END;
$function$;