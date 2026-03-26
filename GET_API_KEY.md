# 🔑 Get Your Yelp API Key (2 Minutes)

Follow these exact steps to get your free Yelp API key:

---

## Step 1: Go to Yelp Developers

Click this link: **https://www.yelp.com/signup?return_url=%2Fdevelopers%2Fv3%2Fmanage_app**

---

## Step 2: Sign Up or Log In

**If you don't have a Yelp account:**
1. Fill out the signup form
2. Use your email: `zach@forzapayments.com` (or personal email)
3. Create a password
4. Verify your email

**If you already have a Yelp account:**
1. Click "Log In"
2. Enter your credentials

---

## Step 3: Create Your App

After logging in, you'll be at: https://www.yelp.com/developers/v3/manage_app

1. Click **"Create New App"**
2. Fill out the form:
   - **App Name:** `Tacoma Eats`
   - **Industry:** `Other`
   - **Contact Email:** Your email
   - **Description:** `Restaurant discovery dashboard for Tacoma/Pierce County`
   - **Website URL:** Leave blank (optional)
3. Check the box: "I have read and agree to the Terms of Use and Display Requirements"
4. Click **"Create New App"**

---

## Step 4: Copy Your API Key

1. You'll see your new app dashboard
2. Find **"API Key"** section
3. Click **"Show"** next to the hidden API key
4. Copy the entire key (it's a long string like: `abc123xyz...`)

---

## Step 5: Add to Tacoma Eats

```bash
cd /root/clawd/tacoma-eats
nano .env.local
```

Paste this line (replace with your actual key):
```
NEXT_PUBLIC_YELP_API_KEY=paste_your_key_here
```

Save and exit (Ctrl+X, Y, Enter)

---

## Step 6: Test It

```bash
# If dev server is running, restart it
# Ctrl+C to stop, then:
npm run dev
```

Open http://localhost:3000 and search for "Pizza Tacoma" - you should see REAL restaurants!

---

## Troubleshooting

**"Application Not Found" error:**
- Make sure you copied the entire API key
- No spaces before or after the key in .env.local
- Restart the dev server after adding the key

**Rate limit error:**
- Free tier: 500 calls/day
- Should be plenty for testing
- Upgrade to paid if needed

**Need help?**
The API key is free and takes 2 minutes to get. You got this!

---

## What You Get (Free Tier)

✅ 500 API calls per day  
✅ Full restaurant data  
✅ Reviews and ratings  
✅ Hours and location  
✅ Photos  

Perfect for development and moderate traffic!
