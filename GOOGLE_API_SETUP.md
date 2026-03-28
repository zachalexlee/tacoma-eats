# 🗺️ Google Places API Setup Guide

**Complete step-by-step guide to get your FREE Google Places API key**

---

## Overview

- **Cost:** FREE (Google gives $200/month credit)
- **Setup Time:** 10 minutes
- **Usage for this app:** ~$5-10/month (well under free limit)
- **API Calls:** ~40,000 searches/month free

---

## Step 1: Go to Google Cloud Console

**Open your web browser:**

```
https://console.cloud.google.com/
```

---

## Step 2: Sign In with Google

1. Click **"Sign in"** (top right corner)
2. Use your **Google/Gmail account**
3. If you don't have one, click **"Create account"**

---

## Step 3: Accept Terms (First Time Only)

1. You'll see **"Google Cloud Platform Terms of Service"**
2. Check the box: **"I agree to the Terms of Service"**
3. Click **"Agree and Continue"**

---

## Step 4: Create a New Project

### 4.1: Open Project Selector

1. Look at the **top navigation bar**
2. Click on **"Select a project"** dropdown (next to "Google Cloud")

### 4.2: Create Project

1. Click **"NEW PROJECT"** button (top right of popup)
2. **Project name:** `Tacoma Eats`
3. **Organization:** Leave as "No organization"
4. **Location:** Leave default
5. Click **"CREATE"**

**⏱️ Wait 10-15 seconds** for the project to be created.

You'll see a notification when it's ready.

---

## Step 5: Enable Places API

### 5.1: Open API Library

1. In the **left sidebar** (☰ menu), click **"APIs & Services"**
2. Click **"Library"**

### 5.2: Find Places API

1. In the **search box**, type: `Places API`
2. You'll see two results:
   - **"Places API (New)"** ← Select this one!
   - "Places API" (old version)

### 5.3: Enable It

1. Click on **"Places API (New)"**
2. Click the blue **"ENABLE"** button
3. **⏱️ Wait 5-10 seconds** for it to enable

---

## Step 6: Enable Billing (Required But FREE!)

**⚠️ Important: Google gives you $200 FREE every month!**

You need to add a credit card, but:
- ✅ You get $200 free credit monthly
- ✅ This app uses ~$5-10/month
- ✅ You won't be charged unless you exceed $200
- ✅ You can set spending alerts

### 6.1: Start Billing Setup

After enabling the API, you'll see:
- **"To use this API, you may need credentials"**
- Or a banner about billing

Click **"Enable Billing"** or **"Set up billing account"**

### 6.2: Create Billing Account

1. Click **"Create Billing Account"**
2. **Country:** Select your country (e.g., United States)
3. Click **"Continue"**

### 6.3: Add Payment Method

1. **Credit/Debit Card:** Enter your card details
   - Card number
   - Expiration date
   - CVV
   - Billing address

2. **Accept terms**
3. Click **"Start my free trial"**

**✅ Done!** You now have $200/month free credit.

---

## Step 7: Create API Key

### 7.1: Go to Credentials

1. In the **left sidebar**, click **"APIs & Services"**
2. Click **"Credentials"**

### 7.2: Create Key

1. Click **"+ CREATE CREDENTIALS"** (top center)
2. Select **"API key"**

**🎉 A popup appears with your API key!**

Example: `AIzaSyD8f3K9LmN0PqR5TvW7Xyz2Abc1De...`

### 7.3: Copy and Save

1. Click **"COPY"** button
2. **Save it somewhere safe!**
   - Paste into a text file
   - Email it to yourself
   - You'll need it in Step 8

---

## Step 8: Restrict Your API Key (Security)

**⚠️ Important for security and cost control!**

### 8.1: Edit the Key

1. In the popup, click **"EDIT API KEY"**
   - Or find your key in the credentials list and click the ✏️ pencil icon

### 8.2: Set API Restrictions

1. Scroll to **"API restrictions"**
2. Select **"Restrict key"**
3. In the dropdown, search and check:
   - ✅ **Places API (New)**
   - ✅ **Places API**
   - ✅ **Geocoding API** (optional, helps with addresses)
