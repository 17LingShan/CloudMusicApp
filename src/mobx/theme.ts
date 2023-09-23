import { makeAutoObservable } from 'mobx'
import { storage } from '@/storage'

export class Theme {
  theme = storage.getString('theme') || 'light'
  primary = '#e92645'
  surface = '#f2f2f2'
  // surface = '#483332'
  onSurface = '#80766e'
  // onSurface = '#bdaead'
  onPrimary = '#c70c0c'
  background = '#3e3b3c'
  shadow = '#202020'
  focus = '#c6c6d0'
  backdrop = '#cfccc9'
  detailSurface = '#f2f2f2'
  detailOnSurface = '#80766e'
  detailBackground = '#3e3b3c'

  constructor() {
    makeAutoObservable(this)
    this.onChangedTheme()
  }

  changeTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    storage.setString('theme', this.theme)
    this.onChangedTheme()
  }

  onChangedTheme() {
    this.theme === 'light' ? this.setLight() : this.setDark()
  }

  setLight() {
    this.surface = '#483332'
    this.onSurface = '#80766e'
    this.backdrop = '#363433'
  }

  setDark() {
    this.surface = '#f2f2f2'
    this.onSurface = '#bdaead'
    this.backdrop = '#cfccc9'
  }
}

const ThemeStore = new Theme()
export default ThemeStore
