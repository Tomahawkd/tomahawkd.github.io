import { defineConfig } from 'vite';
import { cp, mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildContent } from './scripts/content.mjs';
import { buildBackgroundGeometry } from './scripts/background-geometry.mjs';

export default defineConfig({
  appType: 'mpa',
  server: { strictPort: true, watch: { usePolling: true, interval: 500, ignored: ['**/.generated/**'] } },
  optimizeDeps: { entries: ['index.html'] },
  plugins: [{
    name: 'personal-archive-content',
    async buildStart() { await Promise.all([buildContent(), buildBackgroundGeometry()]); },
    async transformIndexHtml(html) {
      return html.replace('<!-- SITE_CATALOGUE -->', await readFile('.generated/catalogue.html', 'utf8'));
    },
    configureServer(server) {
      server.watcher.add(['*.md', 'blogs/**', 'course/**', 'security/**']);
      let rebuild = Promise.resolve();
      const refresh = (file) => {
        if (/\.(md|png|jpe?g|gif|svg|webp|avif|pdf|txt)$/i.test(file) && !/\/(node_modules|\.generated|src|public|dist)\//.test(file)) {
          rebuild = rebuild.then(() => buildContent()).then(() => server.ws.send({ type: 'full-reload' })).catch(error => server.config.logger.error(String(error)));
        }
      };
      server.watcher.on('change', refresh).on('add', refresh).on('unlink', refresh);
      server.middlewares.use(async (req, res, next) => {
        let pathname;
        try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
        catch { return next(); }
        const root = pathname.startsWith('/static/') ? resolve('.') : pathname.startsWith('/katex/') ? resolve('node_modules') : resolve('.generated/pages');
        const requestPath = pathname.startsWith('/katex/') ? pathname.replace('/katex/', '/katex/dist/') : pathname;
        const file = resolve(root, '.' + (requestPath.endsWith('/') ? requestPath + 'index.html' : requestPath));
        if (!file.startsWith(root + '/')) return next();
        for (const candidate of [file, file + '/index.html']) {
          try {
            const data = await readFile(candidate);
            const ext = candidate.split('.').pop();
            res.setHeader('Content-Type', ({ html: 'text/html; charset=utf-8', css: 'text/css', woff2: 'font/woff2', woff: 'font/woff', png: 'image/png', jpg: 'image/jpeg', gif: 'image/gif', svg: 'image/svg+xml', txt: 'text/plain; charset=utf-8', xml: 'application/xml' })[ext] || 'application/octet-stream');
            res.end(data);
            return;
          } catch (error) { if (!['ENOENT', 'EISDIR', 'ENOTDIR'].includes(error.code)) return next(error); }
        }
        next();
      });
    },
    async closeBundle() {
      await mkdir('dist', { recursive: true });
      await cp('.generated/pages', 'dist', { recursive: true });
      await cp('static', 'dist/static', { recursive: true });
      await cp('node_modules/katex/dist', 'dist/katex', { recursive: true });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname !== '/' && !url.pathname.split('/').at(-1).includes('.')) req.url = url.pathname.replace(/\/$/, '') + '/index.html' + url.search;
        next();
      });
    },
  }],
});
