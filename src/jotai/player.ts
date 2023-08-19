import { atom, useAtom, useSetAtom } from 'jotai'
import type { SongType } from './types'
import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  Event
} from 'react-native-track-player'
import { fetchUrlById } from '@/api/search'

export const initializedAtom = atom<boolean>(false)
export const SearchListAtom = atom<SongType.SongList>([])
export const PlayListAtom = atom<SongType.SongList>([])

async function initTrack() {
  console.log('trying')
  // try {
  //   console.log('getting State')
  if (await TrackPlayer.isServiceRunning()) return
  // console.log(state)
  // } catch {
  await TrackPlayer.setupPlayer()
    .then(async res => {
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Pause,
          Capability.Play,
          Capability.Skip,
          Capability.SkipToNext,
          Capability.SkipToPrevious
        ]
      })
    })
    .catch(err => {
      console.log('\n', err, '\n')
    })
  // }
  console.log('inited')
}

async function fetchSongInfo({ id, level }: APIParams.FetchUrl) {
  let url: string | null = await fetchUrlById({ id: id, level: level })
    .then(res => {
      console.log(res.data.code)
      if (res.data.code !== 200) {
        return url
      } else {
        return res.data.data[0].url
      }
    })
    .catch(err => {
      return url
    })

  return url ? Promise.resolve(url) : Promise.reject(url)
}

export async function play(songInfo: SongType.SongProps) {
  console.log('init')
  await initTrack()

  await TrackPlayer.setRepeatMode(RepeatMode.Queue)
  const playList = await TrackPlayer.getQueue()
  if (playList.length > 0) {
    console.log('state', await TrackPlayer.getState())
    const _pos = playList.findIndex(item => item.id === songInfo.id)
    if (_pos === -1) {
      await fetchSongInfo({ id: songInfo.id }).then(async res => {
        playList.unshift({
          id: songInfo.id,
          url: res,
          artist: songInfo.artist,
          title: songInfo.title,
          album: songInfo.album
        })
      })
      await TrackPlayer.reset()
      await TrackPlayer.add(playList)
      await TrackPlayer.play()

      console.log(await TrackPlayer.getState())
    } else {
      const newPlayList = [...playList.splice(_pos), ...playList.slice(0, _pos)]
      await TrackPlayer.reset()
      await TrackPlayer.add(newPlayList)
      await TrackPlayer.play()
    }
  } else {
    await fetchSongInfo({ id: songInfo.id })
      .then(async res => {
        console.log('fetchSongInfo.res', res)
        playList.unshift({
          id: songInfo.id,
          url: res,
          artist: songInfo.artist,
          title: songInfo.title,
          album: songInfo.album
        })
        await TrackPlayer.add(playList)
        await TrackPlayer.play()

        console.log(await TrackPlayer.getState())
      })
      .catch(err => {
        console.log('获取歌曲失败', err)
      })
  }
  console.log('currentPlayList', playList)
}
