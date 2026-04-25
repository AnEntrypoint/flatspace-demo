# Agents Documentation

## Git Default Contributor Configuration

**Requirement:** `lanmower` must always be the system default git contributor. This is a permanent global configuration that persists across all sessions.

**Configuration:**
- Git name: `lanmower` (set via `git config --global user.name "lanmower"`)
- Git email: `lanmower@users.noreply.github.com` (set via `git config --global user.email "lanmower@users.noreply.github.com"`)

**Verification:** Run `git config --global user.name` to confirm lanmower is configured. Never commit with `imraanlockhat` or any other contributor name.

**HARD RULE - No Co-Authored-By Trailers:** Git commits must NEVER include `Co-Authored-By` trailers in commit messages. This includes:
- No "Co-Authored-By: Claude ..." lines
- No "Co-Authored-By: imraanlockhat ..." lines
- No co-author trailers of any kind

The repository history was rewritten with `git filter-branch` to remove all co-author trailers and incorrect author identities. Always strip these lines from commit messages before committing. The only contributor is `lanmower`.

## GitHub CLI Authentication

GitHub CLI (`gh`) is available and authenticated as user `lanmower` with the following scopes:
- `repo` — full repository access
- `workflow` — GitHub Actions workflow management
- `gist` — gist operations

**Authentication method:** HTTPS protocol with keyring token authentication. This setup enables publishing and repository operations without requiring separate SSH configuration.

**When to use:** Prefer `gh` commands over raw `git push` for repository operations, as the authentication is already configured and functional.

## Project: Flatspace Tiger Website

A demo website about tigers built with the Flatspace YAML-based build system.

**Key files:**
- `flatspace.config.mjs` — Build configuration
- `README.md` — Project readme

## Flatspace Build Configuration

No `package.json` or `npm install` needed. CI runs a single step:

```
npx --yes flatspace@latest build
```

Flatspace internally runs `npx --yes @tailwindcss/cli@latest` to compile `src/styles/input.css` → `dist/styles.css`. Uses Tailwind v4 CSS syntax (`@import "tailwindcss"`, `@theme { }`).
