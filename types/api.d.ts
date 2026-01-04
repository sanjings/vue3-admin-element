import type { UploadFile } from 'element-plus';

/**
 * 服务端数据返回统一格式
 */
export interface ApiResponseData<T = any> {
  /**
   * 状态码 200成功
   */
  code: number;
  /**
   * 返回数据
   */
  data: T;
  /**
   * 提示信息
   */
  message: string;
}

/**
 * 分页查询参数
 */
export type PageQueryParam<T = Recordable> = {
  /**
   * 当前页码
   */
  pageNum?: number;
  /**
   * 每页查询条数
   */
  pageSize: number;
} & T;

/**
 * 分页查询列表数据
 */
export interface PageListResponse<T = Recordable | number | string> {
  /**
   * 当前列表数据
   */
  list: Array<T>;
  /**
   * 总条数
   */
  count: number;
  /**
   * 总页数
   */
  totalPage?: number;
}

export interface UploadFileResponse {
  ossUrl?: string;
}

export type UploadSuccessFiles = (UploadFile & UploadFileResponse)[];
