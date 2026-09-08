# Tomahawkd's Logger — content

This is the data repository for [Tomahawkd's Logger](https://github.tomahawkd.online).
UI code, models, fonts, reader styles, build scripts, dependencies, and tests live
in [Tomahawkd/RhineLabUI](https://github.com/Tomahawkd/RhineLabUI).

## Publish a blog

Add a Markdown file to any content folder, for example `blogs/2026-09-08-a-new-post.md`:

```markdown
---
title: A new post
date: 2026-09-08
description: An optional short introduction.
---

# First observation

Write your post here.
```

Commit and push. GitHub Actions fetches the UI engine, builds the site, and
publishes it to Pages. You do not install dependencies or edit UI code here.

All front matter is optional. The first heading supplies the title, the filename
can supply the date, the parent folder supplies the category, and the file path
supplies the URL. Add, rename, nest, or delete folders and posts: navigation,
directory indexes, search, archive records, and the sitemap update automatically.
Do not maintain Markdown lists of posts or a route table.

- `permalink: /blogs/my-stable-url` keeps a URL when moving a file. Existing URLs remain unchanged.
- `category: Experiments` overrides the folder-derived category.
- `draft: true` or `published: false` excludes an entry from publication.
- Put images beside posts and use relative links, such as `![Diagram](diagram.png)`. Existing `static/` assets remain supported.
- Relative Markdown links follow the destination's permalink.
- `$...$` and `$$...$$` equations, code blocks, and heading-based tables of contents are supported.
- Manage project links in `Repo.md`.

## Site-level data

Edit `site.json` to change the site title, author, brand label, canonical URL,
description, catalogue intro, and project-link discovery settings. `CNAME`
controls the published custom domain; update it alongside `site.json` if the
domain changes. `favicon.ico` is also content owned by this repo.

There is no JavaScript, CSS, package manifest, or build implementation here.
The only automation is `.github/workflows/deploy.yml`. It pins a reviewed UI
commit so content builds are reproducible; updating that pin is needed only
when adopting a new UI version, never for ordinary content changes.

## Optional local preview

Run from the sibling UI checkout:

```sh
cd ../RhineLabUI
npm ci
RHINELAB_CONTENT_DIR=../tomahawkd.github.io npm run dev
```

On PowerShell, set `$env:RHINELAB_CONTENT_DIR = '../tomahawkd.github.io'` before
`npm run dev`. The UI engine watches this repo for content changes. Its generated
files and production output stay in the UI checkout, not in this data repo.

The Pages source remains **GitHub Actions**. Article content, existing links,
and the original content license remain here. UI and third-party asset licenses
are maintained in the UI repo and included in the published site's credits.
