export interface Project {
  id: string;
  number: string; // e.g., "01"
  title: string; // e.g., "ETHER"
  subtitle: string; // e.g., "Brand Experience & Sensory Installation"
  year: string; // e.g., "2026"
  category: string; // e.g., "Digital Sensory Experience"
  role: string; // e.g., "Lead Interaction Artist"
  overviewImage: string; // high-quality visual representation
  
  // Project detail attributes
  client?: string;
  duration?: string;
  conceptTitle: string;
  conceptDescription: string;
  showcaseImages: string[]; // images appearing in vertical flow / layout
  designProcess: {
    phase: string;
    description: string;
    image?: string;
  }[];
  finalResult: {
    metrics?: string;
    achievement: string;
    image: string;
  };
}

export interface Profile {
  firstName: string;
  lastName: string;
  tagline: string;
  story: string;
  imageUrl: string;
  email: string;
  phone: string;
  wechat: string;
  github: string;
}
