import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    server: {
      port: 8080,
      open: true,
      host: '0.0.0.0',
      fs: {
        strict: true,
      },
      proxy: {
        '/dev': {
          target: 'http://172.16.16.9:32200', // 小魏哥的服务器
          // target: 'https://business.api.xkrsecure.com', // 测试服务器
          // target: 'http://172.16.16.16:32200', // 邓哥服务器
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, ''),
          pathRewrite: { '^/dev': '' },
        },
        '/uaa': {
          target: 'http://172.16.16.9:10000',
          // target: 'https://business.api.xkrsecure.com/wflowApi', // 测试服务器

          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/uaa/, ''),
          pathRewrite: { '^/uaa': '' },
        },
        '/admin-api': {
          target: 'http://172.16.16.9:32107',
          // target: 'https://business.api.xkrsecure.com', // 测试服务器
          changeOrigin: true,
        },
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true,
      },
    },
  },
  baseConfig
);
