import { makeAutoObservable } from 'mobx'
import { SongType } from '@/mobx/types'

class Searcher {
  keywords = ''
  searchType: APIParams.SearchType = 1
  searchList: SongType.SongList = []
  isInputFocus = false

  constructor() {
    makeAutoObservable(this)
  }

  setKeywords(keywords: string) {
    this.keywords = keywords
  }

  setSearchType(type: APIParams.SearchType) {
    this.searchType = type
  }

  setSearchList(searchList: SongType.SongList) {
    this.searchList = searchList
  }

  setIsInputFocus(focus: boolean) {
    console.log('focus')
    this.isInputFocus = focus
  }
}

const SearchStore = new Searcher()
export default SearchStore
