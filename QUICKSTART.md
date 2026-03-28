# 🚀 Quick Start - Tacoma Eats

Get your restaurant dashboard running in 5 minutes!

---

## Option 1: Run with Mock Data (Instant)

**No API key needed - works immediately!**

```bash
cd /root/clawd/tacoma-eats
npm run dev
```

Open http://localhost:3000

The app will show 3 example restaurants with all features working.

---

## Option 2: Use Real Google Places Data (10 minutes)

### Step 1: Get Google Places API Key

**See the detailed guide:** `GOOGLE_API_SETUP.md` in this folder!

**Quick version:**
1. Go to https://console.cloud.google.com/
2. Create new project: "Tacoma Eats"
3. Enable "Places API (New)"
4. Enable billing (FREE - $200/month credit!)
5. Create API key
6. Restrict the key (security)
7. Copy your key

### Step 2: Add API Key to App

```bash
cd /root/clawd/tacoma-eats

# Edit .env.local
nano .env.local
```

Add your key:
```
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_actual_api_key_here
```

Save and exit (Ctrl+X, Y, Enter)

### Step 3: Start the App

```bash
npm run dev
```

Open http://localhost:3000

**You're done!** Real Tacoma restaurant data will now load.

---

## Testing It Out

### Try These Searches:

1. **Pizza in Tacoma**
   - Category: Pizza
   - Location: Tacoma
   - Click Search

2. **Open Now**
   - Click "Open Now" quick filter
   - See only currently open restaurants

3. **Cheap Eats**
   - Click the "$" price filter
   - Find budget-friendly spots

4. **Happy Hours**
   - Scroll down to see "Happy Hour Tracker"
   - Shows all happy hour deals

5. **Latest Deals**
   - Check "Latest Deals & Promotions"
   - Social media specials

---

## Building for Production

```bash
# Build production version
npm run build

# Run production server
npm start
```

---

## Deploying to Vercel (Free)

### 1. Push to GitHub

```bash
cd /root/clawd/tacoma-eats

# Create GitHub repo (via GitHub website or gh CLI)
gh repo create tacoma-eats --public --source=. --push
```

### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your `tacoma-eats` repository
4. Add environment variable:
   - **Key:** `NEXT_PUBLIC_YELP_API_KEY`
   - **Value:** Your Yelp API key
5. Click "Deploy"

**Done!** Your app will be live at `https://tacoma-eats.vercel.app` (or similar)

---

## Troubleshooting

### "No restaurants found"
- Check that your Yelp API key is correct in `.env.local`
- Restart the dev server after adding the key
- Try a broader search (e.g., just "Tacoma" with no filters)

### API Rate Limit Error
- Free Yelp tier: 500 calls/day
- App will fall back to mock data if limit reached
- Wait until tomorrow for limit reset
- Or upgrade Yelp API plan

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next package-lock.json
npm install
npm run build
```

---

## Features to Try

- 🔍 Search by restaurant name or cuisine
- 💰 Filter by price range
- 🟢 Show only open restaurants
- 📍 Switch between 8 Tacoma/Pierce County cities
- 🍻 Browse happy hour deals
- 🎉 Check latest social media promotions
- 🏥 View health inspection scores
- 📞 Click-to-call restaurants
- ⭐ Sort by rating, reviews, or distance

---

## Next Steps

Want to enhance the app?

1. **Add Wait Time Predictions** - Integrate Google Popular Times API
2. **Show Menus** - Scrape or pull from Yelp
3. **Add Favorites** - Save your favorite spots (localStorage)
4. **Map View** - Show restaurants on interactive map
5. **Push Notifications** - Get alerted to happy hours and deals

See `PROJECT_STATUS.md` for full enhancement roadmap!

---

**Built for the 253!** 🌮🍕🍣🍔
