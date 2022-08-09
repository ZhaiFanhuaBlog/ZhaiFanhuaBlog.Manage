import { defineConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
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
  };
});
