'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Restaurant } from '@/lib/restaurants';
import { searchRestaurants, getHealthInspection } from '@/lib/yelp';
import RestaurantCard from '@/components/RestaurantCard';
import FilterBar from '@/components/FilterBar';
import HappyHourTracker from '@/components/HappyHourTracker';
import SocialPromos from '@/components/SocialPromos';

// Mock data for demo purposes (will be replaced by real API data)
const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'The Table',
    image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/example1.jpg',
    url: 'https://yelp.com',
    rating: 4.5,
    review_count: 342,
    price: '$$',
    categories: [{ alias: 'newamerican', title: 'American (New)' }],
    location: {
      address1: '2610 6th Ave',
      city: 'Tacoma',
      zip_code: '98406',
      state: 'WA',
      display_address: ['2610 6th Ave', 'Tacoma, WA 98406']
    },
    phone: '+12535029928',
    display_phone: '(253) 502-9928',
    distance: 1200,
    is_closed: false,
    coordinates: { latitude: 47.2529, longitude: -122.4443 },
    transactions: ['pickup', 'delivery'],
    hours: [{
      open: [{ is_overnight: false, start: '1100', end: '2200', day: 1 }],
      hours_type: 'REGULAR',
      is_open_now: true
    }],
    happy_hour: {
      times: '3pm-6pm',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      details: '$2 off all drinks, half-price appetizers'
    },
    health_score: {
      score: 98,
      grade: 'A',
      inspection_date: '2026-03-15',
      violations: 0
    }
  },
  {
    id: '2',
    name: 'Indochine Asian Dining Lounge',
    image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/example2.jpg',
    url: 'https://yelp.com',
    rating: 4.3,
    review_count: 567,
    price: '$$',
    categories: [{ alias: 'thai', title: 'Thai' }],
    location: {
      address1: '3506 S 47th St',
      city: 'Tacoma',
      zip_code: '98409',
      state: 'WA',
      display_address: ['3506 S 47th St', 'Tacoma, WA 98409']
    },
    phone: '+12534737777',
    display_phone: '(253) 473-7777',
    distance: 3200,
    is_closed: false,
    coordinates: { latitude: 47.2229, longitude: -122.4243 },
    transactions: ['pickup', 'delivery'],
    hours: [{
      open: [{ is_overnight: false, start: '1130', end: '2100', day: 1 }],
      hours_type: 'REGULAR',
      is_open_now: true
    }],
    social_promo: {
      source: 'Instagram',
      text: '🎉 Spring Special! 20% off all entrees this weekend! Use code SPRING2026',
      posted_at: '2026-03-24T10:00:00Z',
      valid_until: '2026-03-31T23:59:59Z'
    },
    health_score: {
      score: 95,
      grade: 'A',
      inspection_date: '2026-02-28',
      violations: 1
    }
  },
  {
    id: '3',
    name: 'Wooden City',
    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/example3.jpg',
    url: 'https://yelp.com',
    rating: 4.7,
    review_count: 289,
    price: '$$$',
    categories: [{ alias: 'pizza', title: 'Pizza' }],
    location: {
      address1: '1707 Pacific Ave',
      city: 'Tacoma',
      zip_code: '98402',
      state: 'WA',
      display_address: ['1707 Pacific Ave', 'Tacoma, WA 98402']
    },
    phone: '+12535021400',
    display_phone: '(253) 502-1400',
    distance: 850,
    is_closed: false,
    coordinates: { latitude: 47.2476, longitude: -122.4402 },
    transactions: ['pickup'],
    hours: [{
      open: [{ is_overnight: false, start: '1600', end: '2200', day: 1 }],
      hours_type: 'REGULAR',
      is_open_now: true
    }],
    happy_hour: {
      times: '4pm-6pm',
      days: ['Mon', 'Tue', 'Wed', 'Thu'],
      details: '$5 select pizzas, $3 local drafts'
    },
    health_score: {
      score: 100,
      grade: 'A',
      inspection_date: '2026-03-10',
      violations: 0
    }
  }
];

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(MOCK_RESTAURANTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    openNow: 0,
    happyHours: 0,
    promos: 0
  });

  useEffect(() => {
    updateStats();
  }, [restaurants]);

  const updateStats = () => {
    setStats({
      total: restaurants.length,
      openNow: restaurants.filter(r => r.hours?.[0]?.is_open_now).length,
      happyHours: restaurants.filter(r => r.happy_hour).length,
      promos: restaurants.filter(r => r.social_promo).length
    });
  };

  const handleSearch = async (filters: {
    searchTerm: string;
    category: string;
    priceRange: string;
    location: string;
    openNow: boolean;
    sortBy: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      // Check if API key is configured
      if (!process.env.NEXT_PUBLIC_YELP_API_KEY) {
        console.warn('Yelp API key not configured, using mock data');
        // Filter mock data based on filters
        let filtered = [...MOCK_RESTAURANTS];
        
        if (filters.searchTerm) {
          const term = filters.searchTerm.toLowerCase();
          filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(term) ||
            r.categories.some(c => c.title.toLowerCase().includes(term))
          );
        }
        
        if (filters.openNow) {
          filtered = filtered.filter(r => r.hours?.[0]?.is_open_now);
        }
        
        if (filters.priceRange) {
          filtered = filtered.filter(r => r.price === '$'.repeat(parseInt(filters.priceRange)));
        }
        
        setRestaurants(filtered);
        setLoading(false);
        return;
      }

      // Real API call
      const results = await searchRestaurants({
        location: filters.location,
        term: filters.searchTerm,
        categories: filters.category,
        price: filters.priceRange,
        open_now: filters.openNow,
        sort_by: filters.sortBy as any,
        limit: 20
      });

      // Enhance with health scores (mock for now)
      const enhanced = await Promise.all(
        results.businesses.map(async (restaurant) => {
          const healthScore = await getHealthInspection(
            restaurant.name,
            restaurant.location.address1
          );
          return {
            ...restaurant,
            health_score: healthScore || undefined
          };
        })
      );

      setRestaurants(enhanced as Restaurant[]);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search restaurants. Please try again.');
      // Fall back to mock data on error
      setRestaurants(MOCK_RESTAURANTS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
          🍴 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tacoma Eats
          </span>
        </h1>
        <p className="text-xl text-white/80 text-center mb-6">
          Your guide to dining in Tacoma/Pierce County
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm text-white/70">Restaurants</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{stats.openNow}</div>
            <div className="text-sm text-white/70">Open Now</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">{stats.happyHours}</div>
            <div className="text-sm text-white/70">Happy Hours</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">{stats.promos}</div>
            <div className="text-sm text-white/70">Active Deals</div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Filter Bar */}
        <FilterBar onSearch={handleSearch} />

        {/* Social Promos */}
        <SocialPromos restaurants={restaurants} />

        {/* Happy Hour Tracker */}
        <HappyHourTracker restaurants={restaurants} />

        {/* Error Message */}
        {error && (
          <div className="glass-card p-4 mb-6 bg-red-500/20 border-red-500/50">
            <p className="text-red-200">⚠️ {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mb-4"></div>
            <p className="text-xl">Finding delicious options...</p>
          </div>
        )}

        {/* Restaurant List */}
        {!loading && restaurants.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && restaurants.length === 0 && (
          <div className="glass-card p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No restaurants found</h3>
            <p className="text-white/70">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto mt-12 text-center text-white/60 text-sm"
      >
        <p>Built for the 253 🌮🍕🍣🍔</p>
        <p className="mt-2">Powered by Yelp Fusion API • Pierce County Health Department</p>
      </motion.footer>
    </div>
  );
}
