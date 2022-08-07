import request from '@/untils/request'

export const userSelf = () => {
  return request({
    url: '/v1_0/user'
  })
}
