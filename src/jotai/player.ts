import { EmitterSubscription } from 'react-native'
import { atom } from 'jotai'
import TrackPlayer, {
  Capability,
  RepeatMode,
  Event,
  State,
  AppKilledPlaybackBehavior,
  Track
} from 'react-native-track-player'
import { fetchUrlById } from '@/api/search'
import type { SongType } from './types'

const subscription: EmitterSubscription[] = []

export const isPlayingAtom = atom<boolean>(false)
export const PlayListAtom = atom<SongType.SongList>([])

async function initTrack() {
  if (await TrackPlayer.isServiceRunning()) return
  await TrackPlayer.setupPlayer()
    .then(async () => {
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Pause,
          Capability.Play,
          Capability.Skip,
          Capability.SkipToNext,
          Capability.SkipToPrevious
        ],
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
        }
      }).catch(() => console.log('false to update'))

      subscription.push(
        ...[
          TrackPlayer.addEventListener(Event.RemotePlay, () => {
            play()
          }),
          TrackPlayer.addEventListener(Event.RemotePause, () => {
            pause()
          }),
          TrackPlayer.addEventListener(Event.RemoteNext, () => {
            next()
          }),
          TrackPlayer.addEventListener(Event.RemotePrevious, () => {
            prev()
          })
        ]
      )
    })
    .catch(() => console.log('setup False'))
}

async function fetchSongInfo({ id, level }: APIParams.FetchUrlParam) {
  let url: string | null = await fetchUrlById({ id: id, level: level })
    .then(res => {
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

export async function playTracker(songInfo: SongType.SongProps) {
  await initTrack()
  await TrackPlayer.setRepeatMode(RepeatMode.Queue)
  const playList = await TrackPlayer.getQueue()
  if (playList.length > 0) {
    // console.log('state', await TrackPlayer.getState())
    const _pos = playList.findIndex(item => item.id === songInfo.id)
    if (_pos === -1) {
      await fetchSongInfo({ id: songInfo.id })
        .then(async res => {
          playList.unshift({
            id: songInfo.id,
            url: res,
            artist: songInfo.artist,
            title: songInfo.title,
            album: songInfo.album,
            albumPicUrl: songInfo.albumPicUrl
          })
        })
        .catch(() => console.log('false to fetchSongInfo'))
      await TrackPlayer.reset()
      await TrackPlayer.add(playList)
      await TrackPlayer.play()
    } else {
      const newPlayList = [...playList.splice(_pos), ...playList.slice(0, _pos)]
      await TrackPlayer.reset()
      await TrackPlayer.add(newPlayList)
      await TrackPlayer.play()
    }
  } else {
    await fetchSongInfo({ id: songInfo.id })
      .then(async res => {
        playList.unshift({
          id: songInfo.id,
          url: res,
          artist: songInfo.artist,
          title: songInfo.title,
          album: songInfo.album,
          albumPicUrl: songInfo.albumPicUrl
        })
        await TrackPlayer.add(playList)
        await TrackPlayer.play()

        console.log(await TrackPlayer.getState())
      })
      .catch(err => {
        console.log('获取歌曲失败', err)
      })
  }
  console.log('currentPlayList', await TrackPlayer.getQueue())
}

export async function addToNextPlay(songInfo: SongType.SongProps) {
  console.log('addTrackToNext')
}

export async function pause() {
  await TrackPlayer.pause()
}

export async function play() {
  await TrackPlayer.play()
}

export async function next() {
  await TrackPlayer.skipToNext()
}

export async function prev() {
  await TrackPlayer.skipToPrevious()
}

export async function destroyTracker() {
  // subscription.forEach(item => item.remove())
}
