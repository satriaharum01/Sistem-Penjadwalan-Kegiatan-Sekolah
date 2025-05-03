import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/main.jsx'], // Bisa ganti ke app.jsx kalau itu root
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'resources/js'),
            },
            {
                find: '@helpers',
                replacement: path.resolve(__dirname, 'resources/js/utils/helpers'),
            },
            {
                find: '@hooks',
                replacement: path.resolve(__dirname, 'resources/js/utils/hooks'),
            },
            {
                find: '@hocs',
                replacement: path.resolve(__dirname, 'resources/js/utils/hocs'),
            },
        ],
    },
});
