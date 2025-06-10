
-- Crear función para que el admin pueda ver todos los usuarios
CREATE OR REPLACE FUNCTION public.get_all_users_for_admin()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  created_at timestamp with time zone,
  role text
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    p.id,
    p.email,
    p.full_name,
    p.created_at,
    COALESCE(ur.role::text, 'customer') as role
  FROM public.profiles p
  LEFT JOIN public.user_roles ur ON p.id = ur.user_id
  ORDER BY p.created_at DESC;
$$;
