
-- Add active field to category_service_leads table
ALTER TABLE public.category_service_leads 
ADD COLUMN active boolean DEFAULT true;

-- Add active field to contact_inquiries table  
ALTER TABLE public.contact_inquiries 
ADD COLUMN active boolean DEFAULT true;

-- Add active field to newsletter_subscribers table
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN active boolean DEFAULT true;

-- Add active field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN active boolean DEFAULT true;

-- Add active field to service_categories table
ALTER TABLE public.service_categories 
ADD COLUMN active boolean DEFAULT true;

-- Add active field to service_leads table
ALTER TABLE public.service_leads 
ADD COLUMN active boolean DEFAULT true;

-- Add active field to services table
ALTER TABLE public.services 
ADD COLUMN active boolean DEFAULT true;
