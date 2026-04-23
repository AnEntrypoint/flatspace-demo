# Flatspace Demo Architecture

## Build System

**Status:** ✅ Fully migrated to `npx flatspace build`

### Zero Local Dependencies
- No `package.json` or `node_modules` in the repository
- All dependencies managed exclusively by GitHub Actions
- Build runs with: `npx flatspace build`

### Configuration Files

#### `flatspace.config.mjs` (Root)
Entry point for the flatspace CLI. Specifies:
- Output directory: `dist/`
- Content directory: `config/`
- Tailwind CSS configuration
- Theme module path: `src/theme.mjs`

#### `config/` Directory
Modular JavaScript configuration files (no YAML parsing needed):

- **`config/site.js`** - Site metadata (title, description, author, URL, keywords)
- **`config/navigation.js`** - Navigation links and footer configuration
- **`config/pages.js`** - All page definitions (hero, about, species, behavior, conservation, contact)

Each file exports default object with configuration data.

#### `src/theme.mjs`
The theme module that flatspace invokes. Contains:
- Component template functions (hero, section, grid, contact)
- Layout components (navbar, footer)
- Base template with full SEO meta tags
- Page descriptions for SEO
- Render function that returns array of `{ path, html }` objects

The render function:
1. Generates `robots.txt` with sitemap reference
2. Generates `sitemap.xml` with all pages (auto-dated)
3. Builds all 6 HTML pages from config
4. Injects SEO meta tags per page

#### `src/styles/` Directory
- **`input.css`** - Tailwind directives source file
- **`base.css`** - Fallback/legacy CSS (optional)

Tailwind compilation handled by flatspace CLI during build.

#### `tailwind.config.js` & `postcss.config.js`
Theme configuration:
- Primary orange color scheme (#ea580c)
- Playfair Display serif + Inter sans-serif fonts
- PostCSS with tailwindcss and autoprefixer

## Build Process

### Local Testing
```bash
npx flatspace build
# Outputs to dist/
```

### GitHub Actions Workflow (`.github/workflows/build.yml`)
```yaml
- Checkout code
- Run: npx flatspace build
- Deploy dist/ to GitHub Pages
```

Triggers on: `push` to main/master/develop, `pull_request`

## Project Structure

```
flatspace-demo/
├── flatspace.config.mjs          # CLI entry point
├── tailwind.config.js            # Theme config
├── postcss.config.js             # CSS processing
├── .github/
│   └── workflows/
│       └── build.yml             # CI/CD automation
├── config/
│   ├── site.js                   # Site metadata
│   ├── navigation.js             # Nav + footer
│   └── pages.js                  # Page definitions
├── src/
│   ├── theme.mjs                 # Theme renderer
│   ├── styles/
│   │   ├── input.css             # Tailwind source
│   │   └── base.css              # Fallback CSS
│   ├── components/               # (Placeholder)
│   └── layouts/                  # (Placeholder)
├── dist/                         # Generated output
│   ├── index.html                # Home page
│   ├── about.html
│   ├── species.html
│   ├── behavior.html
│   ├── conservation.html
│   ├── contact.html
│   ├── styles.css                # Generated CSS
│   ├── robots.txt                # SEO directives
│   ├── sitemap.xml               # XML sitemap
│   └── .nojekyll                 # GitHub Pages flag
└── [docs files]

No local node_modules/ or package.json
```

## Content Editing Workflow

### Add/Update Site Info
Edit `config/site.js`:
```javascript
export default {
  site: {
    title: "Your Title",
    description: "...",
    author: "...",
    url: "...",
    keywords: [...]
  }
};
```

### Add/Update Navigation & Footer
Edit `config/navigation.js`:
```javascript
export default {
  navigation: [
    { text: "Page", href: "/page" }
  ],
  footer: {
    text: "...",
    social: [...]
  }
};
```

### Add/Update Pages
Edit `config/pages.js`:
```javascript
{
  id: "pageid",
  title: "Page Title",
  template: "section",  // hero|section|grid|contact
  content: { ... }
}
```

### Customizing Styles
Edit `src/styles/input.css` or `tailwind.config.js`, then rebuild.

## Deploy

```bash
git add -A
git commit -m "message"
git push origin main
# GitHub Actions builds and deploys automatically
```

Site goes live at: https://anentrypoint.github.io/flatspace-demo/

---

**Note:** This architecture ensures zero local Node.js dependencies while maintaining full automation through GitHub Actions and the flatspace CLI.
