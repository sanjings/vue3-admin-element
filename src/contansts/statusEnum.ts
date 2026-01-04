/**
 * 状态枚举
 */
export enum StatusEnum {
  /**
   * 启用
   */
  ENABLE = 1,
  /**
   * 禁用
   */
  DISABLE = 0
}

export enum StatusEnumLabel {
  /**
   * 启用
   */
  ENABLE = '启用',
  /**
   * 禁用
   */
  DISABLE = '禁用'
}

/**
 * 审核状态
 */
export enum AuditStatusEnum {
  /**
   * 待审核
   */
  PEDDING = 1,
  /**
   * 审核通过
   */
  AGREED = 2,
  /**
   * 审核拒绝
   */
  REJECTED = 3,
  /**
   * 已撤销
   */
  CANCELLED = 4
}
