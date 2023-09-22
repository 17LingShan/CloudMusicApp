import { State } from 'react-native-track-player'
declare namespace SongType {
  interface LyricItem {
    time: number
    text: string
  }

  interface SongProps {
    id: number
    title: string
    artist: string
    album: string
    fee: 0 | 1 | 4 | 8
    lyric?: LyricItem[]
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
    url?: string | null
  }
  type BannerList = BannerProps[]
}

declare namespace AlbumType {
  interface AlbumProps {
    name: string
    id: number
    userId: string
    avatarUrl: string
    nickname: string
    coverImgUrl: string
    description: string
    trackCount?: number
    shareCount?: number
    commentCount?: number
    subscribedCount?: number
  }

  type AlbumList = AlbumProps[]
}

declare namespace UserType {
  interface UserProps {
    userId: number
    nickname: string
    avatarUrl: string
    backgroundUrl?: string
  }
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

declare namespace ThemeType {
  type ThemeProps = 'light' | 'dark'
}
