
-- Add the three new fields to site_settings table for category page stats
ALTER TABLE public.site_settings 
ADD COLUMN certified_experts_stat text,
ADD COLUMN customer_satisfaction_stat text,
ADD COLUMN cities_covered_stat text;
