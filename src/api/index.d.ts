declare namespace APIParams {
  interface SearchParams {
    keywords: string
    limit?: number
    offset?: number
    type?: 1 | 10 | 100 | 1000 | 1002 | 1004 | 1006 | 1009 | 1014 | 1018 | 2000
  }

  interface FetchBannerParam {
    type?: 0 | 1 | 2 | 3
  }

  interface FetchHotAlbumListParam {
    cat?: string
    limit?: number
    before?: number
  }

  interface FetchUrlParam {
    id: number
    level?:
      | 'standard'
      | 'higher'
      | 'exhigh'
      | 'lossless'
      | 'Hi-Res'
      | 'jyeffect'
      | 'sky'
      | 'jymaster'
  }
}

declare namespace APIResponse {}
