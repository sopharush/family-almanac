import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Netlify exposes the site's primary URL as `URL` during builds; use it so
// Open Graph / Twitter tags carry absolute links to the real deployed address.
const siteUrl = (process.env.URL || 'https://family-almanac.netlify.app').replace(/\/$/, '');

const injectSiteUrl = (): Plugin => ({
  name: 'inject-site-url',
  transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', siteUrl) },
});

export default defineConfig({
  plugins: [react(), injectSiteUrl()],
  build: { target: 'es2020', chunkSizeWarningLimit: 900 },
});
