# Build script for Vercel deployment (PowerShell)

Write-Host "Starting build process..." -ForegroundColor Green

Write-Host "Node.js version:"
node --version

Write-Host "NPM version:"
npm --version

# Set Node.js options for better performance
$env:NODE_OPTIONS = "--max-old-space-size=4096"
$env:NODE_ENV = "production"

Write-Host "Cleaning previous builds..." -ForegroundColor Yellow
if (Test-Path ".nuxt") { Remove-Item -Recurse -Force ".nuxt" }
if (Test-Path ".output") { Remove-Item -Recurse -Force ".output" }
if (Test-Path "node_modules\.cache") { Remove-Item -Recurse -Force "node_modules\.cache" }

Write-Host "Installing dependencies with legacy peer deps..." -ForegroundColor Yellow
npm ci --prefer-offline --no-audit --legacy-peer-deps

Write-Host "Running Nuxt prepare..." -ForegroundColor Yellow
npm run postinstall

Write-Host "Building project..." -ForegroundColor Yellow
npm run build

Write-Host "Build completed successfully!" -ForegroundColor Green

# Verify build output
if (Test-Path ".output") {
    Write-Host "✅ Build output directory exists" -ForegroundColor Green
    Write-Host "Build contents:"
    Get-ChildItem ".output" -Recurse | Measure-Object -Property Length -Sum | ForEach-Object {
        "Total size: {0:N2} MB" -f ($_.Sum / 1MB)
    }
} else {
    Write-Host "❌ Build output directory not found" -ForegroundColor Red
    exit 1
}
