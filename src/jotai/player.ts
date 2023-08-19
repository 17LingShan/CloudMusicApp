import { atom, useSetAtom } from 'jotai'
import type { SongType } from './types'
import TrackPlayer from 'react-native-track-player'

export const SearchListAtom = atom<SongType.SongProps[]>([])

// arrow function does no exist this
// export class Player {
//   private initialized = false
//   private isPlaying = false
//   playState = State.None
//   currentPlay = null
//   playList = <SongType.SongList>[]
//   position = 0 // 当前播放的位置

//   constructor() {}

//   async init() {
//     console.log('init', this.initialized)
//     if (this.initialized) return
//     this.initialized = true
//     await TrackPlayer.setupPlayer()
//     console.log('init', this.initialized)

//     // await TrackPlayer.updateOptions({
//     //   capabilities: [
//     //     Capability.Pause,
//     //     Capability.Play,
//     //     Capability.Skip,
//     //     Capability.SkipToNext,
//     //     Capability.SkipToPrevious
//     //   ]
//     // })
//   }

//   async play(songInfo: SongType.SongProps) {
//     await this.init()
//     await TrackPlayer.reset()
//     await TrackPlayer.setRepeatMode(RepeatMode.Queue)

//     if (this.playList.length > 0) {
//       const newList = []
//       if (!songInfo.url) {
//         await fetchUrlById({ id: songInfo.key }).then(res => {
//           console.log('fetch', res.data.data[0].url)
//           songInfo = {
//             ...songInfo,
//             url: res.data.data[0].url
//           }
//         })

//         newList.push([songInfo, ...this.playList])
//       } else {
//         newList.push([
//           songInfo,
//           ...this.playList.filter(item => item.key !== songInfo.key)
//         ])
//       }

//       //   const newList = [
//       //     ...this.playList.slice(_pos),
//       //     ...this.playList.slice(0, _pos)
//       //   ].map((item, index) => ({
//       //     url: item.url,
//       //     key: item.key,
//       //     position: item.position,
//       //     MediaName: item.MediaName,
//       //     artist: item.artist,
//       //     album: item.album
//       //   }))
//       this.playList = newList
//       TrackPlayer.add(newList)
//       console.log('hasList', this.playList)
//     } else {
//       fetchUrlById({ id: songInfo.key }).then(res => {
//         console.log('fetch', res.data.data[0].url)
//         this.playList.push({
//           key: songInfo.key,
//           position: songInfo.position,
//           MediaName: songInfo.MediaName,
//           artist: songInfo.artist,
//           album: songInfo.album,
//           url: res.data.data.url
//         })
//       })
//     }
//     console.log('emptyList', this.playList)
//     await TrackPlayer.play()
//   }
// }

// export const PlayerContext = React.createContext<Player>(null)
