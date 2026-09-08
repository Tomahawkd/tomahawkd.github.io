import { readdir, readFile, mkdir, writeFile, rm, cp } from 'node:fs/promises';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import texmath from 'markdown-it-texmath';
import katex from 'katex';

const ignored = new Set(['node_modules', 'dist', 'src', 'public', 'scripts', 'static']);
const escape = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const humanize = (value) => value.replace(/^\d{4}-?\d{2}-?\d{2}[-_]?/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const slug = value => value.toLowerCase().trim().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s+/g, '-');
const markdown = new MarkdownIt({ html: true, linkify: true })
  .use(texmath, { engine: katex, delimiters: ['dollars', 'brackets'], katexOptions: { throwOnError: false, strict: 'ignore' } })
  .use(anchor, { slugify: slug });

export async function discover(root) {
  const files = [], assets = [];
  async function walk(dir) {
    for (const entry of (await readdir(join(root, dir), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!ignored.has(entry.name)) await walk(path);
      } else if (entry.isFile()) {
        if (/\.md$/i.test(entry.name) && !/^(README|AGENTS|CONTRIBUTING|DESIGN)\.md$/i.test(entry.name)) files.push(path);
        else if (dir && !['.ts', '.js', '.mjs', '.json', '.yml', '.yaml'].includes(extname(path))) assets.push(path);
      }
    }
  }
  await walk('');
  return { files, assets };
}

