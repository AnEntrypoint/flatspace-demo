# Tigers: A Flatspace YAML Website

A modern, beautifully styled website about tigers built entirely from YAML configuration files using flatspace for static site generation.

## Features

- 📝 **YAML-driven**: Define your entire website structure in `config.yaml`
- 🎨 **Modern Design**: Beautiful, responsive design following web best practices
- 🐅 **Tiger-focused**: Learn about these magnificent predators
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- 🚀 **Fast**: Static site generation with no dependencies on heavy frameworks
- ♿ **Accessible**: Built with semantic HTML and accessibility in mind
- 🔄 **CI/CD Ready**: GitHub Actions workflow included for automatic builds

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

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the website:**
   ```bash
   npm run build
   ```

3. **View the website locally:**
   ```bash
   npm run dev
   ```
   The site will open automatically at `http://localhost:8080`

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
Edit the CSS custom properties in `styles.css`:

```css
:root {
  --primary: #your-color;
  --primary-dark: #darker-shade;
  --primary-light: #lighter-shade;
  /* ... more colors ... */
}
```

### Modify Fonts
Update the Google Fonts import and font-family variables in `styles.css`.

### Add New Pages
1. Add a new page object to the `pages` array in `config.yaml`
2. Choose a template or create a new one in `build.js`
3. Run `npm run build`

### Change Styling
All styling is in `styles.css`. The design uses:
- CSS Grid for layouts
- CSS Flexbox for navigation
- CSS Custom Properties (variables) for consistency
- Smooth transitions and hover effects

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

## Learn More

- [Flatspace Documentation](https://github.com/your-repo)
- [YAML Syntax](https://yaml.org/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Web Best Practices](https://web.dev/learn/)

---

Built with 🐅 and modern web standards
