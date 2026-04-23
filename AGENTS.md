# Agents Documentation

## Git Default Contributor Configuration

**Requirement:** `lanmower` must always be the system default git contributor. This is a permanent global configuration that persists across all sessions.

**Configuration:**
- Git name: `lanmower` (set via `git config --global user.name "lanmower"`)
- Git email: `lanmower@github.com` (set via `git config --global user.email "lanmower@github.com"`)

**Verification:** Run `git config --global user.name` to confirm lanmower is configured. Never commit with `imraanlockhat` or any other contributor name.

## GitHub CLI Authentication

GitHub CLI (`gh`) is available and authenticated as user `lanmower` with the following scopes:
- `repo` — full repository access
- `workflow` — GitHub Actions workflow management
- `gist` — gist operations

**Authentication method:** HTTPS protocol with keyring token authentication. This setup enables publishing and repository operations without requiring separate SSH configuration.

**When to use:** Prefer `gh` commands over raw `git push` for repository operations, as the authentication is already configured and functional.

## Project: Flatspace Tiger Website

This is a demo website about tigers built with the Flatspace YAML-based build system. Recent updates include:
- Conversion to `npx flatspace` build system
- Architecture documentation for the build process
- Comprehensive SEO meta tags and documentation
- Project summary documentation

**Key files:**
- `flatspace.config.mjs` — Build configuration
- `ARCHITECTURE.md` — Build system architecture
- `SEO.md` — SEO documentation and meta tags
- `PROJECT_SUMMARY.md` — Complete project overview
- `README.md` — Project readme
