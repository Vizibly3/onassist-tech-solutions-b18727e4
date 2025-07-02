
-- Add the three new fields to site_settings table for service guarantee stats
ALTER TABLE public.site_settings 
ADD COLUMN service_warranty_days text,
ADD COLUMN satisfaction_guarantee_percent text,
ADD COLUMN followup_support_text text;
