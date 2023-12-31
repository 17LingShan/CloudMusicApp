import { makeAutoObservable, toJS } from 'mobx'
import { SongType } from '@/mobx/types'
import { storage } from '@/storage'

export const initTrackInfo: SongType.SongProps = {
  id: 0,
  title: '',
  artist: '',
  album: '',
  fee: 0,
  lyric: [],
  albumPicUrl: {
    uri: ''
  }
}

export class Player {
  inited = false
  isPlaying = false
  playList: SongType.SongList =
    (storage.getArray('play-list') as SongType.SongList)?.filter(
      item => item.id
    ) || []
  currentTrack: SongType.SongProps = initTrackInfo
  nextTrack: SongType.SongProps = initTrackInfo

  constructor() {
    makeAutoObservable(this)
  }

  setInited(inited: boolean) {
    this.inited = inited
  }

  setIsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying
  }

  setPlayList(playList: SongType.SongList) {
    this.playList = playList.filter(item => item.id !== undefined)
    storage.setArray('play-list', toJS(this.playList))
  }

  setCurrentTrack(track: SongType.SongProps) {
    this.currentTrack = track
  }

  setNextTrack(track: SongType.SongProps) {
    this.nextTrack = track
  }
}

const PlayerStore = new Player()
export default PlayerStore
