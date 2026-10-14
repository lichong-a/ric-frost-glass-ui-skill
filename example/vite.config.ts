import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { adaptUpstream } from './scripts/adapt-upstream.mjs';
import { adaptUpstreamTypes } from './scripts/adapt-upstream-types.mjs';

let publicBase = '/';

export default defineConfig({
  plugins: [
    { name:'ric-frost-glass-ui-skill-upstream-integration', enforce:'pre',
      configResolved(config) { publicBase = config.base; },
      transform(code,id) {
        const typed = adaptUpstreamTypes(code,id);
        return adaptUpstream(typed,id,{ base: publicBase }) ?? (typed === code ? null : typed);
      },
    },
    react(),
  ],
  build: {
    target:'es2022',
    rollupOptions: { input: {
      index:fileURLToPath(new URL('./index.html',import.meta.url)),
      preview:fileURLToPath(new URL('./preview.html',import.meta.url)),
    } },
    manifest:true,
  },
});
