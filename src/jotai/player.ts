import { EmitterSubscription } from 'react-native'
import { atom, useAtom } from 'jotai'
import TrackPlayer, {
  Capability,
  RepeatMode,
  Event,
  State,
  AppKilledPlaybackBehavior,
  useTrackPlayerEvents
} from 'react-native-track-player'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { uniqBy } from 'lodash'
import { fetchUrlById } from '@/api/search'
import { storage } from '@/storage'
import type { SongType } from './types'
import { useState } from 'react'

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
export const isPlayingAtom = atom<boolean>(false)
export const isIdleStateAtom = atom<boolean>(false)
export const currentTrackAtom = atom<SongType.SongProps>(initTrackInfo)
export const nextTrackAtom = atom<SongType.SongProps>(initTrackInfo)

export function useTrackPlayer() {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
  const [isIdleState, setIsIdleState] = useAtom(isIdleStateAtom)
  const [currentTrack, setCurrentTrack] = useAtom(currentTrackAtom)
  const [nextTrack, setNextTrack] = useAtom(nextTrackAtom)

  return {
    isPlaying,
    currentTrack,
    setNextTrack
  }
}

export function useTrackPlayerController() {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
  // const [isIdleState, setIsIdleState] = useAtom(isIdleStateAtom)
  // const [isIdleState, setIsIdleState] = useState<boolean>(false)

  const [currentTrack, setCurrentTrack] = useAtom(currentTrackAtom)
  const [nextTrack, setNextTrack] = useAtom(nextTrackAtom)

  const [storagePlayList, setStoragePlayList] = useMMKVStorage(
    'play-list',
    storage,
    []
  )
  const [isHandlingEvent, setIsHandlingEvent] = useState<boolean>(false)
  useTrackPlayerEvents([Event.PlaybackState], async event => {
    if (isHandlingEvent) return // 如果正在处理事件，则直接返回

    setIsHandlingEvent(true) // 设置标志变量为 true，表示正在处理事件

    const { state } = event

    switch (state) {
      case State.Playing:
        setIsPlaying(true)
        const playingTrack = (await TrackPlayer.getTrack(
          await TrackPlayer.getCurrentTrack()
        )) as SongType.SongProps
        if (playingTrack) setCurrentTrack(playingTrack)

        // setIsIdleState(false)

        setStoragePlayList(
          uniqBy([...(await TrackPlayer.getQueue()), ...storagePlayList], 'id')
        )
        break
      case State.Paused:
        setIsPlaying(false)
        break
      case State.Connecting:
      case State.Buffering:
        break
      case State.None:
        if (!currentTrack.id) break

        // if (isIdleState) break
        await pause()
        // setIsIdleState(true)
        setIsPlaying(false)
        const idleTrack = (await TrackPlayer.getTrack(
          await TrackPlayer.getCurrentTrack()
        )) as SongType.SongProps
        console.log('idleTrack', idleTrack)
        if (idleTrack) await playTracker(idleTrack)
        // setIsIdleState(false)

        break
      default:
        setIsPlaying(false)
        break
    }
    setIsHandlingEvent(false) // 处理完事件后，将标志变量设置为 false
  })
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    console.log('changed event', event)

    if (nextTrack.id) {
      await pause()
      await playTracker(nextTrack)
      setNextTrack(initTrackInfo)
      setCurrentTrack(nextTrack)
    } else {
      const changeTrack = (await TrackPlayer.getTrack(
        await TrackPlayer.getCurrentTrack()
      )) as SongType.SongProps
      if (changeTrack) setCurrentTrack(changeTrack)
    }
  })
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
  let url: string | undefined = await fetchUrlById({ id: id, level: level })
    .then(res => (res.data.code !== 200 ? url : res.data.data[0].url))
    .catch(err => url)

  return url ? Promise.resolve(url) : Promise.reject(url)
}

export async function playTracker(songInfo: SongType.SongProps) {
  await initTrack()

  await TrackPlayer.setRepeatMode(RepeatMode.Queue)
  const playList = await TrackPlayer.getQueue()

  const _pos = playList.findIndex(item => item.id === songInfo.id)
  if (_pos === -1) {
    await fetchSongInfo({ id: songInfo.id })
      .then(res => {
        playList.unshift({
          ...songInfo,
          url: res
        })
      })
      .catch(() => console.log('false to fetchSongInfo'))
    await TrackPlayer.reset()
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)

    await TrackPlayer.add(uniqBy(playList, 'id'))
    await TrackPlayer.play()
  } else {
    const newPlayList = [...playList.splice(_pos), ...playList.slice(0, _pos)]

    await fetchSongInfo({ id: newPlayList[0].id })
      .then(res => {
        newPlayList[0].url = res
      })
      .catch(() => console.log('false to fetchSongInfo'))

    await TrackPlayer.reset()
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
    await TrackPlayer.add(uniqBy(newPlayList, 'id'))
    await TrackPlayer.play()
  }
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
