'use client';

import { motion } from 'framer-motion';
import { Restaurant } from '@/lib/restaurants';

interface HappyHourTrackerProps {
  restaurants: Restaurant[];
}

export default function HappyHourTracker({ restaurants }: HappyHourTrackerProps) {
  const happyHourPlaces = restaurants.filter(r => r.happy_hour);

  if (happyHourPlaces.length === 0) {
    return null;
  }

  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' });
  const currentHour = now.getHours();

  // Check if it's happy hour time (typically 3pm-6pm)
  const isHappyHourNow = currentHour >= 15 && currentHour < 18;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">🍻 Happy Hour Tracker</h2>
        {isHappyHourNow && (
          <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold animate-pulse">
            🎉 Happy Hour NOW!
          </span>
        )}
      </div>

      <p className="text-white/70 mb-6">
        Never miss a deal! Track happy hour specials at restaurants across Tacoma/Pierce County.
      </p>

      {/* Active Happy Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {happyHourPlaces.map((restaurant, idx) => {
          const isActiveToday = restaurant.happy_hour?.days.includes(currentDay) || false;
          
          return (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl border-2 ${
                isActiveToday && isHappyHourNow
                  ? 'bg-yellow-500/20 border-yellow-500'
                  : isActiveToday
                  ? 'bg-green-500/20 border-green-500/50'
                  : 'bg-white/10 border-white/20'
              }`}
            >
              {/* Restaurant Name */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg">{restaurant.name}</h3>
                {isActiveToday && isHappyHourNow && (
                  <span className="text-xl animate-bounce">🍻</span>
                )}
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⏰</span>
                <span className="font-semibold">{restaurant.happy_hour?.times}</span>
              </div>

              {/* Days */}
              <div className="flex flex-wrap gap-1 mb-3">
                {restaurant.happy_hour?.days.map((day) => (
                  <span
                    key={day}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      day === currentDay
                        ? 'bg-green-500 text-white'
                        : 'bg-white/20'
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="text-sm text-white/90 mb-3">
                {restaurant.happy_hour?.details}
              </div>

              {/* Location */}
              <div className="text-xs text-white/70 mb-3">
                📍 {restaurant.location.city}
              </div>

              {/* Status Badge */}
              {isActiveToday && (
                <div className={`text-center py-2 rounded-lg font-bold text-sm ${
                  isHappyHourNow
                    ? 'bg-yellow-500 text-black'
                    : 'bg-green-500/30 text-green-300'
                }`}>
                  {isHappyHourNow ? '🎉 ACTIVE NOW!' : '✓ Today'}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <p className="text-sm">
          <strong>💡 Pro Tip:</strong> Call ahead to confirm happy hour times and specials may vary. 
          Some restaurants extend happy hour on certain days!
        </p>
      </div>
    </motion.div>
  );
}
