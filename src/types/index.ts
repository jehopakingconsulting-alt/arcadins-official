export interface Program {
  id: string;
  slug: string;
  icon: string;
  category: string;
  categoryLabel: string;
  name: string;
  description: string;
  longDescription: string;
  duration: string;
  certification: string;
  price: number;
  modules: string[];
}

export interface Testimonial {
  stars: number;
  text: string;
  initials: string;
  name: string;
  from: string;
}

export interface VideoItem {
  id: string;
  chip: string;
  title: string;
  desc: string;
  thumb: string;
}

export interface PricingPlan {
  badge: string;
  name: string;
  description: string;
  priceMonthly: number | null;
  priceAnnual: number | null;
  currency: string;
  features: { text: string; included: boolean }[];
  featured: boolean;
  cta: string;
}

export interface NavItem {
  id: string;
  href: string;
  label: Record<string, string>;
  icon: React.ReactNode;
}

export interface SlideData {
  image: string;
  fallbackColor: string;
  labelIcon: string;
  labelText: string;
}
