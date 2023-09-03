import { networkConfig } from '@/config/network'
import { storage } from '@/storage'
import axios, { AxiosRequestConfig } from 'axios'

export function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    baseURL: networkConfig.baseURL,
    timeout: networkConfig.timeout
  })

  instance.interceptors.request.use(beforeReq, errReq)
  instance.interceptors.response.use(beforeRes, errRes)

  return instance(config)
}

function beforeReq(config: any) {
  config.params = {
    ...config.params,
    timestamp: new Date().getTime(),
    realIP: '116.25.146.137',
    cookie: encodeURIComponent(storage.getString('cookie'))
  }
  console.log('beforeReq')

  return config
}

function errReq(err: any) {
  console.log('errReq')
  return Promise.reject(err)
}

function beforeRes(res: any) {
  console.log('beforeRes')
  return res
}

function errRes(err: any) {
  console.log('errRes')
  return Promise.reject(err)
}
