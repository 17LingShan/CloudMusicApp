import { request } from '@/util/request'

const api = {
  banner: '/banner',
  hotAlbumList: '/top/playlist/highquality'
}

export function fetchBanner(params: APIParams.FetchBannerParam) {
  return request({
    url: api.banner,
    method: 'get',
    params: {
      type: params?.type ?? 2
    }
  })
}

export function fetchHotAlbumList(params: APIParams.FetchHotAlbumListParam) {
  return request({
    url: api.hotAlbumList,
    method: 'get',
    params: {
      ...params,
      limit: params.limit ?? 10
    }
  })
}
