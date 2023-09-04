import { makeAutoObservable } from 'mobx'
import { storage } from '@/storage'
import { UserType } from './types'

export class User {
  cookie = storage.getString('cookie') || ''
  userId = 0
  nickname = ''
  avatarUrl = ''
  backgroundUrl = ''

  constructor() {
    makeAutoObservable(this)
  }

  setAccountInfo(accountInfo: UserType.UserProps) {
    this.userId = accountInfo.userId
    this.nickname = accountInfo.nickname
    this.avatarUrl = accountInfo.avatarUrl
    this.backgroundUrl = accountInfo.backgroundUrl
  }

  setUserId(id: number) {
    this.userId = id
  }

  setNickname(nickname: string) {
    this.nickname = nickname
  }

  setAvatarUrl(avatarUrl: string) {
    this.avatarUrl = avatarUrl
  }

  setCookie(cookie: string) {
    storage.setString('cookie', cookie)
    this.cookie = cookie
  }
}

const UserStore = new User()
export default UserStore
