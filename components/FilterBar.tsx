'use client';

import { useState } from 'react';
import { FOOD_CATEGORIES, PRICE_RANGES, TACOMA_LOCATIONS } from '@/lib/restaurants';

interface FilterBarProps {
  onSearch: (filters: {
    searchTerm: string;
    category: string;
    priceRange: string;
    location: string;
    openNow: boolean;
    sortBy: string;
  }) => void;
}

export default function FilterBar({ onSearch }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [location, setLocation] = useState('Tacoma, WA');
  const [openNow, setOpenNow] = useState(false);
  const [sortBy, setSortBy] = useState('best_match');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch({
      searchTerm,
      category,
      priceRange,
      location,
      openNow,
      sortBy,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategory('');
    setPriceRange('');
    setLocation('Tacoma, WA');
    setOpenNow(false);
    setSortBy('best_match');
    onSearch({
      searchTerm: '',
      category: '',
      priceRange: '',
      location: 'Tacoma, WA',
      openNow: false,
      sortBy: 'best_match',
    });
  };

  return (
    <div className="glass-card p-6 mb-6">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search restaurants, cuisine, dish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 placeholder-white/50"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          🔍 Search
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {showFilters ? '▼' : '▶'} Filters
        </button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => {
            setOpenNow(!openNow);
            setTimeout(handleSearch, 100);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            openNow
              ? 'bg-green-500 text-white'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          {openNow ? '🟢' : '⚪'} Open Now
        </button>
        
        {PRICE_RANGES.map((range) => (
          <button
            key={range.id}
            onClick={() => {
              setPriceRange(priceRange === range.id ? '' : range.id);
              setTimeout(handleSearch, 100);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              priceRange === range.id
                ? 'bg-green-500 text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <div className="space-y-4 pt-4 border-t border-white/20">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">📍 Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40"
            >
              {TACOMA_LOCATIONS.map((loc) => (
                <option key={loc.name} value={`${loc.name}, WA`}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">🍽️ Cuisine Type</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40"
            >
              <option value="">All Cuisines</option>
              {FOOD_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium mb-2">📊 Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40"
            >
              <option value="best_match">Best Match</option>
              <option value="rating">Highest Rated</option>
              <option value="review_count">Most Reviewed</option>
              <option value="distance">Closest</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="bg-red-600 hover:bg-red-700 py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
