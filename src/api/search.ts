import { request } from '@/util/request'

const api = {
  search: '/cloudsearch',
  hotKeywords: '/search/hot',
  songUrl: '/song/url/v1',
  albumAllTrack: '/playlist/track/all',
  albumDetail: '/playlist/detail',
  lyric: '/lyric'
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

export function fetchLyric(params: APIParams.FetchLyricParam) {
  return request({
    url: api.lyric,
    method: 'get',
    params: params
  })
}

export function fetchAlbumAllTrack(params: APIParams.FetchAlbumAllTrackParam) {
  return request({
    url: api.albumAllTrack,
    method: 'get',
    params: params
  })
}

export function fetchAlbumDetail(params: APIParams.FetchAlbumDetailParam) {
  return request({
    url: api.albumDetail,
    method: 'get',
    params: params
  })
}
