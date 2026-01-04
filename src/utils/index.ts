/**
 * 阻塞同步代码
 * @param {number} ms 延迟的毫秒数
 * @throws {Error} 当传入的参数不是正数时抛出错误
 */
export const sleep = (ms: number): Promise<void> => {
  if (ms <= 0 || !Number.isFinite(ms)) {
    throw new Error("延迟时间必须是一个正数");
  }
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * 获取文件名后缀
 * @param {string} fileName 文件名
 * @returns {string} 文件后缀（包含点号），如果没有后缀或文件名无效则返回空字符串
 */
export const getFileNameSuffix = (fileName: string): string => {
  if (!fileName || typeof fileName !== "string") return "";
  const lastDotIndex = fileName.lastIndexOf(".");
  return lastDotIndex === -1 ? "" : fileName.slice(lastDotIndex);
};
