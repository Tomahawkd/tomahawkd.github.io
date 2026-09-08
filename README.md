# Tomahawkd's Logger

A personal Markdown archive with the interactive 3D UI from [RhineLabUI](https://github.com/LBEILC/RhineLabUI). Desktop visitors can browse the animated archive, search, save entries, and inspect the archive model. Articles and the mobile catalogue use a matching, responsive reading layout. Content remains available without JavaScript or WebGL.

## Publishing content

Add a Markdown file anywhere in a content folder, for example `blogs/2026-09-08-a-new-post.md`:

```markdown
---
title: A new post
date: 2026-09-08
description: An optional short introduction.
---

# First observation

Write your post here.
```

All front matter is optional. The first heading becomes the title when `title` is omitted. The filename can supply the date. The parent folder supplies the archive category, and the file path supplies the URL. Add, rename, nest, or remove folders and posts: navigation, directory indexes, search, archive records, and the sitemap are rebuilt automatically. Directory listings are generated; do not maintain Markdown lists of posts.

- `permalink: /blogs/my-stable-url` keeps a URL independent of a file's location. Existing posts retain their original permalinks. Omit this field if you want a move to change the URL.
- `category: Experiments` overrides the folder-derived category.
- `draft: true` or `published: false` excludes a post from the published site.
- Put images beside the post and reference them with `![Description](image.png)`. Nested content assets are copied automatically. Existing `/static/...` images continue working.
- Link to other posts using relative Markdown paths, such as `[Next](../notes/next.md)`. These resolve to their published URLs.
- Inline `$...$` and display `$$...$$` equations are rendered at build time. Headings become an automatic table of contents; ordinary fenced code blocks and tables are supported.
- Add or edit project links in `Repo.md`. The archive discovers those links too.

There is no hand-maintained route table, post registry, or UI code to update when publishing. Infrastructure folders (`src`, `public`, `scripts`, `static`, `node_modules`, `dist`), hidden/underscore-prefixed folders, and repository documentation such as `README.md` are excluded from content discovery.

## Local development

Use Node.js 22.12+:

```sh
npm ci
npm run dev
```

The development server refreshes content when Markdown files are added, edited, or removed. `npm run check` verifies content discovery and publishing behavior; `npm run build` produces the static site in `dist/`; `npm run preview` serves that build locally. Ruby and Jekyll are no longer needed.

The archive displays a 100-document stack (5 columns × 20 rows). Background document borders and fittings are simplified automatically during development/build, with the original glass panels, materials, and full-detail selected document retained. Glass refraction is rendered at half width and height (one quarter of the capture pixels), without lowering the main scene or text resolution. Geometry optimization runs only at build time; publishing content requires no extra steps.

3D resolution is bounded independently of window size: standard mode uses at most 1280 × 720 pixels and high-quality mode/the model viewer at most 1920 × 1080 pixels in total, preserving the window's aspect ratio. Post-processing follows the same limit. Fullscreen and high-DPI displays cannot increase the pixel workload beyond these budgets; HTML text and controls remain native-resolution.

## GitHub Pages

The included workflow builds and deploys the site when changes are pushed to `master`. The repository's Pages source must be **GitHub Actions** (a one-time repository setting when adopting this build). Thereafter, publishing only requires committing/pushing content changes. The existing `CNAME` is preserved.

## UI and attribution

`src/` adapts RhineLabUI's Three.js scene, archive navigation, transitions, viewer, and settings. The introductory animation is available through **REINITIALIZE**; ordinary visits open the archive directly. **READING INDEX** switches to a lightweight catalogue. Phones and browsers without WebGL use the catalogue automatically. Bookmarks use entry URLs so adding other posts does not shift saved entries.

Original site content and license remain in place. RhineLabUI's MIT license is retained in `public/licenses/rhinelab-ui.txt`; fonts and the rolling-number dependency retain their notices. See [credits](public/credits.html) for asset attribution and scope. Models and the original-inspired visual identity retain their upstream third-party rights notices.
