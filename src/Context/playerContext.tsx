import { PlayListAtom, SearchListAtom, initializedAtom } from '@/jotai/player'
import { SongType } from '@/jotai/types'
import { useAtom } from 'jotai'
import { createContext, useMemo } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

// interface PlayerContextType {
//   play: (songInfo?: SongType.SongProps) => void
// }
// export const PlayerContext = createContext<PlayerContextType>(null)

// export function PlayerProvider({ children }): JSX.Element {
//   const [inited, setInited] = useAtom(initializedAtom)
//   const [searchList, setSearchList] = useAtom(SearchListAtom)
//   const [playList, setPlayList] = useAtom(PlayListAtom)

//   const initTracker = async () => {
//     if (inited) return
//     setInited(true)
//     console.log('init', inited)
//     await TrackPlayer.setupPlayer()
//   }

//   const play = async (songInfo: SongType.SongProps) => {
//     await initTracker()
//     await TrackPlayer.reset()
//     await TrackPlayer.setRepeatMode(RepeatMode.Queue)
//     setPlayList([
//       {
//         key: songInfo.key,
//         url: 'http://m801.music.126.net/20230819123902/c78505964c5d98c6b02e093ebe7ef455/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/17224489028/8504/df39/b7eb/e9faa86e07f705b1021ba7b71a589690.mp3',
//         position: songInfo.position,
//         artist: songInfo.artist,
//         title: songInfo.title,
//         album: songInfo.album
//       }
//     ])
//     console.log('searchList', searchList)
//   }

//   const contextValue: PlayerContextType = {
//     play
//   }
//   return (
//     <PlayerContext.Provider value={contextValue}>
//       {children}
//     </PlayerContext.Provider>
//   )
// }
