import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config = defineConfig({
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json']
    }),
    tailwindcss(),
    tanstackStart(),
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
