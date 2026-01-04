import dayjs from 'dayjs';

/**
 * 格式化日期时间
 * @param date 日期时间
 * @param format 转化格式 默认 YYYY-MM-DD
 * @returns 格式化后的日期时间字符串
 */
export const formatDate = (date?: string | number | Date, format = 'YYYY-MM-DD'): string => {
  if (!date) return '';
  if (typeof date === 'string') {
    if (date.includes('年') && date.includes('月') && date.includes('日'))
      return dayjs(date, 'YYYY年MM月DD日').format(format);
    if (date.includes('年') && date.includes('月')) return dayjs(date, 'YYYY年MM月').format(format);
  }
  return dayjs(date).format(format);
};
