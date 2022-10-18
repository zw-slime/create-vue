import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import {createHtmlPlugin} from 'vite-plugin-html';

import {execSync} from "child_process";

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        createHtmlPlugin({
            minify: true,
            template: './index.html',
            inject: {
                data: {
                    VITE_APP_VERSION: getGitVersion(),
                    VITE_APP_TAG: getGitTag(),
                }
            },
        }),
        // element 按需自动导入
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        modules: {
            // 加上这个配置后，就可以在 scss 文件中使用蛇形类名，在 ts 文件中使用驼峰类型，会自动转换对应上
            localsConvention: 'camelCaseOnly',
        },
    },
    server: {
        port: 3000,
        host: '0.0.0.0',
        open: true,
        proxy: {
            '/api': {
                target: 'http://xx.xx.xx',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})


function getGitTag() {
    try {
        const t = execSync('git describe --tags --exact-match');
        return t.toString().trim();
    } catch (e) {
        return '';
    }
}

function getGitVersion() {
    try {
        const t = execSync('git rev-parse --short=7 HEAD');
        return t.toString().trim();
    } catch (e) {
        return '';
    }
}
