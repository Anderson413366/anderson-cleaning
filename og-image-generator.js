/**
 * OG Image Generator for Anderson Cleaning Company
 *
 * This script generates 18 OpenGraph images (6 pages × 3 sizes)
 * using the official brand template.
 *
 * REQUIREMENTS:
 * - Node.js with canvas support (npm install canvas)
 * - Brand assets in public/brand/
 *
 * RUN: node /tmp/og-image-generator.js
 */

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Official Brand Colors (Pantone)
const COLORS = {
  deepBlue: '#002A86',    // Pantone 2747C
  brightBlue: '#0077D9',  // Pantone 3005C
  white: '#FFFFFF'
};

// OG Image Specifications
const SIZES = {
  standard: { width: 1200, height: 630 },  // Facebook, Twitter, LinkedIn
  square: { width: 1200, height: 1200 },   // Instagram, Facebook
  large: { width: 1600, height: 900 }      // LinkedIn featured
};

// Page Configurations
const PAGES = [
  {
    slug: 'home',
    title: 'Commercial Cleaning Services',
    subtitle: 'Western Massachusetts & Northern Connecticut',
    tagline: 'Professional B2B Janitorial Services'
  },
  {
    slug: 'services',
    title: 'Commercial Cleaning Services',
    subtitle: 'Office • Healthcare • Janitorial',
    tagline: '18+ Years of Excellence'
  },
  {
    slug: 'industries',
    title: 'Industry-Specific Cleaning',
    subtitle: 'Healthcare • Corporate • Education • Retail',
    tagline: 'OSHA & CDC Compliant'
  },
  {
    slug: 'locations',
    title: 'Service Areas',
    subtitle: '100-Mile Radius from West Springfield, MA',
    tagline: '9 Primary Service Areas'
  },
  {
    slug: 'about',
    title: 'About Anderson Cleaning',
    subtitle: '18+ Years Serving Western MA & CT',
    tagline: 'W-2 Employees • 24/7 Support'
  },
  {
    slug: 'blog',
    title: 'Cleaning Industry Insights',
    subtitle: 'Tips, Best Practices, and Industry News',
    tagline: 'Expert Commercial Cleaning Advice'
  }
];

/**
 * Create gradient background (Deep Blue → Bright Blue)
 */
function createGradientBackground(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, COLORS.deepBlue);
  gradient.addColorStop(1, COLORS.brightBlue);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Draw white Anderson Cleaning logo (top left)
 */
async function drawLogo(ctx, logoPath, size) {
  const logo = await loadImage(logoPath);
  const logoHeight = size.width > 1200 ? 100 : 80;
  const logoWidth = (logo.width / logo.height) * logoHeight;
  const padding = size.width > 1200 ? 80 : 60;

  ctx.drawImage(logo, padding, padding, logoWidth, logoHeight);
}

/**
 * Draw page title and subtitle
 */
function drawText(ctx, page, size) {
  const isLarge = size.width > 1200;
  const padding = isLarge ? 80 : 60;
  const centerY = size.height / 2;

  // Title
  ctx.fillStyle = COLORS.white;
  ctx.font = `bold ${isLarge ? 72 : 60}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(page.title, size.width / 2, centerY);

  // Subtitle
  ctx.font = `${isLarge ? 36 : 32}px Inter, sans-serif`;
  ctx.globalAlpha = 0.9;
  ctx.fillText(page.subtitle, size.width / 2, centerY + (isLarge ? 80 : 70));

  // Bottom tagline
  ctx.font = `${isLarge ? 24 : 20}px Inter, sans-serif`;
  ctx.globalAlpha = 0.7;
  ctx.fillText(
    'Commercial Cleaning • Western MA & CT',
    size.width / 2,
    size.height - (isLarge ? 60 : 50)
  );

  ctx.globalAlpha = 1;
}

/**
 * Generate OG image
 */
async function generateOGImage(page, sizeName, size) {
  const canvas = createCanvas(size.width, size.height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  createGradientBackground(ctx, size.width, size.height);

  // Logo (white version)
  const logoPath = path.join(__dirname, 'public/brand/white/logo-full-2000-white.png');
  await drawLogo(ctx, logoPath, size);

  // Text content
  drawText(ctx, page, size);

  // Save file
  const outputDir = path.join(__dirname, 'public/og-images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filename = `${page.slug}-${size.width}x${size.height}.png`;
  const outputPath = path.join(outputDir, filename);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`✅ Generated: ${filename}`);
  return filename;
}

/**
 * Generate all OG images
 */
async function generateAllImages() {
  console.log('🎨 Generating OG Images for Anderson Cleaning Company\n');
  console.log('Using official brand colors:');
  console.log(`  - Deep Blue: ${COLORS.deepBlue} (Pantone 2747C)`);
  console.log(`  - Bright Blue: ${COLORS.brightBlue} (Pantone 3005C)\n`);

  let generated = 0;

  for (const page of PAGES) {
    console.log(`\n📄 Generating images for: ${page.title}`);

    for (const [sizeName, size] of Object.entries(SIZES)) {
      await generateOGImage(page, sizeName, size);
      generated++;
    }
  }

  console.log(`\n✨ Complete! Generated ${generated} OG images.`);
  console.log('\n📋 Next steps:');
  console.log('1. Review images in public/og-images/');
  console.log('2. Update page metadata with OG image paths');
  console.log('3. Test OG images with:');
  console.log('   - https://www.opengraph.xyz/');
  console.log('   - https://developers.facebook.com/tools/debug/');
}

// Run if executed directly
if (require.main === module) {
  generateAllImages().catch(console.error);
}

module.exports = { generateAllImages, COLORS, SIZES, PAGES };
