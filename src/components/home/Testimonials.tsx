
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332c2b2?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'OnAssist saved my day! My WiFi went down during an important video call, and their technician had it up and running in 30 minutes. Professional, fast, and affordable.',
    service: 'WiFi Setup & Configuration'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'I was struggling with my smart home setup for weeks. The OnAssist team came in and had everything connected and working perfectly. Highly recommend!',
    service: 'Smart Home Installation'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Amazing service! They fixed my computer virus issue and taught me how to prevent it in the future. Customer service was exceptional.',
    service: 'Computer Repair & Security'
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'The TV mounting service was flawless. Clean installation, no mess, and they even helped me organize all my cables. Worth every penny!',
    service: 'TV Installation & Mounting'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'OnAssist helped me set up my home office perfectly. From printer installation to network security, they covered everything professionally.',
    service: 'Home Office Setup'
  },
  {
    id: 6,
    name: 'James Miller',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Quick response time and excellent technical knowledge. They recovered all my important files from a crashed hard drive. Lifesavers!',
    service: 'Data Recovery & Backup'
  }
];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real customers say about their OnAssist experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="text-sm text-onassist-primary font-medium">
                  {testimonial.service}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
