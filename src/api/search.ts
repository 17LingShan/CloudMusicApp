import { request } from '@/util/request'

const api = {
  search: '/cloudsearch',
  hotKeywords: '/search/hot',
  songUrl: '/song/url/v1',
  albumAllTrack: '/playlist/track/all'
}

export function search(params: APIParams.SearchParams) {
  return request({
    url: api.search,
    method: 'get',
    params: params
  })
}

export function fetchUrlById(params: APIParams.FetchUrlParam) {
  return request({
    url: api.songUrl,
    method: 'get',
    params: {
      id: params.id,
      level: params.level ?? 'standard'
    }
  })
}

export function fetchAlbumAllTrack(params: APIParams.FetchAlbumAllTrackParam) {
  return request({
    url: api.albumAllTrack,
    method: 'get',
    params: params
  })
}
