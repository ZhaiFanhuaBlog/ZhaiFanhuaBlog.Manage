import type { ProxyOptions } from 'vite';
// 第一项被代理的路径，第二项代理至的路径
type ProxyItem = [string, string];
// 方法接收的参数
type ProxyList = ProxyItem[];
// Vite代理所接收对象类型
type ProxyTargetList = Record<string, string | ProxyOptions>;
// https类型的URL的匹配正则
const httpsReg = /^https:\/\//;

/**
 * 生成Vite代理配置的方法
 * @param list
 */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsReg.test(target);
    ret[prefix] = {
      // 代理至的路径
      target: target,
      // 将主机标头的来源更改为目标URL，默认值false
      changeOrigin: true,
      // 如果您想代理websocket
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
