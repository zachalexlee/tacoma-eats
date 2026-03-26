// Yelp Fusion API integration

import { Restaurant, SearchFilters } from './restaurants';

const YELP_API_URL = 'https://api.yelp.com/v3';
const API_KEY = process.env.NEXT_PUBLIC_YELP_API_KEY || '';

export async function searchRestaurants(filters: SearchFilters): Promise<{
  businesses: Restaurant[];
  total: number;
}> {
  const params = new URLSearchParams({
    location: filters.location,
    limit: (filters.limit || 20).toString(),
    offset: (filters.offset || 0).toString(),
  });

  if (filters.term) params.append('term', filters.term);
  if (filters.categories) params.append('categories', filters.categories);
  if (filters.price) params.append('price', filters.price);
  if (filters.open_now) params.append('open_now', 'true');
  if (filters.sort_by) params.append('sort_by', filters.sort_by);

  const response = await fetch(`${YELP_API_URL}/businesses/search?${params}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Yelp API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getRestaurantDetails(id: string): Promise<Restaurant> {
  const response = await fetch(`${YELP_API_URL}/businesses/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Yelp API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getRestaurantReviews(id: string): Promise<{
  reviews: Array<{
    id: string;
    rating: number;
    text: string;
    time_created: string;
    user: {
      name: string;
      image_url: string;
    };
  }>;
  total: number;
}> {
  const response = await fetch(`${YELP_API_URL}/businesses/${id}/reviews`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Yelp API error: ${response.statusText}`);
  }

  return response.json();
}

// Mock data for happy hours (in production, this would come from a database or scraping)
export const MOCK_HAPPY_HOURS: Record<string, {
  times: string;
  days: string[];
  details: string;
}> = {
  // This would be populated with real data
  'default': {
    times: '3pm-6pm',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    details: '$2 off drinks, half-price appetizers'
  }
};

// Mock health inspection data (would integrate with Pierce County API in production)
export async function getHealthInspection(name: string, address: string): Promise<{
  score: number;
  grade: string;
  inspection_date: string;
  violations: number;
} | null> {
  // In production, this would query Pierce County health department API
  // For now, return mock data for demonstration
  const mockScores = [95, 98, 92, 88, 100, 94, 96];
  const score = mockScores[Math.floor(Math.random() * mockScores.length)];
  
  let grade = 'A';
  if (score < 90) grade = 'B';
  if (score < 80) grade = 'C';
  
  return {
    score,
    grade,
    inspection_date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    violations: score >= 95 ? 0 : Math.floor((100 - score) / 5)
  };
}
