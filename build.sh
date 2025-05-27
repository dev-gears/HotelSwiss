#!/bin/bash

# Build script for Vercel deployment
set -e

echo "Starting build process..."

echo "Node.js version:"
node --version

echo "NPM version:"
npm --version

# Set Node.js options for better performance
export NODE_OPTIONS="--max-old-space-size=4096"
export NODE_ENV="production"

echo "Cleaning previous builds..."
rm -rf .nuxt .output node_modules/.cache

echo "Installing dependencies with legacy peer deps..."
npm ci --prefer-offline --no-audit --legacy-peer-deps

echo "Running Nuxt prepare..."
npm run postinstall

echo "Building project..."
npm run build

echo "Build completed successfully!"

# Verify build output
if [ -d ".output" ]; then
    echo "✅ Build output directory exists"
    echo "Build size:"
    du -sh .output/
else
    echo "❌ Build output directory not found"
    exit 1
fi
