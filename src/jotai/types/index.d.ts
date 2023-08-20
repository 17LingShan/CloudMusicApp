import { State } from 'react-native-track-player'
declare namespace SongType {
  interface SongProps {
    id: number
    title: string
    artist: string
    album: string
    url?: string
    albumPicUrl: {
      uri: string
    }
    [key: string]: any
  }
  type SongList = SongProps[]
}

declare namespace BannerType {
  interface BannerProps {
    pic: string
  }
  type BannerList = BannerProps[]
}

declare namespace AlbumType {
  interface AlbumProps {
    name: string
    id: number
    userId: string
    coverImgUrl: string
    description: string
  }

  type AlbumList = AlbumProps[]
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
