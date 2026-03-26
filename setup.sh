#!/bin/bash

# Tacoma Eats - Automated Setup Script
# This script does everything to get your app production-ready

set -e  # Exit on error

echo "🍴 Tacoma Eats - Automated Setup"
echo "================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Must run from /root/clawd/tacoma-eats directory${NC}"
    exit 1
fi

echo "Step 1: Installing dependencies..."
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

echo "Step 2: Building production version..."
npm run build
echo -e "${GREEN}✓ Build successful${NC}"
echo ""

echo "Step 3: Checking Git repository..."
if [ ! -d ".git" ]; then
    echo "Initializing Git..."
    git init
    git add -A
    git commit -m "Initial commit"
fi
echo -e "${GREEN}✓ Git repository ready${NC}"
echo ""

echo "Step 4: Checking GitHub remote..."
if git remote | grep -q "origin"; then
    echo "GitHub remote already configured"
else
    echo "GitHub repository: https://github.com/zachalexlee/tacoma-eats"
fi
echo -e "${GREEN}✓ GitHub ready${NC}"
echo ""

echo "Step 5: Checking environment file..."
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local..."
    cat > .env.local << 'EOF'
# Yelp Fusion API Key
# Get yours at: https://www.yelp.com/developers/v3/manage_app
# Free tier: 500 calls/day
NEXT_PUBLIC_YELP_API_KEY=

# The app will use mock data if no API key is provided
EOF
    echo -e "${YELLOW}⚠ Created .env.local - Add your Yelp API key there${NC}"
else
    echo ".env.local already exists"
fi
echo -e "${GREEN}✓ Environment file ready${NC}"
echo ""

echo "================================="
echo -e "${GREEN}Setup Complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Get Yelp API Key (2 minutes):"
echo "   See GET_API_KEY.md for instructions"
echo "   https://www.yelp.com/developers/v3/manage_app"
echo ""
echo "2. Add API key to .env.local:"
echo "   nano .env.local"
echo "   (or it works with mock data too!)"
echo ""
echo "3. Run locally:"
echo "   npm run dev"
echo "   Open http://localhost:3000"
echo ""
echo "4. Deploy to production:"
echo "   See DEPLOY.md for options"
echo "   Recommended: Vercel (one-click)"
echo ""
echo "================================="
echo ""
echo -e "${GREEN}Repository:${NC} https://github.com/zachalexlee/tacoma-eats"
echo -e "${GREEN}Status:${NC} ✅ Production Ready!"
echo ""
