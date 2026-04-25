const components = {
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

const navbar = (site, navigation, currentPageId) => {
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
            🐅 ${site.title.split(':')[0]}
          </a>
        </div>
        <div class="hidden md:flex space-x-1">
          ${navigation.map(item => `
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

const footerHtml = (nav) => `
  <footer class="bg-gray-900 text-white py-12 border-t-4 border-orange-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <p class="text-gray-300 text-lg">${nav.footer.text}</p>
      </div>
      <div class="flex flex-wrap gap-6 text-gray-400">
        ${nav.footer.social.map(s => `
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="hover:text-orange-400 transition-colors font-medium">
            ${s.name}
          </a>
        `).join(' • ')}
      </div>
    </div>
  </footer>
`;

const baseTemplate = (content, site, nav, pageTitle, pageId, pageDescription) => {
  const pageUrl = pageId === 'home' ? site.url : `${site.url}/${pageId}.html`;
  const fullTitle = pageId === 'home' ? site.title : `${pageTitle} - ${site.title}`;
  const description = pageDescription || site.description;
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <meta name="author" content="${site.author}">
    <meta name="keywords" content="${site.keywords.join(', ')}">
    <meta property="og:title" content="${fullTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${pageUrl}">
    <link rel="canonical" href="${pageUrl}">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>🐅</text></svg>">
    <link rel="stylesheet" href="./styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <title>${fullTitle}</title>
</head>
<body class="bg-white">
    ${navbar(site, nav.navigation, pageId)}
    ${content}
    ${footerHtml(nav)}
</body>
</html>`;
};

const pageDescriptions = {
  home: null,
  about: 'Learn about tigers - their physical characteristics, habitat, behavior, and the ecosystems they inhabit across Asia.',
  species: 'Explore the six subspecies of tigers worldwide - Bengal, Siberian, Sumatran, Malayan, Indochinese, and South China tigers.',
  behavior: 'Discover tiger behavior and hunting techniques - how these apex predators hunt, their social structure, and territorial nature.',
  conservation: 'Tiger conservation efforts and protection strategies to save these endangered species from extinction.',
  contact: 'Join the movement to protect tigers. Learn how you can help support tiger conservation initiatives worldwide.',
};

const pageOrder = ['home', 'about', 'species', 'behavior', 'conservation', 'contact'];

export default {
  render: async (ctx) => {
    const site = ctx.readGlobal('site');
    const nav = ctx.readGlobal('navigation');
    const { docs: pages } = ctx.read('pages');
    pages.sort((a, b) => pageOrder.indexOf(a.id) - pageOrder.indexOf(b.id));

    const outputs = [];

    outputs.push({
      path: 'robots.txt',
      html: `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`
    });

    const lastmod = new Date().toISOString().split('T')[0];
    outputs.push({
      path: 'sitemap.xml',
      html: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => {
        const url = p.id === 'home' ? site.url : `${site.url}/${p.id}.html`;
        return `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod><priority>${p.id === 'home' ? '1.0' : '0.8'}</priority></url>`;
      }).join('\n')}\n</urlset>`
    });

    pages.forEach((page, index) => {
      page.index = index;
      const templateFn = components[page.template];
      if (!templateFn) { console.error('Unknown template:', page.template); return; }
      const desc = pageDescriptions[page.id] || page.content.description || site.description;
      outputs.push({
        path: page.id === 'home' ? 'index.html' : `${page.id}.html`,
        html: baseTemplate(templateFn(page), site, nav, page.title, page.id, desc)
      });
    });

    return outputs;
  }
};
