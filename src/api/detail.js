import request from '@/untils/request'

//获取新闻详情
export const searchDetail = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}

//关注用户
export const userFollowings = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: { target }
  })
}
//取消关注用户
export const deleteUserFollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
