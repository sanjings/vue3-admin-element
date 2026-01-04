/**
 * 操作类型
 */
export enum OperationType {
  /**
   * 新增
   */
  ADD = 'ADD',
  /**
   * 编辑
   */
  EDIT = 'EDIT',
  /**
   * 删除
   */
  DELETE = 'DELETE',
  /**
   * 复制
   */
  COPY = 'COPY',
  /**
   * 详情
   */
  DETAIL = 'DETAIL',
  /**
   * 审核
   */
  AUDIT = 'AUDIT'
}

/**
 * 文件类型
 */
export enum FileType {
  /**
   * 图片
   */
  IMAGE = 1,
  /**
   * 视频
   */
  VIDEO = 2,
  /**
   * 其他文件
   */
  FILE = 3
}
