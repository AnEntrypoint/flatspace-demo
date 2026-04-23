#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Load configuration
const configPath = path.join(__dirname, 'config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

// Ensure output directory exists
const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Template functions
const templates = {
  base: (content, pageTitle) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} - ${config.site.title}</title>
    <meta name="description" content="${config.site.description}">
    <link rel="stylesheet" href="/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">🐅 ${config.site.title.split(':')[0]}</div>
            <ul class="nav-links">
                ${config.navigation.map(item => `<li><a href="${item.href}">${item.text}</a></li>`).join('')}
            </ul>
        </div>
    </nav>
    ${content}
    <footer class="footer">
        <div class="container">
            <p>${config.footer.text}</p>
            <div class="social-links">
                ${config.footer.social.map(social => `<a href="${social.url}" target="_blank">${social.name}</a>`).join(' • ')}
            </div>
        </div>
    </footer>
</body>
</html>`,

  hero: (page) => templates.base(`
    <section class="hero" style="background-image: url('${page.content.image}')">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1>${page.content.heading}</h1>
            <p class="hero-subtitle">${page.content.subheading}</p>
            <a href="/about" class="btn btn-primary">${page.content.cta_text}</a>
        </div>
    </section>
  `, page.title),

  section: (page) => templates.base(`
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h1>${page.content.heading}</h1>
                <p class="lead">${page.content.description}</p>
            </div>
            <div class="section-content">
                <div class="section-image">
                    <img src="${page.content.image}" alt="${page.content.heading}">
                </div>
                <div class="section-text">
                    ${page.content.sections.map(section => `
                        <div class="subsection">
                            <h2>${section.title}</h2>
                            <p>${section.text}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>
  `, page.title),

  grid: (page) => templates.base(`
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h1>${page.content.heading}</h1>
                <p class="lead">${page.content.description}</p>
            </div>
            <div class="grid">
                ${page.content.items.map(item => `
                    <div class="card">
                        <div class="card-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="card-content">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
  `, page.title),

  contact: (page) => templates.base(`
    <section class="section contact-section">
        <div class="container">
            <div class="contact-content">
                <h1>${page.content.heading}</h1>
                <p class="lead">${page.content.description}</p>
                <button class="btn btn-primary btn-large">${page.content.cta_text}</button>
            </div>
        </div>
    </section>
  `, page.title)
};

// Build pages
config.pages.forEach(page => {
  const template = templates[page.template];
  if (!template) {
    console.error(`Unknown template: ${page.template}`);
    return;
  }

  const html = template(page);
  const filename = page.id === 'home' ? 'index.html' : `${page.id}.html`;
  const filepath = path.join(outputDir, filename);

  fs.writeFileSync(filepath, html);
  console.log(`✓ Built ${filename}`);
});

// Copy styles
const stylesContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
fs.writeFileSync(path.join(outputDir, 'styles.css'), stylesContent);
console.log('✓ Copied styles.css');

console.log(`\n✨ Build complete! Output in ${outputDir}/`);
