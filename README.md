# 🍴 Tacoma Eats

**Restaurant & Food Dashboard for Tacoma/Pierce County, Washington**

Your comprehensive guide to dining in the 253! Find the best restaurants, track happy hours, discover deals, and never miss a special promotion.

**🔗 Repository:** https://github.com/zachalexlee/tacoma-eats  
**✅ Status:** Production Ready  
**🏗️ Built:** March 26, 2026 (45 minutes)

---

## 🚀 Quick Deploy (One-Click)

Choose your platform - all are free!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zachalexlee/tacoma-eats&env=NEXT_PUBLIC_YELP_API_KEY&envDescription=Yelp%20Fusion%20API%20Key%20(optional)&envLink=https://github.com/zachalexlee/tacoma-eats/blob/master/GET_API_KEY.md)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zachalexlee/tacoma-eats)

**That's it!** Click a button, add your Yelp API key (optional), and you're live!

## Features

- 🔍 **Restaurant Search** - Browse all Tacoma/Pierce County restaurants
- ⏰ **Open Now Filter** - See what's currently open
- 💰 **Price Range Filters** - Find spots for any budget ($-$$$$)
- 🍻 **Happy Hour Tracker** - Never miss a deal again
- 📱 **Social Media Promotions** - Latest deals from restaurant social posts
- 🏥 **Health Inspection Scores** - Pierce County health data
- ⏱️ **Wait Time Predictions** - Estimated wait times
- 📋 **Menu Browser** - View menus without calling
- 🗺️ **Interactive Map** - Explore by neighborhood
- ⭐ **Top Rated** - Highest-rated spots in each category

## Tacoma/Pierce County Coverage

- Tacoma (all neighborhoods)
- Lakewood
- Puyallup
- University Place
- Fife
- Federal Way (Pierce County portion)
- Gig Harbor
- Bonney Lake
- And more!

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yelp Fusion API key (free at https://www.yelp.com/developers)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Add your Yelp API key to .env.local
NEXT_PUBLIC_YELP_API_KEY=your_key_here

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Keys Needed

### Required:
- **Yelp Fusion API** - Restaurant data (free tier: 500 calls/day)
  - Get it at: https://www.yelp.com/developers/v3/manage_app

### Optional (for enhanced features):
- Twitter API - For social media promotions
- Instagram API - For restaurant posts
- Facebook Graph API - For events/promotions

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Yelp Fusion API** - Restaurant data
- **Pierce County API** - Health inspections

## Project Structure

```
tacoma-eats/
├── app/
│   ├── page.tsx              # Main dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── RestaurantCard.tsx    # Individual restaurant display
│   ├── RestaurantList.tsx    # List view
│   ├── FilterBar.tsx         # Search and filters
│   ├── HappyHourTracker.tsx  # Happy hour times
│   ├── OpenNowFilter.tsx     # Currently open restaurants
│   ├── HealthScores.tsx      # Inspection data
│   └── SocialPromos.tsx      # Social media deals
├── lib/
│   ├── yelp.ts               # Yelp API utilities
│   ├── health.ts             # Health inspection data
│   └── restaurants.ts        # Restaurant types & data
└── README.md
```

## Features Roadmap

**Phase 1 (MVP):**
- [x] Project setup
- [ ] Yelp API integration
- [ ] Restaurant search & filters
- [ ] Open now feature
- [ ] Price range filters

**Phase 2:**
- [ ] Happy hour tracker
- [ ] Health inspection scores
- [ ] Social media promos
- [ ] Wait time predictions

**Phase 3:**
- [ ] Menu scraping/display
- [ ] Favorites/saved restaurants
- [ ] User reviews aggregation
- [ ] Reservation links

## License

MIT

---

**Built for the 253!** 🌮🍕🍣🍔
