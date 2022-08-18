export interface ViteEnv {
  VITE_PORT: number;
  VITE_USE_MOCK: boolean;
  VITE_USE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_USE_CDN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  VITE_LEGACY: boolean;
  VITE_USE_IMAGEMIN: boolean;
}

/**
 * 是否开发环境
 * @param mode
 * @returns
 */
export function isDev(mode: string): boolean {
  return mode === 'development';
}

/**
 * 是否生产环境
 * @param mode
 * @returns
 */
export function isPro(mode: string): boolean {
  return mode === 'production';
}

/**
 * 是否生成包预览
 * @returns
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

/**
 * 读取所有配置文件的环境变量到 process.env
 * @param envConf
 * @returns
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
        realName = '';
      }
    }
    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}
