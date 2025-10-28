// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//   },
//   build: {
//     outDir: 'dist',
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/inscricoesppgti/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    port: 80,
  },
});
