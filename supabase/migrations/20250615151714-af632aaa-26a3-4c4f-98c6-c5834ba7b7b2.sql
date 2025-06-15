
-- Create site_settings table for storing site-wide config (singleton row, id always 1)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  name text NOT NULL,
  description text,
  contactPhone text,
  email text,
  address text
);

-- Insert default row (id=1)
INSERT INTO public.site_settings (id, name, description, contactPhone, email, address)
VALUES (1, 'OnAssist', 'Your all-in-one home services expert', '+1 (123) 456-7890', 'support@example.com', '123 Main St, City, Country')
ON CONFLICT DO NOTHING;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policy to allow everyone to SELECT
CREATE POLICY "Allow all to read site settings"
  ON public.site_settings
  FOR SELECT
  USING (true);

-- Policy to allow everyone to UPDATE the single row
CREATE POLICY "Allow all to update site settings"
  ON public.site_settings
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
