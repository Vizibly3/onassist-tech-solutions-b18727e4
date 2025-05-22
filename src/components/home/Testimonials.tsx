
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    quote: 'The technician was excellent! He fixed my WiFi issues in less than an hour, and now my whole house has great coverage. Highly recommend!',
    image: '/placeholder.svg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    location: 'Chicago, IL',
    quote: 'I was struggling with setting up my smart home devices until I called OnAssist. Their expert made everything work seamlessly together!',
    image: '/placeholder.svg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Jennifer Smith',
    location: 'Austin, TX',
    quote: 'My computer was running so slowly, but after the OnAssist technician worked on it, it is like having a brand new machine. Worth every penny!',
    image: '/placeholder.svg',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Wilson',
    location: 'Seattle, WA',
    quote: 'The TV mounting service was fantastic. They helped me hide all the cables and even connected all my devices. Very professional service.',
    image: '/placeholder.svg',
    rating: 4,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    location: 'Denver, CO',
    quote: 'I needed help setting up my home office, and OnAssist delivered! Great service, friendly technician, and now my work-from-home setup is perfect.',
    image: '/placeholder.svg',
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section className="py-20 bg-onassist-primary text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-onassist-secondary/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            We take pride in providing exceptional tech support services and creating happy customers.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 mb-8 shadow-lg border border-white/20">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center mb-1 justify-center md:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={cn(
                        "w-5 h-5", 
                        i < testimonials[activeIndex].rating ? "text-yellow-400" : "text-white/30"
                      )}
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-xl italic mb-4 text-center md:text-left">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                
                <div className="mt-auto text-center md:text-left">
                  <div className="font-bold text-lg">{testimonials[activeIndex].name}</div>
                  <div className="opacity-80">{testimonials[activeIndex].location}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial Selection */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeIndex === index 
                    ? "bg-white w-10" 
                    : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
