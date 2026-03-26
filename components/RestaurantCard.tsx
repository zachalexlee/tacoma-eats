'use client';

import { Restaurant } from '@/lib/restaurants';
import { motion } from 'framer-motion';
import { formatDistance, getCurrentDayHours, isOpenNow } from '@/lib/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

export default function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  const open = isOpenNow(restaurant.hours);
  const hours = getCurrentDayHours(restaurant.hours);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-card overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-800">
        {restaurant.image_url ? (
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🍽️
          </div>
        )}
        
        {/* Open/Closed Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
          open 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {open ? '🟢 OPEN' : '🔴 CLOSED'}
        </div>

        {/* Happy Hour Badge */}
        {restaurant.happy_hour && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-black">
            🍻 Happy Hour!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{restaurant.name}</h3>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>{restaurant.categories[0]?.title || 'Restaurant'}</span>
              {restaurant.price && (
                <>
                  <span>•</span>
                  <span className="text-green-400 font-semibold">{restaurant.price}</span>
                </>
              )}
              {restaurant.distance && (
                <>
                  <span>•</span>
                  <span>{formatDistance(restaurant.distance)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {'⭐'.repeat(Math.floor(restaurant.rating))}
            {restaurant.rating % 1 >= 0.5 && '⭐'}
          </div>
          <span className="text-lg font-bold">{restaurant.rating}</span>
          <span className="text-sm text-white/70">({restaurant.review_count} reviews)</span>
        </div>

        {/* Hours */}
        <div className="text-sm mb-3">
          <span className="text-white/70">Hours: </span>
          <span className="font-medium">{hours}</span>
        </div>

        {/* Location */}
        <div className="text-sm text-white/70 mb-3">
          📍 {restaurant.location.address1}, {restaurant.location.city}
        </div>

        {/* Health Score */}
        {restaurant.health_score && (
          <div className="mb-3 p-2 bg-white/10 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Health Score:</span>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${
                  restaurant.health_score.score >= 95 ? 'text-green-400' : 
                  restaurant.health_score.score >= 90 ? 'text-yellow-400' : 
                  'text-orange-400'
                }`}>
                  {restaurant.health_score.score}
                </span>
                <span className={`px-2 py-1 rounded font-bold ${
                  restaurant.health_score.grade === 'A' ? 'bg-green-500' :
                  restaurant.health_score.grade === 'B' ? 'bg-yellow-500' :
                  'bg-orange-500'
                }`}>
                  {restaurant.health_score.grade}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Happy Hour Details */}
        {restaurant.happy_hour && (
          <div className="mb-3 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
            <div className="font-bold text-yellow-300 mb-1">🍻 Happy Hour</div>
            <div className="text-sm">{restaurant.happy_hour.times}</div>
            <div className="text-xs text-white/70 mt-1">
              {restaurant.happy_hour.days.join(', ')}
            </div>
            <div className="text-xs mt-1">{restaurant.happy_hour.details}</div>
          </div>
        )}

        {/* Social Promo */}
        {restaurant.social_promo && (
          <div className="mb-3 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg">
            <div className="font-bold text-blue-300 mb-1">
              🎉 {restaurant.social_promo.source}
            </div>
            <div className="text-sm">{restaurant.social_promo.text}</div>
            <div className="text-xs text-white/70 mt-1">
              Posted: {new Date(restaurant.social_promo.posted_at).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <a
            href={restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors"
          >
            View on Yelp
          </a>
          {restaurant.phone && (
            <a
              href={`tel:${restaurant.phone}`}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              📞 Call
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
