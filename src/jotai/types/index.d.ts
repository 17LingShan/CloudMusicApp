import { State } from 'react-native-track-player'
declare namespace SongType {
  interface SongProps {
    id: number
    title: string
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
  }

  interface playerAction {
    type: 'init'
  }
}
