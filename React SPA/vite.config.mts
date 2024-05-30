import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// This is happening outside of the VITE import.meta.env
//  as we can't ensure the load order at this point
// Load environment variables from .env file
dotenv.config();

const port = process.env.VITE_PORT || 3000;

export default defineConfig(() => {
    return {
        server: {
            port: Number(port),
        },
        build: {
            outDir: 'build',
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom'],
                    },
                },
            },
        },
        plugins: [react()],
    };
});
