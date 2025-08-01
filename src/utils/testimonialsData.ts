export type Testimonial = {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  service: string;
};

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b332c2b2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Smart Doorstep saved my day! My WiFi went down during an important video call, and their technician had it up and running in 30 minutes. Professional, fast, and affordable.",
    service: "WiFi Setup & Configuration",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Austin, TX",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "I was struggling with my smart home setup for weeks. The Smart Doorstep team came in and had everything connected and working perfectly. Highly recommend!",
    service: "Smart Home Installation",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Miami, FL",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Amazing service! They fixed my computer virus issue and taught me how to prevent it in the future. Customer service was exceptional.",
    service: "Computer Repair & Security",
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Seattle, WA",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The TV mounting service was flawless. Clean installation, no mess, and they even helped me organize all my cables. Worth every penny!",
    service: "TV Installation & Mounting",
  },
  {
    id: 5,
    name: "Lisa Wang",
    location: "New York, NY",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Smart Doorstep helped me set up my home office perfectly. From printer installation to network security, they covered everything professionally.",
    service: "Home Office Setup",
  },
  {
    id: 6,
    name: "James Miller",
    location: "Chicago, IL",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Quick response time and excellent technical knowledge. They recovered all my important files from a crashed hard drive. Lifesavers!",
    service: "Data Recovery & Backup",
  },
  // ... 24 more testimonials with similar structure and unique data ...
  {
    id: 7,
    name: "Priya Patel",
    location: "Dallas, TX",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    rating: 5,
    text: "The technician was very knowledgeable and fixed my network issues quickly. Highly recommend Smart Doorstep!",
    service: "Network Troubleshooting",
  },
  {
    id: 8,
    name: "Carlos Martinez",
    location: "Los Angeles, CA",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    rating: 5,
    text: "Great experience! The team was punctual and solved my smart TV setup in no time.",
    service: "Smart TV Setup",
  },
  {
    id: 9,
    name: "Anna Lee",
    location: "Boston, MA",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    rating: 5,
    text: "Very professional and friendly staff. My laptop is running like new again.",
    service: "Laptop Repair",
  },
  {
    id: 10,
    name: "Robert Brown",
    location: "Denver, CO",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    rating: 5,
    text: "Smart Doorstep made my home office setup a breeze. Thank you for the excellent service!",
    service: "Home Office Setup",
  },
  {
    id: 11,
    name: "Jessica Green",
    location: "Portland, OR",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    rating: 5,
    text: "Fast, efficient, and very polite. Fixed my printer issues in no time.",
    service: "Printer Setup & Repair",
  },
  {
    id: 12,
    name: "William Scott",
    location: "Phoenix, AZ",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 5,
    text: "The best tech support I have ever received. Will use again!",
    service: "General Tech Support",
  },
  {
    id: 13,
    name: "Sophia Turner",
    location: "Atlanta, GA",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    rating: 5,
    text: "They set up my security cameras perfectly. I feel much safer now.",
    service: "Security Camera Installation",
  },
  {
    id: 14,
    name: "Benjamin Clark",
    location: "Houston, TX",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    rating: 5,
    text: "Excellent service and very affordable. Fixed my WiFi dead zones.",
    service: "WiFi Optimization",
  },
  {
    id: 15,
    name: "Olivia Adams",
    location: "Philadelphia, PA",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    rating: 5,
    text: "Very happy with the smart home installation. Everything works seamlessly.",
    service: "Smart Home Installation",
  },
  {
    id: 16,
    name: "Matthew Evans",
    location: "San Diego, CA",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    rating: 5,
    text: "Recovered my lost data quickly and efficiently. Thank you!",
    service: "Data Recovery",
  },
  {
    id: 17,
    name: "Chloe White",
    location: "Charlotte, NC",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    rating: 5,
    text: "The technician was very patient and explained everything clearly.",
    service: "Tech Support",
  },
  {
    id: 18,
    name: "Daniel Harris",
    location: "San Jose, CA",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    rating: 5,
    text: "Great job setting up my gaming PC. Runs perfectly now.",
    service: "PC Setup",
  },
  {
    id: 19,
    name: "Grace Lewis",
    location: "Columbus, OH",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    rating: 5,
    text: "Very professional and quick. Fixed my internet issues.",
    service: "Internet Troubleshooting",
  },
  {
    id: 20,
    name: "Henry Walker",
    location: "Fort Worth, TX",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    rating: 5,
    text: "Smart Doorstep is my go-to for all tech problems. Highly recommend.",
    service: "General Tech Support",
  },
  {
    id: 21,
    name: "Ella King",
    location: "Indianapolis, IN",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 5,
    text: "They set up my smart lights and explained how to use them. Very helpful!",
    service: "Smart Lighting Setup",
  },
  {
    id: 22,
    name: "Jack Wright",
    location: "San Francisco, CA",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    text: "Excellent cable management and TV mounting. Looks great!",
    service: "TV Mounting",
  },
  {
    id: 23,
    name: "Mia Baker",
    location: "Jacksonville, FL",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    rating: 5,
    text: "Very satisfied with the home office setup. Fast and professional.",
    service: "Home Office Setup",
  },
  {
    id: 24,
    name: "Luke Hall",
    location: "San Antonio, TX",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    rating: 5,
    text: "They fixed my slow computer and gave great advice for maintenance.",
    service: "Computer Tune-Up",
  },
  {
    id: 25,
    name: "Ava Young",
    location: "Nashville, TN",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    rating: 5,
    text: "The technician was very friendly and fixed my WiFi quickly.",
    service: "WiFi Troubleshooting",
  },
  {
    id: 26,
    name: "Mason Allen",
    location: "Detroit, MI",
    image: "https://randomuser.me/api/portraits/men/26.jpg",
    rating: 5,
    text: "Great experience with Smart Doorstep. Will use again for sure.",
    service: "General Tech Support",
  },
  {
    id: 27,
    name: "Lily Nelson",
    location: "Memphis, TN",
    image: "https://randomuser.me/api/portraits/women/27.jpg",
    rating: 5,
    text: "They set up my smart thermostat and explained everything clearly.",
    service: "Smart Thermostat Setup",
  },
  {
    id: 28,
    name: "Logan Carter",
    location: "Baltimore, MD",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    rating: 5,
    text: "Very knowledgeable and efficient. Fixed my network issues.",
    service: "Network Troubleshooting",
  },
  {
    id: 29,
    name: "Zoe Mitchell",
    location: "Louisville, KY",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    rating: 5,
    text: "Smart Doorstep made my smart home setup easy and stress-free.",
    service: "Smart Home Setup",
  },
  {
    id: 30,
    name: "Ethan Perez",
    location: "Milwaukee, WI",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    rating: 5,
    text: "Quick and professional service. Fixed my printer in minutes.",
    service: "Printer Repair",
  },
];
