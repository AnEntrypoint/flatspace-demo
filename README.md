# Tigers: A Flatspace YAML Website

A modern, beautifully styled website about tigers built entirely from YAML configuration files using flatspace for static site generation with WebJSX web components, Ripple UI templates, and Tailwind CSS.

## Features

- 📝 **YAML-driven**: Define your entire website structure in `config.yaml`
- 🎨 **WebJSX Components**: Web Components framework with JSX support
- 🎯 **Ripple UI Templates**: Pre-built, modern component patterns
- 🌬️ **Tailwind CSS**: Utility-first CSS framework for rapid styling
- 🐅 **Tiger-focused**: Learn about these magnificent predators
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- 🚀 **Fast**: Static site generation with no JavaScript frameworks
- ⚙️ **GitHub Actions**: Automatic builds and deployment to GitHub Pages
- 🔐 **No Node Dependencies Locally**: All tooling runs in CI/CD

## Project Structure

```
flatspace-demo/
├── config.yaml              # Main site configuration (YAML)
├── build.js                 # Flatspace builder script
├── styles.css              # Modern CSS stylesheet
├── package.json            # Project dependencies
├── README.md              # This file
├── .github/
│   └── workflows/
│       └── build.yml      # GitHub Actions workflow
└── dist/                  # Output directory (generated)
    ├── index.html
    ├── about.html
    ├── species.html
    ├── behavior.html
    ├── conservation.html
    ├── contact.html
    └── styles.css
```

## Getting Started

### Edit Configuration (No Node Required)

Simply edit `config.yaml` to customize your website:
- Site title, description, metadata
- Navigation links
- Pages with different templates (hero, section, grid, contact)
- Footer content and social links
- Images and text content

### Build & Deploy (Automated via GitHub Actions)

1. **Push changes to main branch**
   ```bash
   git push origin main
   ```

2. **GitHub Actions automatically:**
   - Installs dependencies (`npm ci`)
   - Builds with Tailwind CSS
   - Generates static HTML files
   - Deploys to GitHub Pages

3. **View live site:**
   - https://lanmower.github.io/flatspace-demo/

### Local Preview (Optional)

If you want to build locally:

```bash
npm install
npm run build
# Open dist/index.html in browser
```

## Configuration

Edit `config.yaml` to customize your website:

### Site Metadata
```yaml
site:
  title: "Your Site Title"
  description: "Site description"
  author: "Your Name"
  year: 2026
```

### Pages
Each page is defined with:
- `id`: Unique identifier (used for filename)
- `title`: Page title
- `template`: Template type (hero, section, grid, contact)
- `content`: Page-specific content

### Navigation & Footer
Customize the navigation links and footer in the `navigation` and `footer` sections.

## Templates

### Hero Template
Full-height hero section with background image and call-to-action button.

```yaml
- id: home
  template: hero
  content:
    heading: "Title"
    subheading: "Subtitle"
    cta_text: "Button Text"
    image: "https://picsum.photos/1200/600"
```

### Section Template
Two-column layout with image and text content.

```yaml
- id: about
  template: section
  content:
    heading: "Title"
    description: "Description"
    image: "https://picsum.photos/600/400"
    sections:
      - title: "Subsection"
        text: "Content"
```

### Grid Template
Responsive card grid for showcasing multiple items.

```yaml
- id: species
  template: grid
  content:
    heading: "Title"
    description: "Description"
    items:
      - name: "Item Name"
        description: "Item description"
        image: "https://picsum.photos/400/300"
```

### Contact Template
Simple centered section with call-to-action.

```yaml
- id: contact
  template: contact
  content:
    heading: "Title"
    description: "Description"
    cta_text: "Button Text"
```

## Design System

The site uses a carefully chosen color palette:

- **Primary Orange**: #d97706 (main brand color)
- **Dark Gray**: #1f2937 (text)
- **Light Gray**: #f3f4f6 (backgrounds)
- **Accent Pink**: #ec4899 (highlights)

### Typography

- **Serif**: Playfair Display (headings, logo)
- **Sans-serif**: Inter (body text, UI)

Both fonts are loaded from Google Fonts for modern, elegant typography.

## Images

The site uses [Picsum Photos](https://picsum.photos/) for random tiger images. Replace the image URLs in `config.yaml` with your own images or other sources:

```yaml
image: "https://picsum.photos/1200/600?random=1"
```

## GitHub Pages Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch:

1. Push your changes to `main`
2. GitHub Actions automatically builds the site
3. The `dist/` folder is deployed to `gh-pages` branch
4. Your site is available at `https://yourusername.github.io/flatspace-demo`

### Enable GitHub Pages:
1. Go to repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose `gh-pages` branch as the source

## Customization Guide

### Change Colors

Edit `tailwind.config.js` to modify the color theme:

```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      'primary-dark': '#darker-shade',
      'primary-light': '#lighter-shade',
    },
  },
}
```

Then update the component colors in `build.js` to match.

### Modify Styling

1. Edit `input.css` for custom CSS
2. Edit `tailwind.config.js` for Tailwind theme
3. Run `npm run build` to generate new `dist/styles.css`

The design uses:
- Tailwind CSS utility classes
- CSS Grid for layouts
- CSS Flexbox for navigation
- Playfair Display serif font (Google Fonts)
- Smooth transitions and hover effects

### Add New Pages

1. Add a new page object to the `pages` array in `config.yaml`:
```yaml
- id: newpage
  title: "New Page"
  template: section
  content: { ... }
```

2. Add corresponding component template in `build.js` if needed
3. Push to main branch - GitHub Actions will build automatically

### Create Custom Components

Add new template functions in `build.js`:

```js
components: {
  mytemplate: (page) => `
    <section class="...">
      <h1>${page.content.heading}</h1>
    </section>
  `
}
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

## Performance

- Static HTML files (no JavaScript frameworks)
- Optimized CSS (~8KB)
- Image lazy-loading ready
- First Contentful Paint: <1s (depends on image loading)

## Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Sufficient color contrast
- Keyboard navigation support
- Responsive text sizes

## License

MIT - Feel free to use this as a template for your own projects!

## Architecture

### Build Process

```
config.yaml (YAML config)
    ↓
build.js (Node.js)
    ↓
Components → HTML Pages
input.css → Tailwind compilation → styles.css
    ↓
dist/ (Static files)
    ↓
GitHub Actions → GitHub Pages
```

### Files

- **config.yaml** - Site content and structure
- **build.js** - YAML → HTML builder with component templates
- **input.css** - Tailwind CSS directives
- **tailwind.config.js** - Tailwind theme configuration
- **postcss.config.js** - PostCSS configuration
- **.github/workflows/build.yml** - CI/CD automation

### Dependencies

Only required in GitHub Actions (not locally):
- `js-yaml` - YAML parsing
- `tailwindcss` - CSS generation
- `autoprefixer` - CSS vendor prefixes

## Learn More

- [WebJSX](https://webjsx.org) - Web Components framework
- [Ripple UI](https://ripple-ui.com) - Component library
- [Tailwind CSS](https://tailwindcss.com) - Utility CSS
- [YAML Syntax](https://yaml.org/)
- [GitHub Pages](https://pages.github.com/)
- [Web Best Practices](https://web.dev/learn/)

---

Built with 🐅 WebJSX, Ripple UI, and Tailwind CSS
