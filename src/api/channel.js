import request from '@/untils/request'
import store from '@/store'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
