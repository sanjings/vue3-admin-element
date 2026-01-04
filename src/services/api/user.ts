import { requestPost } from '../util';

export interface RequestLoginResponse {
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 用户名
   */
  username?: string;
  /**
   * token
   */
  token?: string;
  /**
   * 是否重置过密码
   */
  isResetPassword?: number;
}

export const requestLogin = async (params: { phone: string; password: string }) => {
  // return requestPost<RequestLoginResponse>('/login', params);
  return await {
    code: 200,
    data: {
      phone: params.phone,
      username: '三井寿',
      token: 'A432234432FDSFDSFSD4231321',
      isResetPassword: true
    }
  };
};

export const requestLogout = () => requestPost('/logout');

export const requestPasswordSet = (params: {
  phone: string;
  newPassword: string;
  /**
   * 短信验证码
   */
  smsCode: string;
}) => requestPost('/password/set', params);

export const requestPasswordSendSms = (params: { phone: string }) => requestPost('/password/sendSms', params);
