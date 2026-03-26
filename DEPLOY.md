# 🚀 Deploy Tacoma Eats to Production

Multiple deployment options - choose the easiest for you!

---

## Option 1: Vercel (Recommended - Easiest)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zachalexlee/tacoma-eats&env=NEXT_PUBLIC_YELP_API_KEY&envDescription=Yelp%20Fusion%20API%20Key&envLink=https://www.yelp.com/developers/v3/manage_app)

1. Click the button above
2. Sign in with GitHub
3. Add your Yelp API key (or leave blank to use mock data)
4. Click "Deploy"
5. Done! Your app will be live at `https://tacoma-eats.vercel.app`

### Manual Vercel Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /root/clawd/tacoma-eats
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: tacoma-eats
# - Framework: Next.js
# - Add NEXT_PUBLIC_YELP_API_KEY? (paste your key or skip)

# Deploy to production
vercel --prod
```

---

## Option 2: Netlify

### One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zachalexlee/tacoma-eats)

1. Click button above
2. Connect your GitHub account
3. Configure:
   - Repository: `zachalexlee/tacoma-eats`
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variable:
   - Key: `NEXT_PUBLIC_YELP_API_KEY`
   - Value: Your Yelp API key (or leave blank)
5. Click "Deploy site"
6. Done! Live at `https://tacoma-eats.netlify.app`

### Manual Netlify Deploy

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
cd /root/clawd/tacoma-eats
netlify init

# Follow prompts
netlify deploy --prod
```

---

## Option 3: Railway

### One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/zachalexlee/tacoma-eats)

1. Click button
2. Sign in with GitHub
3. Add environment variable `NEXT_PUBLIC_YELP_API_KEY`
4. Deploy

### Manual Railway Deploy

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize and deploy
cd /root/clawd/tacoma-eats
railway init
railway up

# Add environment variable
railway variables set NEXT_PUBLIC_YELP_API_KEY=your_key_here
```

---

## Option 4: GitHub Pages (Static Export)

```bash
cd /root/clawd/tacoma-eats

# Add to next.config.ts:
# output: 'export'

npm run build

# Push .next/static to GitHub Pages
```

---

## Environment Variables Needed

All platforms need:

- `NEXT_PUBLIC_YELP_API_KEY` (optional - uses mock data if not set)

Get your key: https://www.yelp.com/developers/v3/manage_app

---

## After Deployment

### Test Your Live Site

1. Visit your deployed URL
2. Search for "Pizza Tacoma"
3. Should see real restaurants (if API key added)
4. Or see 3 mock restaurants (if no API key)

### Add Custom Domain (Optional)

**Vercel:**
1. Go to project settings
2. Domains > Add
3. Add `tacomaeats.com` or `eats.forzapayments.com`
4. Configure DNS

**Netlify:**
1. Site settings > Domain management
2. Add custom domain
3. Configure DNS

---

## Monitoring & Updates

### Auto-Deploy on Git Push

All platforms automatically redeploy when you push to GitHub:

```bash
cd /root/clawd/tacoma-eats
git add .
git commit -m "Update features"
git push

# Automatically triggers production deploy!
```

### View Logs

**Vercel:**
```bash
vercel logs
```

**Netlify:**
```bash
netlify logs
```

**Railway:**
```bash
railway logs
```

---

## Estimated Traffic Handling

**Free Tiers:**
- Vercel: 100GB bandwidth/month
- Netlify: 100GB bandwidth/month
- Railway: 500 hours/month

**With 500 Yelp API calls/day:**
- ~15,000 calls/month
- Should support moderate traffic
- Upgrade to paid if needed

---

## Troubleshooting

### Build Fails

```bash
# Test locally first
npm run build

# Check for errors
# Fix and commit
git push
```

### API Key Not Working

1. Make sure it's set in platform settings
2. Redeploy after adding
3. Check browser console for errors

### Site Not Loading

1. Check deployment logs
2. Verify build succeeded
3. Check DNS if using custom domain

---

**Fastest Option:** Vercel one-click deploy (2 minutes)

**Most Control:** Manual CLI deploy (5 minutes)

**Both work great!**
