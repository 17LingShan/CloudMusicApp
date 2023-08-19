import { request } from '@/util/request'

const api = {
  search: '/cloudsearch',
  hotKeywords: '/search/hot',
  songUrl: '/song/url/v1'
}

export function search(params: APIParams.SearchParams) {
  return request({
    url: api.search,
    method: 'get',
    params: params
  })
}

export function fetchUrlById(params: APIParams.FetchUrl) {
  return request({
    url: api.songUrl,
    method: 'get',
    params: {
      id: params.id,
      level: params.level ?? 'standard'
    }
  })
}
