import { request } from '@/util/request'

const api = {
  search: '/cloudsearch',
  hotKeywords: '/search/hot'
}

export function search(params: API.SearchParams) {
  return request({
    url: api.search,
    method: 'get',
    params: params
  })
}
