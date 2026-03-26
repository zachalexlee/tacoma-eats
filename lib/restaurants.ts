// Restaurant data types and utilities

export interface Restaurant {
  id: string;
  name: string;
  image_url: string;
  url: string;
  rating: number;
  review_count: number;
  price: string;
  categories: Array<{
    alias: string;
    title: string;
  }>;
  location: {
    address1: string;
    city: string;
    zip_code: string;
    state: string;
    display_address: string[];
  };
  phone: string;
  display_phone: string;
  distance: number;
  is_closed: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  transactions: string[];
  hours?: Array<{
    open: Array<{
      is_overnight: boolean;
      start: string;
      end: string;
      day: number;
    }>;
    hours_type: string;
    is_open_now: boolean;
  }>;
  happy_hour?: {
    times: string;
    days: string[];
    details: string;
  };
  social_promo?: {
    source: string;
    text: string;
    posted_at: string;
    valid_until?: string;
  };
  health_score?: {
    score: number;
    grade: string;
    inspection_date: string;
    violations: number;
  };
}

export interface SearchFilters {
  location: string;
  term?: string;
  categories?: string;
  price?: string;
  open_now?: boolean;
  sort_by?: 'best_match' | 'rating' | 'review_count' | 'distance';
  limit?: number;
  offset?: number;
}

export const TACOMA_LOCATIONS = [
  { name: 'Tacoma', lat: 47.2529, lon: -122.4443 },
  { name: 'Lakewood', lat: 47.1717, lon: -122.5185 },
  { name: 'Puyallup', lat: 47.1854, lon: -122.2929 },
  { name: 'University Place', lat: 47.2301, lon: -122.5468 },
  { name: 'Fife', lat: 47.2399, lon: -122.3579 },
  { name: 'Gig Harbor', lat: 47.3295, lon: -122.5807 },
  { name: 'Bonney Lake', lat: 47.1773, lon: -122.1865 },
  { name: 'Sumner', lat: 47.2034, lon: -122.2407 },
];

export const FOOD_CATEGORIES = [
  { id: 'restaurants', name: 'All Restaurants' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'mexican', name: 'Mexican' },
  { id: 'italian', name: 'Italian' },
  { id: 'chinese', name: 'Chinese' },
  { id: 'japanese', name: 'Japanese' },
  { id: 'thai', name: 'Thai' },
  { id: 'vietnamese', name: 'Vietnamese' },
  { id: 'korean', name: 'Korean' },
  { id: 'indian', name: 'Indian' },
  { id: 'mediterranean', name: 'Mediterranean' },
  { id: 'seafood', name: 'Seafood' },
  { id: 'steak', name: 'Steakhouse' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'sandwiches', name: 'Sandwiches' },
  { id: 'salad', name: 'Salad' },
  { id: 'breakfast_brunch', name: 'Breakfast & Brunch' },
  { id: 'coffee', name: 'Coffee & Tea' },
  { id: 'bakeries', name: 'Bakeries' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'bars', name: 'Bars' },
  { id: 'pubs', name: 'Pubs' },
];

export const PRICE_RANGES = [
  { id: '1', label: '$', description: 'Under $10' },
  { id: '2', label: '$$', description: '$11-30' },
  { id: '3', label: '$$$', description: '$31-60' },
  { id: '4', label: '$$$$', description: 'Above $60' },
];

export function formatDistance(meters: number): string {
  const miles = meters * 0.000621371;
  return miles < 1 
    ? `${Math.round(miles * 10) / 10} mi`
    : `${Math.round(miles)} mi`;
}

export function isOpenNow(hours?: Restaurant['hours']): boolean {
  if (!hours || hours.length === 0) return false;
  return hours[0]?.is_open_now || false;
}

export function getCurrentDayHours(hours?: Restaurant['hours']): string {
  if (!hours || hours.length === 0) return 'Hours not available';
  
  const now = new Date();
  const currentDay = now.getDay();
  
  const todayHours = hours[0]?.open.find(h => h.day === currentDay);
  if (!todayHours) return 'Closed today';
  
  const start = `${todayHours.start.slice(0, 2)}:${todayHours.start.slice(2)}`;
  const end = `${todayHours.end.slice(0, 2)}:${todayHours.end.slice(2)}`;
  
  return `${start} - ${end}`;
}
