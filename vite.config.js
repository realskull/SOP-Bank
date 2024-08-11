import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Add any additional build options here
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
});
