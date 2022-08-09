import { defineConfig, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "/@": resolve(__dirname, "src"),
      },
      // 使用路径别名时想要省略的后缀名，可以自己增减
      extensions: [".js", ".json", ".ts", ".vue"],
    },

    /* more config */
    plugins: [vue()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
