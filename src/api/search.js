import request from '@/untils/request'

export const getSearchSuggestionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
