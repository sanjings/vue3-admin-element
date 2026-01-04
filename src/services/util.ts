import axios from 'axios';
import { useUserStore } from '@/store/user';
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import type { ApiResponseData } from 'types/api';

/**
 * axios实例
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/',
  timeout: 30 * 1000,
  withCredentials: true
});

const cancelToken = axios.CancelToken;
let source = cancelToken.source();

/**
 * 请求拦截器
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    config.headers['Access-Token'] = userStore.token;
    config.cancelToken = source.token;
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 统一的错误处理
 */
const handleError = (error: any) => {
  if (axios.isCancel(error)) return new Promise(() => {});

  const errorMessage = error?.response?.data?.message || '当前网络异常，请稍后重试';
  ElMessage.error(errorMessage);
  return Promise.reject(error);
};

/**
 * 响应拦截处理
 */
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  const { data, config, headers } = response;

  // 处理文件下载响应
  if (config.responseType === 'blob' || config.responseType === 'arraybuffer') {
    const disposition = headers['content-disposition'];
    if (disposition) {
      return {
        data,
        fileName: decodeURI(disposition.substring(disposition.indexOf('filename=') + 9))
      };
    }
    return data;
  }

  // 处理普通响应
  const responseData = data || {};
  responseData.code = Number(responseData.code);

  if (responseData.code === 403) {
    // 取消后续所有请求
    source.cancel('登录已过期');
    ElMessage.error('登录已过期，请重新登录');
    useUserStore().logout(window.location.hash.replace('#', ''));
    // 恢复请求
    source = cancelToken.source();
    return Promise.reject(responseData);
  }
  return responseData;
}, handleError);

const requestGet = <T = any>(url: string, params?: Recordable): Promise<ApiResponseData<T>> =>
  axiosInstance.get(url, { params });

const requestPost = <T = any>(
  url: string,
  params?: Recordable,
  config?: AxiosRequestConfig
): Promise<ApiResponseData<T>> => axiosInstance.post(url, params, config);

const requestPut = <T = any>(
  url: string,
  params?: Recordable,
  config?: AxiosRequestConfig
): Promise<ApiResponseData<T>> => axiosInstance.put(url, params, config);

interface DownloadResponse extends AxiosResponse {
  fileName?: string;
}

/**
 * 下载文件
 * @param url 文件url
 * @param params 入参
 * @param method 请求方法
 * @param fileType 文件类型
 */
const requestDownFile = async (
  url: string,
  params: Record<string, any>,
  method: 'GET' | 'POST' = 'POST',
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
) => {
  try {
    const response = (await axiosInstance({
      method,
      url,
      [method === 'POST' ? 'data' : 'params']: params,
      responseType: 'blob',
      timeout: 60 * 1000
    })) as DownloadResponse;

    const { data, fileName } = response;

    if (!(data instanceof Blob)) {
      throw new Error('下载出现异常,请联系开发人员！');
    }

    const blob = new Blob([data], { type: `${fileType};charset=utf-8` });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName || 'download';
    link.click();
    window.URL.revokeObjectURL(link.href);
    link.remove();

    return data;
  } catch (error) {
    handleError(error);
  }
};

export { requestGet, requestPost, requestPut, requestDownFile };

export default axiosInstance;
