
-- First create the user_role enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'customer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create the has_role function
CREATE OR REPLACE FUNCTION public.has_role(required_role user_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = required_role
  );
END;
$function$;

-- Now set up the site_settings table and policies
INSERT INTO public.site_settings (id, name, description, email, contactphone, address) 
VALUES (1, 'OnAssist', 'Professional tech support services for your home and business', 'support@onassist.com', '+1 (888) 970-1698', '123 Tech Avenue, Suite 100, San Francisco, CA 94107')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  email = EXCLUDED.email,
  contactphone = EXCLUDED.contactphone,
  address = EXCLUDED.address;

-- Add RLS policies for site_settings so admins can manage them
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;

-- Policy for admins to read site settings
CREATE POLICY "Admins can read site settings" ON public.site_settings
  FOR SELECT USING (public.has_role('admin'::user_role));

-- Policy for admins to update site settings  
CREATE POLICY "Admins can update site settings" ON public.site_settings
  FOR UPDATE USING (public.has_role('admin'::user_role));

-- Policy to allow anyone to read site settings (for public display)
CREATE POLICY "Public can read site settings" ON public.site_settings
  FOR SELECT USING (true);
