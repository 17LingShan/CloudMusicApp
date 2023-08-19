import { State } from 'react-native-track-player'
declare namespace SongType {
  interface SongProps {
    key: number
    position: number
    MediaName: string
    artist: string
    album: string
    url?: string
  }
  type SongList = SongProps[]
}

declare namespace PlayerType {
  interface PlayerProps {
    initialized: boolean
    isPlaying: boolean
    playState: State
    currentPlay: SongType.SongProps | null
    playList: SongType.SongList | null
    position: number
  }

  interface playerAction {
    type: 'init'
  }
}
