// This script generates app icons for PWA
// Run: node INSTALL_ICONS_SCRIPT.js

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgIcon = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#2563eb" rx="80"/>
  <path d="M150 120h212c20 0 36 16 36 36v200c0 20-16 36-36 36H150c-20 0-36-16-36-36V156c0-20 16-36 36-36z" fill="white"/>
  <rect x="170" y="160" width="172" height="16" fill="#2563eb" rx="8"/>
  <rect x="170" y="200" width="120" height="12" fill="#93c5fd" rx="6"/>
  <rect x="170" y="240" width="172" height="8" fill="#dbeafe" rx="4"/>
  <rect x="170" y="260" width="172" height="8" fill="#dbeafe" rx="4"/>
  <rect x="170" y="280" width="140" height="8" fill="#dbeafe" rx="4"/>
  <rect x="170" y="320" width="172" height="8" fill="#dbeafe" rx="4"/>
  <rect x="170" y="340" width="172" height="8" fill="#dbeafe" rx="4"/>
</svg>
`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  const publicDir = path.join(__dirname, 'public');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('🎨 Generating PWA icons...\n');

  for (const size of sizes) {
    const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);
    
    try {
      await sharp(Buffer.from(svgIcon))
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated: icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`✗ Failed to generate icon-${size}x${size}.png:`, error.message);
    }
  }

  console.log('\n✅ All icons generated successfully!');
  console.log('\nTo customize icons:');
  console.log('1. Edit the SVG template in this file');
  console.log('2. Run: node INSTALL_ICONS_SCRIPT.js');
  console.log('3. Icons will be regenerated in public/ folder\n');
}

generateIcons().catch(console.error);
