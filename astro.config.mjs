import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dev.apiscusco.com',
  output: 'static',
  build: {
    format: 'directory'
  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    sitemap({
      filter: (page) => !page.includes('/404')
    })
  ]
});

