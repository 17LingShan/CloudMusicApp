import { EmitterSubscription } from 'react-native'
import { SetStateAction, atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import TrackPlayer, {
  Capability,
  RepeatMode,
  Event,
  State,
  AppKilledPlaybackBehavior,
  useTrackPlayerEvents,
  Track
} from 'react-native-track-player'
import { fetchUrlById } from '@/api/search'
import type { SongType } from './types'
import { uniqBy } from 'lodash'

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

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    const { state } = event
    console.log('state', state)
    switch (state) {
      case State.Playing:
        setIsPlaying(true)
        setCurrentTrack(
          (await TrackPlayer.getTrack(
            await TrackPlayer.getCurrentTrack()
          )) as SongType.SongProps
        )
        break
      case State.Paused:
        setIsPlaying(false)
        break
      case State.Connecting:
      case State.Buffering:
        break
      case State.None:
        if (isIdleState) return
        setIsPlaying(false)
        setIsIdleState(true)
        const idleTrack = await TrackPlayer.getTrack(
          await TrackPlayer.getCurrentTrack()
        )
        setIsIdleState(false)

        // await playTracker(idleTrack as SongType.SongProps)
        break
      default:
        setIsPlaying(false)
        break
    }
  })
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    console.log('changed event', event)
    if (!nextTrack.id) return
    await pause()
    await playTracker(nextTrack)
    setNextTrack(initTrackInfo)
  })

  useTrackPlayerEvents([Event.RemoteNext], event => {
    console.log('eeeeeeeeeeeeee')
  })
  return {
    isPlaying,
    currentTrack,
    setNextTrack
  }
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
      console.log('newPlayList', uniqBy(playList, 'id'))

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
      await TrackPlayer.add(uniqBy(newPlayList, 'id'))
      await TrackPlayer.play()
    }
  } else {
    await fetchSongInfo({ id: songInfo.id })
      .then(async res => {
        playList.unshift({
          ...songInfo,
          url: res
        })
        await TrackPlayer.add(uniqBy(playList, 'id'))
        await TrackPlayer.play()

        console.log(await TrackPlayer.getState())
      })
      .catch(err => {
        console.log('获取歌曲失败', err)
      })
  }
  // console.log('currentPlayList', await TrackPlayer.getQueue())
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
