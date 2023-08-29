import { EmitterSubscription } from 'react-native'
import TrackPlayer, {
  PlaybackStateEvent,
  State,
  Event,
  PlaybackTrackChangedEvent,
  Capability,
  AppKilledPlaybackBehavior,
  RepeatMode,
  Track
} from 'react-native-track-player'
import { uniqBy } from 'lodash'
import { toJS } from 'mobx'
import { fetchSongInfo, showToastErr } from './common'
import { SongType } from '@/mobx/types'
import playerStore, { initTrackInfo } from '@/mobx/player'
const subscription: EmitterSubscription[] = []

function changeStateEmit(event: PlaybackStateEvent) {
  console.log('play back state event', event)
  switch (event.state) {
    case State.Playing:
      playerStore.setIsPlaying(true)
      break
    default:
      playerStore.setIsPlaying(false)
      break
  }
}

// 正常切换到下一首，event中带有track且为0；
async function changeEventEmit(event: PlaybackTrackChangedEvent) {
  console.log('change event', event)

  await pause()
  // 正常下一首播放
  if (event.track === 0) {
    console.log(1)
    const currentIndex = playerStore.playList.findIndex(
      item => item.id === playerStore.currentTrack.id
    )
    const nextPlayTrack = toJS(
      playerStore.playList[(currentIndex + 1) % playerStore.playList.length]
    )
    playerStore.setPlayList(changePlayListOrder(nextPlayTrack))
    await playTrack(nextPlayTrack)
  } else {
    // 选择某一首播放
    console.log(3)
    const playingTrack = (await TrackPlayer.getTrack(0)) as SongType.SongProps

    if (
      playingTrack.id === playerStore.currentTrack.id &&
      playerStore.isPlaying
    )
      return
    playerStore.setCurrentTrack(playingTrack)
    playerStore.setPlayList(changePlayListOrder(playingTrack))
  }
  await play()
}

function changePlayListOrder(
  currentTrack: SongType.SongProps
): SongType.SongList {
  const position = playerStore.playList.findIndex(
    item => item.id === currentTrack.id
  )

  if (position === -1) {
    return uniqBy([currentTrack, ...toJS(playerStore.playList)], 'id')
  } else {
    return uniqBy(
      [
        ...toJS([
          ...playerStore.playList.slice(position),
          ...toJS(playerStore.playList.slice(0, position))
        ])
      ],
      'id'
    )
  }
}

async function initTrack() {
  if (playerStore.inited) return
  playerStore.setInited(true)
  await TrackPlayer.setupPlayer()
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Skip,
      Capability.SkipToNext,
      Capability.SkipToPrevious
    ],
    android: {
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
    }
  })
  subscription.push(
    ...[
      TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        await play()
      }),
      TrackPlayer.addEventListener(Event.RemotePause, async () => {
        await pause()
      }),
      TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        skipToDirection(1)
      }),
      TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        skipToDirection(-1)
      }),
      TrackPlayer.addEventListener(Event.PlaybackState, event =>
        changeStateEmit(event)
      ),
      TrackPlayer.addEventListener(
        Event.PlaybackTrackChanged,
        async event => await changeEventEmit(event)
      )
    ]
  )
}

export async function playTrack(songInfo: SongType.SongProps) {
  await initTrack()
  const hasUrlTrackInfo = await fetchSongInfo({ id: songInfo.id })
    .then(res => ({
      ...songInfo,
      url: res.url,
      lyric: res.lyric
    }))
    .catch(err => {
      console.log('false to fetchSongInfo', err)
      showToastErr({ code: -460 })
      return songInfo
    })
  console.log(hasUrlTrackInfo.id)
  if (hasUrlTrackInfo.url === songInfo.url) return
  await TrackPlayer.reset()
  await TrackPlayer.setRepeatMode(RepeatMode.Queue)
  await TrackPlayer.add(hasUrlTrackInfo as Track)
}
export async function pause() {
  await TrackPlayer.pause()
}

export async function play() {
  await TrackPlayer.play()
}

// 处理指定好了的下一首
async function handleSkipToAssignNextTrack(direction?: number) {
  if (!playerStore.nextTrack.id || direction <= 0) return Promise.reject()
  playerStore.setPlayList(changePlayListOrder(toJS(playerStore.nextTrack)))
  await playTrack(toJS(playerStore.nextTrack))
  await play()
  playerStore.setNextTrack(initTrackInfo)

  return Promise.resolve()
}

export async function skipToDirection(direction: number) {
  await handleSkipToAssignNextTrack(direction)
    .then()
    .catch(async () => {
      const currentIndex = playerStore.playList.findIndex(
        item => item.id === playerStore.currentTrack.id
      )
      const nextIndex =
        (currentIndex + direction + playerStore.playList.length) %
        playerStore.playList.length
      const nextPlayTrack = toJS(playerStore.playList[nextIndex])

      await playTrack(nextPlayTrack)
    })
}
