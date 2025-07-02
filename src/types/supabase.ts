
import { Database } from '@/integrations/supabase/types';

export type ServiceLead = Database['public']['Tables']['service_leads']['Row'];
export type ServiceLeadInsert = Database['public']['Tables']['service_leads']['Insert'];
export type ServiceLeadUpdate = Database['public']['Tables']['service_leads']['Update'];
