import request from '@/untils/request'
//axios做了封装，post请求自动加上Content-Type application/json
//params查询参数传参："baseUrl+//v1_0/authorizations?name=张三"
//data请求体中携带

/**
 *
 * @param {String} mobile
 * @param {String} code
 * @returns
 */
//登录
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
//发送验证码
export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
