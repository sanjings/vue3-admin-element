/**
 * @file 环境判断方法
 */

const { host } = window?.location;

/**
 * 是否本地开发
 */
export const inLocal = /localhost|192.168|127.0.0.1/.test(host);

/**
 * 是否研发环境
 */
export const inDev = /dev-/.test(host);

/**
 * 是否测试环境
 */
export const inTest = /test-/.test(host);

/**
 * 是否正式环境
 */
export const inProd = host === 'prod.com';

/**
 * 是否在服务端环境
 */
export const inServer = typeof window === 'undefined';

/**
 * 是否在客户端环境
 */
export const inClient = !inServer;
