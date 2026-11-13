# DiffPilot website

The public website and support hub for **DiffPilot**, the native Git diff and code review app for Mac.

**Live site:** https://tzutalin.github.io/DiffPilot/

| Page | Purpose |
| --- | --- |
| [`index.html`](index.html) | Landing page (App Store marketing URL) |
| [`docs.html`](docs.html) | Command line, git difftool, git mergetool, shortcuts, troubleshooting |
| [`support.html`](support.html) | Support URL for App Store Connect |
| [`privacy.html`](privacy.html) | Privacy policy URL for App Store Connect |
| [`terms.html`](terms.html) | Terms of use |
| [`app-store.html`](app-store.html) | App Store metadata, screenshots, privacy answers and review notes |
| [`404.html`](404.html) | Not found page |

Bug reports and feature requests: [GitHub Issues](https://github.com/tzutalin/DiffPilot/issues/new/choose).

## Preview locally

```sh
python3 -m http.server 8000
open http://localhost:8000/
```

## Publish

GitHub → Settings → Pages → Deploy from a branch → `mainline` / root. The site is static HTML, CSS and one small script; `.nojekyll` turns off Jekyll processing.

## Before release

- Replace the placeholder App Store link `https://apps.apple.com/app/id0000000000` in `index.html` with the real app ID.
- Confirm the price shown on the site matches App Store Connect.

## Assets

- `assets/app-store/` App Store screenshots at 2880 × 1800, plus thumbnails
- `assets/screens/` website screenshots
- `assets/fonts/` Geist and Geist Mono (SIL Open Font License, see `assets/fonts/OFL.txt`)
- `assets/icons/` Phosphor icons (MIT)

## Regenerating App Store screenshots

`tools/app-store/raw/` holds the unframed app captures (from `cargo test demo_screenshots -- --ignored` in the app repo). Run `python3 tools/app-store/frame.py` (needs Pillow and macOS system fonts) to rebuild the framed 2880 × 1800 PNGs in `assets/app-store/`.

© 2026 DiffPilot. All rights reserved. See [LICENSE](LICENSE).
