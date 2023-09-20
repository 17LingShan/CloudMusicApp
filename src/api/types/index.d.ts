declare namespace APIParams {
  type SearchType =
    | 1
    | 10
    | 100
    | 1000
    | 1002
    | 1004
    | 1006
    | 1009
    | 1014
    | 1018
    | 2000

  interface SearchParams {
    keywords: string
    limit?: number
    offset?: number
    type?: SearchType
  }

  interface SearchSuggestParam {
    keywords: string
    type?: 'mobile'
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

  interface FetchLyricParam {
    id: number
  }
  interface FetchAlbumAllTrackParam {
    id: number
    limit?: number
    offset?: number
  }

  interface FetchAlbumDetailParam {
    id: number
    s?: number
  }

  interface PhoneLoginParam {
    phone: number
    password?: string
    countrycode?: number
    md5_password?: string
    captcha?: number
  }

  interface CaptchaParam {
    phone: string
    ctcode: number
  }

  interface VerifyCaptchaParam {
    phone: string
    captcha: string
  }

  interface EmailLoginParam {
    email: string
    password: string
    md5_password?: string
  }

  interface QRImageParams {
    key: string
    qrimg?: boolean
  }

  interface QRStateParams {
    key: string
    noCookie?: boolean
  }

  interface UidParams {
    uid: number
  }
}

declare namespace APIResponse {}
