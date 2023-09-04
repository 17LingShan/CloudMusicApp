import { request } from '@/util/request'

const api = {
  // cellphoneLogin: '/login/cellphone',
  // captchaVerify: '/captcha/verify',
  // captcha: '/captcha/sent',
  generateQRKey: '/login/qr/key',
  generateQRImage: '/login/qr/create',
  QRState: '/login/qr/check',
  userAccount: '/user/account',
  likeAlbum: '/user/playlist'
}

// export function phoneLogin(data: APIParams.PhoneLoginParam) {
//   return request({
//     url: api.cellphoneLogin,
//     method: 'get',
//     params: data
//   })
// }

// export function VerifyCaptcha(params: APIParams.VerifyCaptchaParam) {
//   return request({
//     url: api.captchaVerify,
//     method: 'get',
//     params: params
//   })
// }

// export function fetchCaptcha(params: Pick<APIParams.PhoneLoginParam, 'phone'>) {
//   return request({
//     url: api.captcha,
//     method: 'get',
//     params: params
//   })
// }

export function fetchQRKey() {
  return request({
    url: api.generateQRKey,
    method: 'get'
  })
}

export function fetchQRImage(params: APIParams.QRImageParams) {
  return request({
    url: api.generateQRImage,
    method: 'get',
    params: {
      ...params,
      qrimg: params.qrimg ?? true
    }
  })
}

export function checkQRState(params: APIParams.QRStateParams) {
  return request({
    url: api.QRState,
    method: 'get',
    params: params
  })
}

export function fetchAccountInfo() {
  return request({
    url: api.userAccount,
    method: 'get'
  })
}

export function fetchLikeAlbums(params: APIParams.UidParams) {
  return request({
    url: api.likeAlbum,
    method: 'get',
    params: params
  })
}
