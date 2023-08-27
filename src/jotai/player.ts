import { EmitterSubscription } from 'react-native'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import TrackPlayer, {
  Capability,
  RepeatMode,
  Event,
  State,
  AppKilledPlaybackBehavior,
  useTrackPlayerEvents,
  Track
} from 'react-native-track-player'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { uniqBy } from 'lodash'
import { fetchUrlById } from '@/api/search'
import { storage } from '@/storage'
import type { SongType } from './types'

const subscription: EmitterSubscription[] = []
const initTrackInfo: SongType.SongProps = {
  id: 0,
  title: '',
  artist: '',
  album: '',
  fee: 0,
  albumPicUrl: {
    uri: ''
  }
}

export const isHandlingEventAtom = atom<boolean>(false)
export const isPlayingAtom = atom<boolean>(false)
export const playListAtom = atom<SongType.SongList>([])
export const currentTrackAtom = atom<SongType.SongProps>(initTrackInfo)
export const nextTrackAtom = atom<SongType.SongProps>(initTrackInfo)

export function useTrackPlayer() {
  const isPlaying = useAtomValue(isPlayingAtom)
  const currentTrack = useAtomValue(currentTrackAtom)
  const playList = useAtomValue(playListAtom)
  const setNextTrack = useSetAtom(nextTrackAtom)
  return {
    isPlaying,
    currentTrack,
    playList,
    setNextTrack
  }
}

export async function handleNext(
  currentTrack: SongType.SongProps,
  playList: SongType.SongList,
  direction: number
) {
  return async () => {
    const currentIndex = playList.findIndex(item => item.id === currentTrack.id)
    const nextIndex =
      (currentIndex + direction + playList.length) % playList.length
    const nextPlayTrack = playList[nextIndex]
    console.log('nextPlayTrack', nextPlayTrack)
    await playTrack(nextPlayTrack)
  }
}

export function useTrackPlayerMiddleware() {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
  const [playList, setPlayList] = useAtom(playListAtom)
  const [currentTrack, setCurrentTrack] = useAtom(currentTrackAtom)
  const [storagePlayList, setStoragePlayList] = useMMKVStorage(
    'play-list',
    storage,
    []
  )

  useTrackPlayerEvents([Event.PlaybackState], event => {
    switch (event.state) {
      case State.Playing:
        setIsPlaying(true)
        break
      default:
        setIsPlaying(false)
        break
    }
  })

  // 如果当前歌曲播放结束后到下一首，有nextTrack和track，如果是直接点某一首歌的话，track没有
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    console.log('change event', event)

    await pause()

    if (event.track === 0) {
      // 正常下一首播放
      console.log(1)
      const prevTrack = (await TrackPlayer.getTrack(0)) as SongType.SongProps
      const currentIndex = playList.findIndex(item => item.id === prevTrack.id)
      const nextPlayTrack = playList[(currentIndex + 1) % playList.length]
      await playTrack(nextPlayTrack)
    } else {
      // 选择某一首播放
      console.log(2)
      const playingTrack = (await TrackPlayer.getTrack(0)) as SongType.SongProps
      if (playingTrack.id === currentTrack.id) return
      setStoragePlayList(
        uniqBy([playingTrack, ...storagePlayList, ...playList], 'id')
      )
      setPlayList(prev =>
        uniqBy([...storagePlayList, playingTrack, ...prev], 'id')
      )
      setCurrentTrack(playingTrack)
    }

    await play()
  })
}

export function useTrackPlayerRemoteListener() {
  const { currentTrack, playList } = useTrackPlayer()
  const next = handleNext(currentTrack, playList, 1)
  const prev = handleNext(currentTrack, playList, -1)
  useTrackPlayerEvents(
    [Event.RemoteNext, Event.RemotePrevious],
    async event => {
      console.log('remote event', event)
      switch (event.type) {
        case 'remote-next':
          console.log('111')
          ;(await next)()
          break
        case Event.RemotePrevious:
          console.log('222')
          ;(await prev)()
          break
      }
    }
  )
}

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
      }).catch(() => console.log('false to setup'))

      subscription.push(
        ...[
          TrackPlayer.addEventListener(Event.RemotePlay, () => {
            play()
          }),
          TrackPlayer.addEventListener(Event.RemotePause, () => {
            pause()
          })
        ]
      )
    })
    .catch(() => console.log('setup False'))
}

async function fetchSongInfo({ id, level }: APIParams.FetchUrlParam) {
  let url: string | undefined = await fetchUrlById({ id: id, level: level })
    .then(res => {
      console.log('fetchSongInfo res', res.data)
      return res.data.code !== 200 ? url : res.data.data[0].url
    })
    .catch(err => {
      console.log('fetchSongInfoErr', err)
      return url
    })

  return url ? Promise.resolve(url) : Promise.reject(url)
}

export async function playTrack(songInfo: SongType.SongProps) {
  await initTrack()
  console.log('songInfo', songInfo)

  const hasUrlTrackInfo = await fetchSongInfo({ id: songInfo.id })
    .then(res => ({
      ...songInfo,
      url: res
    }))
    .catch(() => console.log('false to fetchSongInfo'))
  await TrackPlayer.reset()
  await TrackPlayer.setRepeatMode(RepeatMode.Queue)
  await TrackPlayer.add(hasUrlTrackInfo as Track)
  // await TrackPlayer.play()
  console.log('currentTrack', await TrackPlayer.getQueue())
}

export async function pause() {
  await TrackPlayer.pause()
}

export async function play() {
  await TrackPlayer.play()
}
