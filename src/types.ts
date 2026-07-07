export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  iconName: string;
  steps: string[];
  duration: string;
  estimatedCost: string;
}

export interface Lawyer {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  education: string[];
  rating: number;
  reviewsCount: number;
  imageUrl: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'melki' | 'khanevade' | 'keyfari' | 'tejari' | 'sabt';
  categoryLabel: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isQuickReply?: boolean;
}

export type ActiveTab = 'home' | 'services' | 'lawyers' | 'articles' | 'contact';
