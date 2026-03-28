// Google Places API integration

import { Restaurant, SearchFilters } from './restaurants';

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '';

// Convert Google Places data to our Restaurant format
function convertGooglePlaceToRestaurant(place: any): Restaurant {
  return {
    id: place.place_id,
    name: place.name,
    image_url: place.photos?.[0] 
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
      : '',
    url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
    rating: place.rating || 0,
    review_count: place.user_ratings_total || 0,
    price: getPriceLevel(place.price_level),
    categories: place.types 
      ? [{ alias: place.types[0], title: formatCategory(place.types[0]) }]
      : [{ alias: 'restaurant', title: 'Restaurant' }],
    location: {
      address1: place.vicinity || place.formatted_address || '',
      city: extractCity(place.formatted_address || ''),
      zip_code: '',
      state: 'WA',
      display_address: [place.formatted_address || place.vicinity || '']
    },
    phone: place.formatted_phone_number || '',
    display_phone: place.formatted_phone_number || '',
    distance: 0, // Would need to calculate based on user location
    is_closed: place.business_status === 'CLOSED_PERMANENTLY',
    coordinates: {
      latitude: place.geometry?.location?.lat || 0,
      longitude: place.geometry?.location?.lng || 0
    },
    transactions: [],
    hours: place.opening_hours ? [{
      open: [], // Would parse from opening_hours if needed
      hours_type: 'REGULAR',
      is_open_now: place.opening_hours.open_now || false
    }] : undefined
  };
}

function getPriceLevel(level?: number): string {
  if (!level) return '';
  return '$'.repeat(level);
}

function formatCategory(type: string): string {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractCity(address: string): string {
  const parts = address.split(',');
  if (parts.length >= 2) {
    return parts[parts.length - 2].trim();
  }
  return 'Tacoma';
}

export async function searchRestaurants(filters: SearchFilters): Promise<{
  businesses: Restaurant[];
  total: number;
}> {
  try {
    // First, geocode the location
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(filters.location)}&key=${GOOGLE_PLACES_API_KEY}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();
    
    if (!geocodeData.results || geocodeData.results.length === 0) {
      throw new Error('Location not found');
    }
    
    const location = geocodeData.results[0].geometry.location;
    
    // Build search query
    let searchQuery = filters.term || 'restaurant';
    if (filters.categories) {
      searchQuery = filters.categories;
    }
    
    // Use Text Search API
    const searchUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
    searchUrl.searchParams.append('query', `${searchQuery} in ${filters.location}`);
    searchUrl.searchParams.append('key', GOOGLE_PLACES_API_KEY);
    searchUrl.searchParams.append('type', 'restaurant');
    
    if (filters.open_now) {
      searchUrl.searchParams.append('opennow', 'true');
    }
    
    const response = await fetch(searchUrl.toString());
    const data = await response.json();
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(`Google Places API error: ${data.status}`);
    }
    
    let results = data.results || [];
    
    // Filter by price if specified
    if (filters.price) {
      const priceLevel = filters.price.length;
      results = results.filter((place: any) => 
        !place.price_level || place.price_level === priceLevel
      );
    }
    
    // Sort results
    if (filters.sort_by === 'rating') {
      results.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sort_by === 'review_count') {
      results.sort((a: any, b: any) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));
    }
    
    // Limit results
    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    results = results.slice(offset, offset + limit);
    
    const businesses = results.map(convertGooglePlaceToRestaurant);
    
    return {
      businesses,
      total: data.results?.length || 0
    };
  } catch (error) {
    console.error('Google Places search error:', error);
    throw error;
  }
}

export async function getRestaurantDetails(placeId: string): Promise<Restaurant> {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.append('place_id', placeId);
  url.searchParams.append('fields', 'name,rating,formatted_phone_number,opening_hours,website,photos,formatted_address,geometry,price_level,user_ratings_total,types,business_status,vicinity');
  url.searchParams.append('key', GOOGLE_PLACES_API_KEY);
  
  const response = await fetch(url.toString());
  const data = await response.json();
  
  if (data.status !== 'OK') {
    throw new Error(`Google Places API error: ${data.status}`);
  }
  
  return convertGooglePlaceToRestaurant(data.result);
}

// Mock health inspection data (would integrate with Pierce County API in production)
export async function getHealthInspection(name: string, address: string): Promise<{
  score: number;
  grade: string;
  inspection_date: string;
  violations: number;
} | null> {
  // In production, this would query Pierce County health department API
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
