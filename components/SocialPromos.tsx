'use client';

import { motion } from 'framer-motion';
import { Restaurant } from '@/lib/restaurants';

interface SocialPromosProps {
  restaurants: Restaurant[];
}

export default function SocialPromos({ restaurants }: SocialPromosProps) {
  const promosRestaurants = restaurants.filter(r => r.social_promo);

  if (promosRestaurants.length === 0) {
    return null;
  }

  const getSocialIcon = (source: string) => {
    if (source.toLowerCase().includes('instagram')) return '📸';
    if (source.toLowerCase().includes('facebook')) return '📘';
    if (source.toLowerCase().includes('twitter') || source.toLowerCase().includes('x')) return '🐦';
    return '📱';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-6"
    >
      <h2 className="text-2xl font-bold mb-2">🎉 Latest Deals & Promotions</h2>
      <p className="text-white/70 mb-6">
        Fresh from social media! Never miss a special offer or limited-time deal.
      </p>

      <div className="space-y-4">
        {promosRestaurants.map((restaurant, idx) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-start gap-4">
              {/* Restaurant Image */}
              {restaurant.image_url && (
                <div className="hidden md:block w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={restaurant.image_url}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <div className="text-sm text-white/70">{restaurant.location.city}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getSocialIcon(restaurant.social_promo!.source)}</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      {restaurant.social_promo!.source}
                    </span>
                  </div>
                </div>

                {/* Promo Text */}
                <div className="bg-black/30 p-3 rounded-lg mb-3">
                  <p className="text-white font-medium leading-relaxed">
                    {restaurant.social_promo!.text}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm">
                  <div className="text-white/70">
                    Posted: {new Date(restaurant.social_promo!.posted_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  
                  {restaurant.social_promo!.valid_until && (
                    <div className="bg-red-500/20 border border-red-500/50 px-3 py-1 rounded-full font-medium">
                      ⏰ Valid until: {new Date(restaurant.social_promo!.valid_until).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-3 flex gap-2">
                  <a
                    href={restaurant.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Restaurant
                  </a>
                  {restaurant.phone && (
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      📞 Call to Redeem
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
        <p className="text-sm">
          <strong>📱 Follow for More:</strong> These deals are scraped from restaurant social media. 
          Follow your favorites on Instagram, Facebook, and Twitter for real-time updates!
        </p>
      </div>
    </motion.div>
  );
}
