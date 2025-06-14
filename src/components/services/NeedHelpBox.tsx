
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
    <div className="w-full max-w-sm">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white overflow-hidden transform hover:scale-105 transition-all duration-300">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Need Help?</h3>
            <p className="text-white/90 text-base leading-relaxed">
              Get instant support from our certified tech experts
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleContactSupport}
              className="w-full bg-white text-onassist-primary hover:bg-gray-100 font-bold py-4 text-lg shadow-xl rounded-xl transition-all duration-300 hover:shadow-2xl"
            >
              <Phone className="w-5 h-5 mr-3" />
              Contact Support
            </Button>
            
            <Button
              onClick={handleScheduleConsultation}
              variant="outline"
              className="w-full border-2 border-white bg-transparent text-white hover:bg-white hover:text-onassist-primary font-bold py-4 text-lg backdrop-blur-sm rounded-xl transition-all duration-300"
            >
              <Clock className="w-5 h-5 mr-3" />
              Schedule Consultation
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-sm text-white/80 font-medium">
              Available 24/7 • Free consultation
            </p>
            <p className="text-xs text-white/70 mt-2">
              100% Satisfaction Guarantee
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeedHelpBox;