export function parsePage(file, raw) {
  const { data, content } = matter(raw);
  if (data.draft === true || data.published === false) return null;
  let route = String(data.permalink || '/' + file.replace(/\.md$/i, '').replace(/(^|\/)index$/i, '$1')).replace(/\/$/, '') || '/';
  if (!route.startsWith('/') || route.includes('..') || /[?#<>"\\]/.test(route) || route.startsWith('//')) throw new Error(`Invalid permalink in ${file}: ${route}`);
  const title = String(data.title || content.match(/^#\s+(.+)$/m)?.[1] || humanize(basename(file, '.md')));
  const folder = dirname(file) === '.' ? '' : dirname(file);
  const category = String(data.category || (folder ? humanize(basename(folder)) : 'Projects'));
  const dated = basename(file).match(/^(\d{4})-?(\d{2})-?(\d{2})/);
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date || (dated ? `${dated[1]}-${dated[2]}-${dated[3]}` : ''));
  // Preserve existing Jekyll content conventions; new posts need no includes.
  const body = content.replace(/{%\s*include\s+(title_patch|gen_index|latex_support)\.html\s*%}/g, '')
    .replace(/{{\s*page\.permalink\s*}}/g, route);
  const plain = body.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[#*_`>|]/g, '').replace(/\s+/g, ' ').trim();
  const summary = String(data.description || data.summary || plain.slice(0, 230) + (plain.length > 230 ? '…' : ''));
  return { file, route, title, category, date, body, summary, folder, tags: Array.isArray(data.tags) ? data.tags.map(String) : [] };
}

const navigation = (sections, current = '') => `<nav class="reader-nav" aria-label="Main navigation">${sections.map(s => `<a href="${escape(s.route)}" ${current === s.route || current.startsWith(s.route + '/') ? 'aria-current="page"' : ''}>${escape(s.title)}</a>`).join('')}<a href="https://github.com/Tomahawkd" target="_blank" rel="noopener">GITHUB ↗</a></nav>`;
const masthead = (sections, current) => `<a class="skip-content" href="#content">Skip to content</a><header class="reader-header"><a class="wordmark" href="/">TOMAHAWKD<span>PERSONAL ARCHIVE <b>／ LOGGER</b></span></a>${navigation(sections, current)}</header>`;
const footer = `<footer class="reader-footer"><span><i class="status-dot"></i> OPEN KNOWLEDGE · PERSONAL ARCHIVE</span><span>UI adapted from <a href="https://github.com/LBEILC/RhineLabUI">RhineLabUI</a> <a href="/credits.html">／ CREDITS</a></span><a href="#top">BACK TO TOP ↑</a></footer>`;

function document(title, description, route, body, { math = false } = {}) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#e8e5e1"><meta name="description" content="${escape(description)}"><title>${escape(title)} — Tomahawkd's Logger</title><link rel="canonical" href="https://github.tomahawkd.online${escape(route)}"><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="/reader.css">${math ? '<link rel="stylesheet" href="/katex/katex.min.css">' : ''}<script src="/reader.js" defer></script></head><body class="reader-page" id="top">${body}</body></html>`;
}

function cards(pages) {
  return `<div class="directory-list">${pages.map((p, i) => `<a class="directory-row" href="${escape(p.route)}"><span class="row-number">${String(i + 1).padStart(2, '0')}</span><div><span class="eyebrow">${escape(p.category)}${p.date ? ' / ' + escape(p.date) : ''}</span><h2>${escape(p.title)}</h2><p>${escape(p.summary)}</p></div><span class="row-arrow">↗</span></a>`).join('')}</div>`;
}

function catalogueCollections(records, categories) {
  return categories.map(category => {
    const entries = records.filter(record => record.category === category)
      .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
      .map(record => ({ ...record, route: record.source, summary: record.abstract, date: /^\d{4}-\d{2}-\d{2}/.test(record.date) ? record.date : '' }));
    return `<section class="catalogue-section" data-collection><div class="collection-heading"><span>${escape(category)}</span><span>${String(entries.length).padStart(2, '0')} FILES</span></div>${cards(entries)}</section>`;
  }).join('');
}

export async function collectContent(root) {
  const { files, assets } = await discover(root);
  const pages = (await Promise.all(files.map(async file => parsePage(file, await readFile(join(root, file), 'utf8'))))).filter(Boolean);
  const routes = new Set();
  for (const page of pages) {
    if (routes.has(page.route)) throw new Error(`Duplicate permalink: ${page.route}`);
    routes.add(page.route);
  }
  // Create missing directory pages from the routes, including newly added folders.
  for (const page of [...pages]) {
    let parent = dirname(page.route);
    while (parent !== '/') {
      if (!routes.has(parent)) {
        pages.push({ route: parent, title: humanize(basename(parent)), category: humanize(basename(parent)), summary: 'Notes and entries in this collection.', body: '', date: '', generated: true });
        routes.add(parent);
      }
      parent = dirname(parent);
    }
  }
  const children = route => pages.filter(p => p.route !== '/' && dirname(p.route) === route).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  const sections = children('/');
  for (const page of pages) page.children = children(page.route);
  const leaves = pages.filter(p => p.route !== '/' && !p.children.length);
  const records = leaves.map(p => ({ title: p.title, en: p.title, category: p.category, department: p.folder ? p.folder.split('/').map(humanize).join(' / ') : p.category, date: p.date || 'Undated notes', lead: 'Tomahawkd', clearance: 'PUBLIC ARCHIVE', abstract: p.summary, findings: [...p.body.matchAll(/^#{1,3}\s+(.+)$/gm)].slice(0, 6).map(m => m[1]), source: p.route, tags: p.tags || [] }));
  // Repository links remain content, authored only in the existing Markdown.
  for (const page of pages.filter(p => p.file && !p.folder)) {
    for (const match of page.body.matchAll(/\[([^\]]+)\]\((https:\/\/(?:github\.com\/Tomahawkd\/|tomahawkd\.github\.io\/)[^)]+)\)(?::\s*([^\n]+))?/gi)) {
      if (records.some(r => r.source === match[2])) continue;
      records.push({ title: match[1] === 'here' ? 'TLS-Tester' : match[1], en: match[1] === 'here' ? 'TLS-Tester' : match[1], category: 'Projects', department: 'Open source', date: 'Project', lead: 'Tomahawkd', clearance: 'OPEN SOURCE', abstract: match[3] || 'Explore this project and its documentation.', findings: [], source: match[2], tags: [] });
    }
  }
  records.sort((a, b) => (a.title === 'TLS-Tester' ? -1 : b.title === 'TLS-Tester' ? 1 : b.date.localeCompare(a.date) || a.title.localeCompare(b.title)));
  records.forEach((r, i) => r.id = `X-${String(i + 1).padStart(3, '0')}`);
  const categories = [...new Set(records.map(r => r.category))].sort((a, b) => a.localeCompare(b));
  if (!records.length) throw new Error('Add at least one published Markdown entry before building.');
  return { pages, sections, records, categories, assets };
}

export async function buildContent(root = resolve('.'), output = join(root, '.generated')) {
  const content = await collectContent(root);
  const { pages, sections, records, categories, assets } = content;
  const destination = join(output, 'pages');
  await mkdir(output, { recursive: true });
  // This directory contains only generated files. Recreate it to remove deleted posts.
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  async function emit(path, text) {
    const target = resolve(destination, '.' + path);
    if (!target.startsWith(resolve(destination) + '/')) throw new Error(`Unsafe output path: ${path}`);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, text);
  }
  for (const page of pages.filter(p => p.route !== '/')) {
    const tokens = markdown.parse(page.body, {});
    const toc = tokens.flatMap((t, i) => t.type === 'heading_open' && ['h1', 'h2', 'h3'].includes(t.tag) ? [{ id: t.attrGet('id'), title: tokens[i + 1].content, level: t.tag }] : []);
    let html = markdown.renderer.render(tokens, markdown.options, {});
    // Local Markdown links follow a file's permalink, including after a move.
    html = html.replace(/(href|src)="([^"#]+)(#[^"]*)?"/g, (all, attribute, url, hash = '') => {
      if (/^(?:[a-z]+:|\/\/)/i.test(url)) return all;
      let decoded; try { decoded = decodeURIComponent(url); } catch { return all; }
      const source = url.startsWith('/') ? decoded.slice(1) : join(dirname(page.file || ''), decoded);
      const linked = pages.find(p => p.file === source);
      const target = linked ? linked.route : !url.startsWith('/') && (attribute === 'src' || assets.includes(source)) ? '/' + source : url;
      return `${attribute}="${escape(target)}${hash}"`;
    });
    const parent = dirname(page.route);
    const parentPage = pages.find(p => p.route === parent);
    const breadcrumb = `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/?view=list">ARCHIVE</a><span>／</span>${parent !== '/' ? `<a href="${escape(parent)}">${escape(parentPage?.title || humanize(basename(parent)))}</a><span>／</span>` : ''}<span>${escape(page.title)}</span></nav>`;
    const aside = `<aside class="reader-sidebar"><div class="sidebar-label">IN THIS FILE <span>↓</span></div><nav aria-label="Table of contents">${toc.map(h => `<a class="toc-${h.level}" href="#${escape(h.id)}">${escape(h.title)}</a>`).join('') || `<a href="#content">Overview</a>`}</nav><a class="back-archive" href="/?view=list">← ARCHIVE INDEX</a></aside>`;
    const body = masthead(sections, page.route) + `<main class="reader-shell">${breadcrumb}<header class="article-header"><div class="eyebrow">${escape(page.category)} <span>／</span> ${page.children.length ? 'COLLECTION' : 'PUBLIC RECORD'}${page.date ? ' <span>／</span> ' + escape(page.date) : ''}</div><h1 class="project-name">${escape(page.title)}</h1><p class="project-tagline">${page.children.length ? `${page.children.length} entries in this collection. Updated automatically from the archive.` : escape(page.summary)}</p><div class="article-meta"><span>BY TOMAHAWKD</span><span>${page.children.length ? 'DIRECTORY / INDEX' : `${Math.max(1, Math.ceil(page.body.length / 1000))} MIN READ`}</span></div></header><div class="reading-layout">${page.children.length ? '' : aside}<article id="content" class="main-content" tabindex="-1">${page.children.length ? cards(page.children) : html}</article></div><div class="article-end"><span>END OF ${page.children.length ? 'INDEX' : 'FILE'}</span><a href="${escape(parent)}">← ${parent === '/' ? 'Back to archive' : escape(parentPage?.title || 'Back to collection')}</a></div></main>` + footer;
    const outputPath = page.route.endsWith('.html') ? page.route : page.route + '/index.html';
    await emit(outputPath, document(page.title, page.summary, page.route, body, { math: html.includes('katex') }));
  }
  const catalogue = `<div id="catalogue" class="catalogue">${masthead(sections, '/')}<main class="catalogue-shell" id="content"><div class="catalogue-intro"><div><div class="eyebrow">SYNTHESIZE INFORMATION <span>／</span> PERSONAL DATABASE</div><h1>A record of<br>things <em>learned.</em></h1><p>Security research, course notes, code, and the occasional deep dive. Welcome to Tomahawkd's Logger.</p></div><div class="catalogue-stamp"><span>${String(records.length).padStart(2, '0')}</span>FILES IN THE ARCHIVE<a href="/?view=3d">EXPLORE IN 3D ↗</a></div></div><div class="catalogue-toolbar"><h2>ARCHIVE INDEX <span>／ ${String(categories.length).padStart(2, '0')} COLLECTIONS</span></h2><label class="catalogue-search">SEARCH <input type="search" id="catalogue-search" placeholder="Find a note or project…" aria-label="Search the archive"></label></div><div id="catalogue-results">${catalogueCollections(records, categories)}</div><p id="catalogue-empty" hidden role="status">No matching files. Try a different title or keyword.</p></main>${footer}</div><script src="/reader.js" defer></script>`;
  await writeFile(join(output, 'catalogue.html'), catalogue);
  await mkdir(join(root, 'src'), { recursive: true });
  await writeFile(join(root, 'src/site-records.json'), JSON.stringify({ records, categories }, null, 2));
  for (const record of records) await emit(`/archives/${record.id}.txt`, `${record.title}\n${record.category} / ${record.date}\n\n${record.abstract}\n\n${record.findings.join('\n')}\n\n${record.source}\n`);
  for (const asset of assets) {
    await mkdir(join(destination, dirname(asset)), { recursive: true });
    await cp(join(root, asset), join(destination, asset));
  }
  await emit('/404.html', document('File not found', 'This archive entry could not be found.', '/404.html', masthead(sections) + '<main class="reader-shell error-page" id="content"><div class="eyebrow">ERROR / 404</div><h1>File not found.</h1><p>This entry may have moved. Browse the archive to find it.</p><a class="text-button" href="/?view=list">OPEN ARCHIVE INDEX →</a></main>' + footer));
  await emit('/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', ...pages.filter(p => p.route !== '/').map(p => p.route)].map(route => `<url><loc>https://github.tomahawkd.online${escape(route)}</loc></url>`).join('')}</urlset>`);
  await emit('/robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://github.tomahawkd.online/sitemap.xml\n');
  await emit('/.nojekyll', '');
  console.log(`Archive: ${records.length} records, ${categories.length} categories, ${pages.filter(p => p.route !== "/").length} pages.`);
  return content;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await buildContent();
