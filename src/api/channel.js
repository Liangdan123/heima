import request from '@/untils/request'
import store from '@/store'
import storage from '@/untils/storage'
//获取用户的频道
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
//获取所有频道列表
export const getChannels = () => {
  return request({
    url: 'v1_0/channels'
  })
}
//删除指定用户频道
export const delChannels = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

//设置用户的频道（部分覆盖）
//seq添加索引值
//id频道ID
export const userChannels = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
//读取
const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'
export const setMyChannelToLocal = (myChannel) => {
  return storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannel)
}
export const getMyChannelByLocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
