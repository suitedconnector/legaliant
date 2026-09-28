import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // vite-react-ssg: `npm run build` (vite-react-ssg build) runs the client
  // build, the SSR build, then writes one HTML file per static route.
  ssgOptions: {
    entry: 'src/main.jsx', // default is src/main.ts
    // /ssdi/foo -> dist/ssdi/foo.html, served at /ssdi/foo by vercel.json cleanUrls.
    // (nested dirs only match with a trailing slash; without one, the SPA
    // rewrite served the root shell and hydration failed.)
    dirStyle: 'flat',
    script: 'async',
  },
})
