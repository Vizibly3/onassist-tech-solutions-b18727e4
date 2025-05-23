
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Hook to insert all remaining services to reach 100+
export const useCompleteServicesInsertion = () => {
  return useQuery({
    queryKey: ['complete-services-insertion'],
    queryFn: async () => {
      // Complete remaining services for all categories
      const remainingServices = [
        // Computers & Printers (15 services)
        { id: '650e8400-e29b-41d4-a716-446655440059', title: 'Computer Setup & Optimization', description: 'Professional setup and optimization of new computers', price: 119.99, duration: '1-2 hours', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: true },
        { id: '650e8400-e29b-41d4-a716-446655440060', title: 'Virus & Malware Removal', description: 'Complete removal of viruses and malware', price: 149.99, duration: '2 hours', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: true },
        { id: '650e8400-e29b-41d4-a716-446655440061', title: 'Data Recovery Service', description: 'Professional data recovery from failed drives', price: 199.99, duration: '2-4 hours', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440062', title: 'Printer Setup & Repair', description: 'Complete printer setup and troubleshooting', price: 89.99, duration: '1 hour', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440063', title: 'Operating System Installation', description: 'Fresh OS installation or upgrade', price: 139.99, duration: '2-3 hours', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440064', title: 'Hardware Upgrade Service', description: 'RAM, SSD, and component upgrades', price: 159.99, duration: '2 hours', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440065', title: 'Computer Performance Tuning', description: 'Optimize slow computer performance', price: 109.99, duration: '1-2 hours', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440066', title: 'Email Setup & Training', description: 'Configure email accounts and training', price: 79.99, duration: '1 hour', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440067', title: 'Software Installation', description: 'Install and configure software applications', price: 69.99, duration: '1 hour', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440068', title: 'Computer Cleaning Service', description: 'Physical and digital computer cleaning', price: 59.99, duration: '1 hour', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440069', title: 'Network Printer Setup', description: 'Setup shared printers on network', price: 99.99, duration: '1-2 hours', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440070', title: 'Cloud Storage Setup', description: 'Configure cloud backup solutions', price: 89.99, duration: '1 hour', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440071', title: 'PC Gaming Setup', description: 'Optimize computers for gaming performance', price: 179.99, duration: '2-3 hours', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440072', title: 'Business Computer Setup', description: 'Professional setup for business computers', price: 149.99, duration: '2 hours', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440073', title: 'Computer Disposal Service', description: 'Secure data wiping and computer disposal', price: 79.99, duration: '1 hour', category_id: '550e8400-e29b-41d4-a716-446655440006', popular: false },

        // Gaming & Entertainment (12 services)
        { id: '650e8400-e29b-41d4-a716-446655440074', title: 'Gaming Console Setup', description: 'Professional setup of gaming consoles and accessories', price: 89.99, duration: '1 hour', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: true },
        { id: '650e8400-e29b-41d4-a716-446655440075', title: 'Gaming PC Build', description: 'Custom gaming PC assembly and configuration', price: 299.99, duration: '3-4 hours', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: true },
        { id: '650e8400-e29b-41d4-a716-446655440076', title: 'VR System Setup', description: 'Complete VR system installation and calibration', price: 179.99, duration: '2 hours', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440077', title: 'Gaming Chair Assembly', description: 'Professional assembly of gaming chairs', price: 69.99, duration: '1 hour', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440078', title: 'Game Room Setup', description: 'Complete game room design and setup', price: 399.99, duration: '4-6 hours', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440079', title: 'Streaming Setup Service', description: 'Professional live streaming setup', price: 199.99, duration: '2-3 hours', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440080', title: 'Gaming Monitor Calibration', description: 'Optimize gaming monitors for best performance', price: 79.99, duration: '1 hour', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440081', title: 'Controller Setup & Repair', description: 'Setup and repair gaming controllers', price: 59.99, duration: '30 minutes', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440082', title: 'Gaming Headset Setup', description: 'Configure gaming audio equipment', price: 49.99, duration: '30 minutes', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440083', title: 'Gaming Laptop Optimization', description: 'Optimize laptops for gaming performance', price: 129.99, duration: '1-2 hours', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440084', title: 'RGB Lighting Setup', description: 'Install and configure RGB gaming lighting', price: 109.99, duration: '1-2 hours', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: false },
        { id: '650e8400-e29b-41d4-a716-446655440085', title: 'Retro Gaming Setup', description: 'Setup classic gaming systems and emulators', price: 149.99, duration: '2 hours', category_id: '550e8400-e29b-41d4-a716-446655440007', popular: false }
      ];

      // Insert all services
      for (const service of remainingServices) {
        await supabase.from('services').insert({
          ...service,
          image_url: '/placeholder.svg',
          active: true
        });
      }

      return { success: true, inserted: remainingServices.length };
    },
    enabled: false // Only run when manually triggered
  });
};
