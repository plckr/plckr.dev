import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config = defineConfig({
  plugins: [
    devtools({
      enhancedLogs: { enabled: true }
    }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json']
    }),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart({
      router: {
        quoteStyle: 'single',
        semicolons: true
      },
      pages: [
        {
          path: '/rss.xml',
          prerender: { enabled: true }
        },
        {
          path: '/atom.xml',
          prerender: { enabled: true }
        },
        {
          path: '/feed.json',
          prerender: { enabled: true }
        }
      ]
    }),
    viteReact()
  ],
  optimizeDeps: {
    include: ['@mdx-js/react', '@mdx-js/mdx']
  },
  ssr: {
    noExternal: ['@mdx-js/mdx']
  }
});

export default config;
