import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { renderHtml } from './src/render.ts';

const page = (p: string) => resolve(import.meta.dirname, p);

export default defineConfig({
  plugins: [{ name: 'render-projects', transformIndexHtml: renderHtml }],
  build: {
    chunkSizeWarningLimit: 600, // ponytail: three.js (lazy, setelah load) memang ~540 KB.
    rollupOptions: {
      input: {
        home: page('index.html'),
        programming: page('programming/index.html'),
        uiux: page('uiux/index.html'),
        video: page('video/index.html'),
      },
    },
  },
});


