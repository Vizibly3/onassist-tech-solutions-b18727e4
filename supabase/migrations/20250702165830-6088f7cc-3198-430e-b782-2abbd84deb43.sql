
-- Add status field to category_service_leads table
ALTER TABLE public.category_service_leads 
ADD COLUMN status boolean DEFAULT true;

-- Add status field to contact_inquiries table  
ALTER TABLE public.contact_inquiries 
ADD COLUMN active_status boolean DEFAULT true;

-- Add status field to newsletter_subscribers table
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN status boolean DEFAULT true;

-- Add status field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN status boolean DEFAULT true;

-- Add status field to service_categories table
ALTER TABLE public.service_categories 
ADD COLUMN active_status boolean DEFAULT true;

-- Add status field to service_leads table
ALTER TABLE public.service_leads 
ADD COLUMN active_status boolean DEFAULT true;

-- Add status field to services table
ALTER TABLE public.services 
ADD COLUMN status boolean DEFAULT true;
