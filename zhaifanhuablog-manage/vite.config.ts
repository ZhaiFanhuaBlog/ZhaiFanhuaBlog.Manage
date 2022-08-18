import { defineConfig, ConfigEnv, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant';
import { createProxy } from './build/vite/proxy';

// Vite配置
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  const root = process.cwd();
  const env = loadEnv(mode, root);
  // 获取环境
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === 'build';
  return {
    resolve: {
      alias: {
        '/@': resolve(__dirname, 'src'),
      },
      // 使用路径别名时想要省略的后缀名，可以自己增减
      extensions: ['.js', '.json', '.ts', '.vue'],
    },
    build: {
      outDir: OUTPUT_DIR,
    },
    // 其他配置
    plugins: [
      vue({
        reactivityTransform: true,
      }),
      AutoImport({
        resolvers: [],
        // 自定引入 Vue VueRouter API,如果还需要其他的可以自行引入
        imports: [
          'vue',
          'vue-router',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
        // 调整自动引入的文件位置
        dts: 'src/types/auto-import.d.ts',
        // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
        eslintrc: {
          enabled: true,
          // 配置文件的位置
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [
          // 需要自动导入的组件
          NaiveUiResolver(),
        ],
        dts: 'src/types/components.d.ts',
      }),
    ],
    // 服务器配置
    server: {
      // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。也可以通过 CLI 使用 --host 0.0.0.0 或 --host 来设置
      host: true,
      // 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口
      port: VITE_PORT,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: true,
      // 为开发服务器配置自定义代理规则。从.env加载代理配置
      proxy: createProxy(VITE_PROXY),
    },
  };
});
