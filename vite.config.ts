import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
    server: {
        host: '0.0.0.0',           // Allow Docker container access
        port: 5173,
        strictPort: true,         // Don't auto-increment port
        hmr: {
            host: 'host.docker.internal',  // Make HMR work inside Docker
            port: 5173,
            protocol: 'ws',
        },
    },
    plugins: [laravel({
        input: ['resources/css/app.css', 'resources/js/app.tsx'],
        ssr: 'resources/js/ssr.tsx',
        refresh: true,
    }), react(), tailwindcss(), flowbiteReact()],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});