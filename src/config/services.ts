
export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  services: Service[];
};

export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  duration: string;
  popular: boolean;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "smart-home",
    title: "Smart Home",
    description: "Make your home smarter with professional setup and troubleshooting services",
    icon: "home",
    services: [
      {
        id: "smart-speaker-setup",
        title: "Smart Speaker Setup",
        description: "Professional setup of smart speakers like Amazon Echo, Google Home, or Apple HomePod",
        price: 79.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: true,
      },
      {
        id: "smart-thermostat-installation",
        title: "Smart Thermostat Installation",
        description: "Expert installation of smart thermostats like Nest, Ecobee, or Honeywell",
        price: 129.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      },
      {
        id: "smart-lighting-setup",
        title: "Smart Lighting Setup",
        description: "Installation and configuration of smart lighting systems like Philips Hue or LIFX",
        price: 89.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: true,
      },
      {
        id: "smart-lock-installation",
        title: "Smart Lock Installation",
        description: "Professional installation of smart locks for your home security",
        price: 119.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "smart-doorbell-installation",
        title: "Smart Doorbell Installation",
        description: "Expert installation of video doorbells like Ring or Nest Hello",
        price: 99.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "full-smart-home-setup",
        title: "Full Smart Home Setup",
        description: "Complete smart home setup and integration with your preferred ecosystem",
        price: 299.99,
        image: "/placeholder.svg",
        duration: "3-4 hours",
        popular: true,
      },
      {
        id: "smart-appliance-setup",
        title: "Smart Appliance Setup",
        description: "Setup and connection of smart appliances to your home network",
        price: 89.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "voice-assistant-training",
        title: "Voice Assistant Training",
        description: "Learn how to get the most out of your voice assistants",
        price: 69.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "smart-hub-setup",
        title: "Smart Hub Setup",
        description: "Professional setup of smart home hubs like Samsung SmartThings or Hubitat",
        price: 99.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      }
    ]
  },
  {
    id: "wifi-network",
    title: "WiFi & Network",
    description: "Boost your connectivity with our professional WiFi and networking services",
    icon: "wifi",
    services: [
      {
        id: "wifi-setup-optimization",
        title: "WiFi Setup & Optimization",
        description: "Professional setup and optimization of your home WiFi network",
        price: 99.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: true,
      },
      {
        id: "mesh-network-installation",
        title: "Mesh Network Installation",
        description: "Expert installation of mesh WiFi systems for whole-home coverage",
        price: 149.99,
        image: "/placeholder.svg",
        duration: "2 hours",
        popular: true,
      },
      {
        id: "network-troubleshooting",
        title: "Network Troubleshooting",
        description: "Comprehensive diagnosis and repair of network connectivity issues",
        price: 119.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      },
      {
        id: "router-setup",
        title: "Router Setup & Configuration",
        description: "Professional setup and optimization of your WiFi router",
        price: 79.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "network-security-setup",
        title: "Network Security Setup",
        description: "Enhance your network security with professional configuration",
        price: 129.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      },
      {
        id: "wifi-extender-setup",
        title: "WiFi Extender Setup",
        description: "Professional installation of WiFi range extenders to eliminate dead zones",
        price: 89.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "ethernet-wiring",
        title: "Ethernet Wiring",
        description: "Professional installation of ethernet wiring for reliable connectivity",
        price: 149.99,
        image: "/placeholder.svg",
        duration: "2-3 hours",
        popular: false,
      },
      {
        id: "guest-network-setup",
        title: "Guest Network Setup",
        description: "Setup a secure guest network for visitors",
        price: 59.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "modem-troubleshooting",
        title: "Modem Troubleshooting",
        description: "Professional diagnosis and repair of modem issues",
        price: 89.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      }
    ]
  },
  {
    id: "audio-video",
    title: "Audio & Video",
    description: "Enhance your entertainment experience with professional audio and video services",
    icon: "tv",
    services: [
      {
        id: "tv-mounting",
        title: "TV Mounting",
        description: "Professional mounting of your TV on the wall with cable management",
        price: 119.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: true,
      },
      {
        id: "home-theater-setup",
        title: "Home Theater Setup",
        description: "Complete setup and optimization of your home theater system",
        price: 199.99,
        image: "/placeholder.svg",
        duration: "2-3 hours",
        popular: true,
      },
      {
        id: "sound-system-installation",
        title: "Sound System Installation",
        description: "Professional installation of sound systems and speakers",
        price: 149.99,
        image: "/placeholder.svg",
        duration: "2 hours",
        popular: false,
      },
      {
        id: "streaming-device-setup",
        title: "Streaming Device Setup",
        description: "Setup and configuration of streaming devices like Roku, Apple TV, or Fire TV",
        price: 79.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: true,
      },
      {
        id: "projector-installation",
        title: "Projector Installation",
        description: "Professional installation of home theater projectors",
        price: 159.99,
        image: "/placeholder.svg",
        duration: "2 hours",
        popular: false,
      },
      {
        id: "cable-wire-management",
        title: "Cable & Wire Management",
        description: "Professional organization and concealment of A/V cables and wires",
        price: 99.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      },
      {
        id: "universal-remote-setup",
        title: "Universal Remote Setup",
        description: "Setup and programming of universal remotes for all your devices",
        price: 69.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "audio-calibration",
        title: "Audio System Calibration",
        description: "Professional calibration of your audio system for optimal sound",
        price: 129.99,
        image: "/placeholder.svg",
        duration: "2 hours",
        popular: false,
      },
      {
        id: "outdoor-speaker-installation",
        title: "Outdoor Speaker Installation",
        description: "Professional installation of weatherproof outdoor speakers",
        price: 169.99,
        image: "/placeholder.svg",
        duration: "2-3 hours",
        popular: false,
      }
    ]
  },
  {
    id: "mobile-devices",
    title: "Mobile Devices",
    description: "Expert support for all your smartphones, tablets, and mobile devices",
    icon: "smartphone",
    services: [
      {
        id: "phone-setup",
        title: "Phone Setup & Data Transfer",
        description: "Professional setup of your new phone with complete data transfer",
        price: 89.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: true,
      },
      {
        id: "screen-repair",
        title: "Screen Repair",
        description: "Professional repair of cracked or damaged screens",
        price: 149.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: true,
      },
      {
        id: "battery-replacement",
        title: "Battery Replacement",
        description: "Expert battery replacement for longer device life",
        price: 99.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "tablet-setup",
        title: "Tablet Setup & Optimization",
        description: "Professional setup and optimization of tablets and iPads",
        price: 79.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "mobile-troubleshooting",
        title: "Mobile Device Troubleshooting",
        description: "Expert diagnosis and repair of mobile device issues",
        price: 99.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "app-organization",
        title: "App Organization & Training",
        description: "Learn how to organize apps and use your device efficiently",
        price: 69.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "water-damage-repair",
        title: "Water Damage Repair",
        description: "Professional repair of water-damaged devices",
        price: 189.99,
        image: "/placeholder.svg",
        duration: "2 hours",
        popular: false,
      },
      {
        id: "device-protection",
        title: "Device Protection Setup",
        description: "Setup of screen protectors, cases, and security features",
        price: 59.99,
        image: "/placeholder.svg",
        duration: "30 minutes",
        popular: false,
      },
      {
        id: "software-update",
        title: "Software Update & Optimization",
        description: "Expert software updates and optimization for better performance",
        price: 79.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      }
    ]
  },
  {
    id: "home-security",
    title: "Home Security",
    description: "Protect your home with professional security system installation and support",
    icon: "shield",
    services: [
      {
        id: "security-camera-installation",
        title: "Security Camera Installation",
        description: "Professional installation of home security cameras",
        price: 149.99,
        image: "/placeholder.svg",
        duration: "2 hours",
        popular: true,
      },
      {
        id: "security-system-setup",
        title: "Security System Setup",
        description: "Complete setup and configuration of home security systems",
        price: 199.99,
        image: "/placeholder.svg",
        duration: "3 hours",
        popular: true,
      },
      {
        id: "doorbell-camera-installation",
        title: "Doorbell Camera Installation",
        description: "Professional installation of video doorbells",
        price: 99.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "motion-sensor-installation",
        title: "Motion Sensor Installation",
        description: "Expert installation of motion sensors for enhanced security",
        price: 89.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      },
      {
        id: "smart-lock-installation",
        title: "Smart Lock Installation",
        description: "Professional installation of smart locks for keyless entry",
        price: 119.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "security-system-troubleshooting",
        title: "Security System Troubleshooting",
        description: "Expert diagnosis and repair of security system issues",
        price: 129.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      },
      {
        id: "window-sensor-installation",
        title: "Window Sensor Installation",
        description: "Professional installation of window sensors for complete protection",
        price: 79.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      },
      {
        id: "security-system-upgrade",
        title: "Security System Upgrade",
        description: "Upgrade your existing security system with new features",
        price: 159.99,
        image: "/placeholder.svg",
        duration: "2-3 hours",
        popular: false,
      },
      {
        id: "video-monitoring-setup",
        title: "Video Monitoring Setup",
        description: "Setup remote video monitoring for your security cameras",
        price: 109.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      }
    ]
  },
  {
    id: "computers-printers",
    title: "Computers & Printers",
    description: "Expert support for all your computer and printer needs",
    icon: "laptop",
    services: [
      {
        id: "computer-setup",
        title: "Computer Setup & Optimization",
        description: "Professional setup and optimization of new computers",
        price: 119.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: true,
      },
      {
        id: "virus-removal",
        title: "Virus & Malware Removal",
        description: "Expert removal of viruses and malware for better performance",
        price: 149.99,
        image: "/placeholder.svg",
        duration: "2 hours",
        popular: true,
      },
      {
        id: "data-transfer",
        title: "Data Transfer & Backup",
        description: "Professional data transfer and backup solutions",
        price: 109.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      },
      {
        id: "printer-setup",
        title: "Printer Setup & Troubleshooting",
        description: "Expert setup and troubleshooting of printers",
        price: 89.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "operating-system-installation",
        title: "Operating System Installation",
        description: "Professional installation or upgrade of operating systems",
        price: 129.99,
        image: "/placeholder.svg",
        duration: "2 hours",
        popular: false,
      },
      {
        id: "hardware-upgrade",
        title: "Hardware Upgrade",
        description: "Expert installation of new hardware components",
        price: 159.99,
        image: "/placeholder.svg",
        duration: "2 hours",
        popular: false,
      },
      {
        id: "email-setup",
        title: "Email Setup & Training",
        description: "Professional setup and training for email accounts",
        price: 79.99,
        image: "/placeholder.svg",
        duration: "1 hour",
        popular: false,
      },
      {
        id: "network-printer-setup",
        title: "Network Printer Setup",
        description: "Setup printers for use across your home network",
        price: 99.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      },
      {
        id: "slow-computer-diagnosis",
        title: "Slow Computer Diagnosis",
        description: "Expert diagnosis and optimization of slow computers",
        price: 119.99,
        image: "/placeholder.svg",
        duration: "1-2 hours",
        popular: false,
      }
    ]
  },
];

// Helper function to get all services flat
export function getAllServices(): Service[] {
  return serviceCategories.flatMap(category => category.services);
}

// Helper function to get a service by ID
export function getServiceById(serviceId: string): Service | undefined {
  return getAllServices().find(service => service.id === serviceId);
}

// Helper function to get a category by ID
export function getCategoryById(categoryId: string): ServiceCategory | undefined {
  return serviceCategories.find(category => category.id === categoryId);
}
