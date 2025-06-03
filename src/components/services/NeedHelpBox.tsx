
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MessageCircle, Clock } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useNavigate } from 'react-router-dom';

interface NeedHelpBoxProps {
  serviceTitle?: string;
}

const NeedHelpBox: React.FC<NeedHelpBoxProps> = ({ serviceTitle }) => {
  const navigate = useNavigate();

  const handleContactSupport = () => {
    window.open(`tel:${siteConfig.contactPhone}`, '_self');
  };

  const handleScheduleConsultation = () => {
    navigate('/contact', { 
      state: { 
        selectedService: serviceTitle,
        subject: `Consultation Request for ${serviceTitle}`
      }
    });
  };

  return (
    <div className="sticky top-24 z-40">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-onassist-primary to-blue-600 text-white overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-white/90 text-sm">
              Get instant support from our tech experts
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleContactSupport}
              className="w-full bg-white text-onassist-primary hover:bg-gray-100 font-semibold"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            
            <Button
              onClick={handleScheduleConsultation}
              variant="outline"
              className="w-full border-white text-white hover:bg-white hover:text-onassist-primary font-semibold"
            >
              <Clock className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20 text-center">
            <p className="text-xs text-white/80">
              Available 24/7 • Free consultation
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeedHelpBox;
