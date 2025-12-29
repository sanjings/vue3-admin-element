import {
  type ConfigEnv,
  type UserConfigExport,
  defineConfig,
  loadEnv,
} from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "node:path";
import {
  name,
  version,
  engines,
  dependencies,
  devDependencies,
} from "./package.json";

const pathResolve = (dir: string) => resolve(__dirname, dir);

// https://vite.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(mode, process.cwd()) as ImportMetaEnv;
  const { VITE_PUBLIC_PATH, VITE_HTTP_BASE_URL } = viteEnv;

  return defineConfig({
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": pathResolve("src"),
        types: pathResolve("./types"),
      },
    },
    server: {
      host: "0.0.0.0", // 设置 host
      port: 5173, // 端口号
      hmr: true, // 热更新
      open: false, // 是否自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: false, // 端口被占用时，是否直接退出
      proxy: {
        [VITE_HTTP_BASE_URL]: {
          target: "http://localhost:5173",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/${VITE_HTTP_BASE_URL}/, ""),
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    build: {
      outDir: "dist",
      assetsDir: "static", // 打包后静态资源目录
      chunkSizeWarningLimit: 1024, // 单个 chunk 文件的大小超过 1024KB 时发出警告
      assetsInlineLimit: 4096, // 小于4kb base64转码
      reportCompressedSize: false, // 禁用 gzip 压缩大小报告
      sourcemap: false, // 构建后是否生成 source map 文件
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"],
          },
        },
      },
    },
    define: {
      __APP_INFO__: {
        name,
        version,
        engines,
        dependencies,
        devDependencies,
        buildTime: Date.now(),
      },
    },
  });
};
