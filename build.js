#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');

// Load configuration
const configPath = path.join(__dirname, 'config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

// Ensure output directory exists
const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// WebJSX component templates
const components = {
  // Hero component
  hero: (page) => `
    <section class="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden" style="background-image: url('${page.content.image}');">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center px-4 max-w-3xl">
        <h1 class="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">${page.content.heading}</h1>
        <p class="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow-md">${page.content.subheading}</p>
        <a href="./about.html" class="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
          ${page.content.cta_text}
        </a>
      </div>
    </section>
  `,

  // Section component with image and text
  section: (page) => `
    <section class="py-16 md:py-24 ${page.index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-4">${page.content.heading}</h2>
          <p class="text-xl text-gray-600 max-w-2xl">${page.content.description}</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="rounded-xl overflow-hidden shadow-xl">
            <img src="${page.content.image}" alt="${page.content.heading}" class="w-full h-96 object-cover hover:scale-105 transition-transform duration-300">
          </div>
          <div class="space-y-8">
            ${page.content.sections.map(section => `
              <div>
                <h3 class="text-3xl font-bold text-orange-600 mb-3">${section.title}</h3>
                <p class="text-gray-700 leading-relaxed text-lg">${section.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `,

  // Grid component for cards
  grid: (page) => `
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-16">
          <h2 class="text-5xl md:text-6xl font-bold text-gray-900 mb-4">${page.content.heading}</h2>
          <p class="text-xl text-gray-600 max-w-2xl">${page.content.description}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${page.content.items.map(item => `
            <div class="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div class="relative h-64 overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
              </div>
              <div class="p-6">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">${item.name}</h3>
                <p class="text-gray-600 leading-relaxed">${item.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `,

  // Contact component
  contact: (page) => `
    <section class="py-20 md:py-32 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-5xl md:text-6xl font-bold mb-6">${page.content.heading}</h2>
        <p class="text-xl mb-10 text-orange-100">${page.content.description}</p>
        <button class="inline-block bg-white hover:bg-gray-100 text-orange-600 font-bold py-4 px-10 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-xl text-lg">
          ${page.content.cta_text}
        </button>
      </div>
    </section>
  `
};

// Navigation component with GitHub Pages-friendly links
const navbar = (currentPageId = 'home') => {
  const getLink = (href) => {
    if (href === '/') return './index.html';
    if (href.startsWith('/')) return `.${href}.html`;
    return href;
  };

  return `
  <nav class="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <a href="./index.html" class="text-3xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
            🐅 ${config.site.title.split(':')[0]}
          </a>
        </div>
        <div class="hidden md:flex space-x-1">
          ${config.navigation.map(item => `
            <a href="${getLink(item.href)}" class="px-4 py-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-50 transition-colors font-medium">
              ${item.text}
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  </nav>
`;
};

// Footer component
const footer = () => `
  <footer class="bg-gray-900 text-white py-12 border-t-4 border-orange-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <p class="text-gray-300 text-lg">${config.footer.text}</p>
      </div>
      <div class="flex flex-wrap gap-6 text-gray-400">
        ${config.footer.social.map(social => `
          <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="hover:text-orange-400 transition-colors font-medium">
            ${social.name}
          </a>
        `).join(' • ')}
      </div>
    </div>
  </footer>
`;

// Generate CSS file
const tailwindCSS = fs.readFileSync(require.resolve('tailwindcss/package.json')).toString();

// Base HTML template with full SEO meta tags
const baseTemplate = (content, pageTitle, pageId, pageDescription) => {
  const siteUrl = 'https://anentrypoint.github.io/flatspace-demo';
  const pageUrl = pageId === 'home' ? siteUrl : `${siteUrl}/${pageId}.html`;
  const fullTitle = pageId === 'home' ? config.site.title : `${pageTitle} - ${config.site.title}`;
  const description = pageDescription || config.site.description;
  const image = `${siteUrl}/og-image.jpg`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Basic Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <meta name="author" content="${config.site.author}">
    <meta name="keywords" content="tigers, wildlife, conservation, predators, endangered species, big cats">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">

    <!-- Open Graph Meta Tags (Social Media) -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${fullTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="${config.site.title}">
    <meta property="og:locale" content="en_US">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${fullTitle}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    <meta name="twitter:site" content="@tigers">
    <meta name="twitter:creator" content="@tigers">

    <!-- Additional SEO Meta Tags -->
    <meta name="revisit-after" content="7 days">
    <meta name="rating" content="general">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="format-detection" content="telephone=no">

    <!-- Canonical URL -->
    <link rel="canonical" href="${pageUrl}">

    <!-- Favicon and App Icons -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>🐅</text></svg>">
    <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><text y='135' font-size='150'>🐅</text></svg>">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="./styles.css">

    <!-- Preconnect to External Resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Title -->
    <title>${fullTitle}</title>

    <style>
      html {
        scroll-behavior: smooth;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Playfair Display', serif;
      }
    </style>

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "${config.site.title}",
      "description": "${config.site.description}",
      "url": "${siteUrl}",
      "author": {
        "@type": "Organization",
        "name": "${config.site.author}"
      }
    }
    </script>
</head>
<body class="bg-white">
    ${navbar(pageId)}
    ${content}
    ${footer()}
</body>
</html>`;
};

// Generate CSS from Tailwind
try {
  console.log('🎨 Building CSS with Tailwind...');
  execSync('npx tailwindcss -i input.css -o dist/styles.css', { stdio: 'inherit' });
  console.log('✓ Generated styles.css');
} catch (error) {
  console.error('❌ Failed to build CSS:', error.message);
}

// Page-specific SEO descriptions
const pageDescriptions = {
  home: config.site.description,
  about: 'Learn about tigers - their physical characteristics, habitat, behavior, and the ecosystems they inhabit across Asia.',
  species: 'Explore the six subspecies of tigers worldwide - Bengal, Siberian, Sumatran, Malayan, Indochinese, and South China tigers.',
  behavior: 'Discover tiger behavior and hunting techniques - how these apex predators hunt, their social structure, and territorial nature.',
  conservation: 'Tiger conservation efforts and protection strategies to save these endangered species from extinction.',
  contact: 'Join the movement to protect tigers. Learn how you can help support tiger conservation initiatives worldwide.',
};

// Build pages
config.pages.forEach((page, index) => {
  page.index = index;
  const templateFn = components[page.template];
  if (!templateFn) {
    console.error(`Unknown template: ${page.template}`);
    return;
  }

  const content = templateFn(page);
  const pageDesc = pageDescriptions[page.id] || page.content.description || config.site.description;
  const html = baseTemplate(content, page.title, page.id, pageDesc);
  const filename = page.id === 'home' ? 'index.html' : `${page.id}.html`;
  const filepath = path.join(outputDir, filename);

  fs.writeFileSync(filepath, html);
  console.log(`✓ Built ${filename}`);
});

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /*.json$

Sitemap: https://anentrypoint.github.io/flatspace-demo/sitemap.xml

# Crawl-delay: 1
# Request-rate: 1/10s
`;

fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxt);
console.log('✓ Generated robots.txt');

// Generate XML sitemap
const siteUrl = 'https://anentrypoint.github.io/flatspace-demo';
const lastmod = new Date().toISOString().split('T')[0];
const sitemapUrls = config.pages.map(page => {
  const pageUrl = page.id === 'home' ? siteUrl : `${siteUrl}/${page.id}.html`;
  const priority = page.id === 'home' ? '1.0' : '0.8';
  return `  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapUrls}
</urlset>`;

fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemapXml);
console.log('✓ Generated sitemap.xml');

console.log(`\n✨ Build complete! Output in ${outputDir}/`);
