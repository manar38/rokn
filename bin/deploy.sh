#!/bin/bash
# Vercel Deployment Script

echo "🚀 Deploying Qeema project to Vercel..."

# Verify files
node "$(dirname "$0")/build.js"

if [ $? -eq 0 ]; then
  echo "📦 Triggering Vercel deploy..."
  npx vercel --prod
else
  echo "❌ Build check failed. Aborting deploy."
  exit 1
fi
