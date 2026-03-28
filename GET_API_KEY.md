# 🔑 Get Your Google Places API Key (10 Minutes)

This guide will walk you through getting your FREE Google Places API key.

---

## 🎯 Quick Facts

- **Cost:** FREE ($200/month credit from Google)
- **Time:** 10 minutes
- **Credit Card Required:** Yes (but you won't be charged)
- **Monthly Usage:** ~$5-10 for this app (well under $200 limit)

---

## 📋 Full Step-by-Step Guide

**See `GOOGLE_API_SETUP.md` for the complete detailed guide!**

That file includes:
- Screenshots and detailed explanations
- Security setup
- Budget alerts
- Troubleshooting
- Testing instructions

---

## ⚡ Quick Version

### 1. Create Google Cloud Account
→ https://console.cloud.google.com/

### 2. Create Project
- Name: "Tacoma Eats"

### 3. Enable Places API
- Search for "Places API (New)"
- Click "Enable"

### 4. Set Up Billing
- Add credit card (FREE $200/month credit)
- No charges unless you exceed $200

### 5. Create API Key
- APIs & Services → Credentials
- Create Credentials → API Key
- Copy the key!

### 6. Restrict the Key (Security!)
- API Restrictions: Check "Places API (New)"
- Application Restrictions: Add your Vercel URL
- Save

---

## ✅ Add to Your App

### For Vercel (Production):

1. Go to https://vercel.com/dashboard
2. Click **tacoma-eats2** project
3. Settings → Environment Variables
4. Add New:
   - **Name:** `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`
   - **Value:** Your API key
   - Check all 3 environments
5. Save
6. Deployments → Redeploy

### For Local Testing:

```bash
cd /root/clawd/tacoma-eats
nano .env.local
```

Add:
```
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_key_here
```

Save (Ctrl+X, Y, Enter)

```bash
npm run dev
```

---

## 🆘 Need Help?

See `GOOGLE_API_SETUP.md` for:
- Detailed instructions with screenshots
- Troubleshooting guide
- Security best practices
- Cost monitoring setup

---

**You got this!** 🚀
