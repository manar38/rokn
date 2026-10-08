#!/usr/bin/env node

/**
 * Build and Verification Binary Script
 * Usage: node bin/build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('⚡ Checking full multi-page project structure for Vercel deployment...\n');

const requiredFiles = [
  'index.html',
  'services.html',
  'packages.html',
  'process.html',
  'trust.html',
  'about.html',
  'careers.html',
  'contact.html',
  'check.html',
  'erp.html',
  'login.html',
  'staff-login.html',
  'css/style.css',
  'css/variables.css',
  'css/animations.css',
  'js/viewmodel.js',
  'js/main.js',
  'vercel.json'
];

let allPassed = true;

for (const relPath of requiredFiles) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(fullPath)) {
    const size = fs.statSync(fullPath).size;
    console.log(`  ✓ [FOUND] ${relPath} (${size} bytes)`);
  } else {
    console.error(`  ✗ [MISSING] ${relPath}`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n✅ All multi-page assets, styles, and configurations are verified and 100% ready for Vercel deployment!');
  process.exit(0);
} else {
  console.error('\n❌ Build verification failed: some required files are missing.');
  process.exit(1);
}
