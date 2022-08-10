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
//收藏文章
export const articleCollections = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: { target }
  })
}
//取消收藏文章
export const articleCollectionsDel = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`,
    data: { target }
  })
}
//对文章点赞
export const articleLikings = (data) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data
  })
}
//取消对文章点赞
export const articleLikingsDele = (target) => {
  return request({
    url: `v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
//获取评论或评论回复
export const commentsList = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}
//对文章或者评论进行评论
export const commentsPost = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
//对文章或者评论进行评论
export const commentsPulisher = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
