import { makeAutoObservable } from 'mobx'
import { AlbumType, SongType } from '@/mobx/types'

class Searcher {
  keywords = ''
  searchList: SongType.SongList = []

  constructor() {
    makeAutoObservable(this)
  }

  setKeywords(keywords: string) {
    this.keywords = keywords
  }

  setSearchList(searchList: SongType.SongList) {
    this.searchList = searchList
  }
}

const searchStore = new Searcher()
export default searchStore
