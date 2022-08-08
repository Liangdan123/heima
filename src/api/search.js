import request from '@/untils/request'
//获取联想建议（自动补全）
export const getSearchSuggestionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
//获取搜索结果
export const getSearchResult = (params) => {
  return request({
    url: '/v1_0/search',
    params
  })
}