4. Click **"OK"**
5. Click **"SAVE"** at the bottom

### 8.3: Set Application Restrictions (Optional but Recommended)

1. Scroll to **"Application restrictions"**
2. Select **"HTTP referrers (web sites)"**
3. Click **"ADD AN ITEM"**
4. Add these URLs one by one:
   - `https://tacoma-eats2.vercel.app/*`
   - `https://*.vercel.app/*`
   - `http://localhost:3000/*` (for local testing)
5. Click **"DONE"**
6. Click **"SAVE"** at the bottom

**✅ Your API key is now secure!**

---

## Step 9: Set Up Budget Alerts (Optional)

Prevent unexpected charges:

### 9.1: Open Billing

1. In the **left sidebar** (☰ menu), click **"Billing"**
2. Click **"Budgets & alerts"**

### 9.2: Create Budget

1. Click **"CREATE BUDGET"**
2. **Name:** `Tacoma Eats API Budget`
3. **Budget amount:** `$50` (well above your ~$5-10 usage)
4. **Alert thresholds:**
   - 50% ($25)
   - 90% ($45)
   - 100% ($50)
5. Add your email for alerts
6. Click **"FINISH"**

**✅ You'll get emails if spending approaches limits**

---

## Step 10: Test Your API Key

Copy your API key and test it:

```bash
# Replace YOUR_API_KEY with your actual key
curl "https://maps.googleapis.com/maps/api/place/textsearch/json?query=pizza+in+Tacoma+WA&key=YOUR_API_KEY"
```

You should see JSON data with restaurants!

---

## Step 11: Add to Tacoma Eats App

### Option A: Add to Vercel (Production)

1. Go to https://vercel.com/dashboard
2. Click your **tacoma-eats2** project
3. Click **"Settings"** → **"Environment Variables"**
4. Click **"Add New"**
5. **Name:** `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`
6. **Value:** Paste your API key
7. Check all 3 boxes (Production, Preview, Development)
8. Click **"Save"**
9. Go to **"Deployments"** → **"..."** → **"Redeploy"**

### Option B: Add Locally (Testing)

```bash
cd /root/clawd/tacoma-eats
nano .env.local
```

Add this line:
```
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_actual_api_key_here
```

Save (Ctrl+X, Y, Enter), then:
```bash
npm run dev
```

---

## ✅ You're Done!

Your API key is ready and the app will show real Tacoma restaurants!

---

## 📊 Usage & Costs

### Free Tier:
- **$200/month credit** (Google gives you this FREE)
- **~40,000 text searches/month**
- **~100,000 autocomplete requests/month**

### Tacoma Eats Usage:
- **~500-1,000 searches/day** = ~$5-10/month
- **Well under the $200 free credit**

### Cost Breakdown:
- Text Search: $0.032 per search
- Place Details: $0.017 per request
- Photos: $0.007 per photo

---

## 🛡️ Security Best Practices

✅ **Always restrict your API keys**
✅ **Set up billing alerts**  
✅ **Don't share keys publicly**
✅ **Rotate keys if compromised**
✅ **Monitor usage regularly**

---

## 🚨 Troubleshooting

### "This API project is not authorized..."
→ Make sure you enabled "Places API (New)" in Step 5

### "The provided API key is invalid"
→ Check you copied the entire key correctly
→ No extra spaces before/after

### "REQUEST_DENIED"
→ Enable billing (Step 6)
→ Wait a few minutes after enabling

### "You have exceeded your daily quota"
→ Check your usage in Google Cloud Console
→ Upgrade or wait until tomorrow

---

## 🔗 Useful Links

- **Google Cloud Console:** https://console.cloud.google.com/
- **Places API Docs:** https://developers.google.com/maps/documentation/places/web-service
- **Pricing Calculator:** https://mapsplatform.google.com/pricing/
- **API Dashboard:** https://console.cloud.google.com/apis/dashboard

---

**Need help?** Ask in the Tacoma Eats support channel!
