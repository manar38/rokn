# PowerShell Vercel Deployment Script
Write-Host "🚀 Deploying Qeema project to Vercel..." -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
node "$scriptDir/build.js"

if ($LASTEXITCODE -eq 0) {
    Write-Host "📦 Triggering Vercel deploy..." -ForegroundColor Green
    npx vercel --prod
} else {
    Write-Host "❌ Build check failed. Aborting deploy." -ForegroundColor Red
}
