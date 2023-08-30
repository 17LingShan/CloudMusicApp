declare namespace ToastCustom {
  interface ToastBaseParams {
    message: string
  }
  interface ToastErrParams extends ToastBaseParams {
    code?: number
  }

  interface ToastCommonParams extends ToastBaseParams {
    duration?: 'short' | 'long'
    gravity?: 'top' | 'bottom' | 'center'
  }
}
