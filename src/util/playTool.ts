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
import { fetchTrackInfo, showToastCommon, showToastErr } from './common'
import { SongType } from '@/mobx/types'
import PlayerStore, { initTrackInfo } from '@/mobx/player'
const subscription: EmitterSubscription[] = []

function changeStateEmit(event: PlaybackStateEvent) {
  console.log('play back state event', event)
  switch (event.state) {
    case State.Playing:
      PlayerStore.setIsPlaying(true)
      break
    default:
      PlayerStore.setIsPlaying(false)
      break
  }
}

// 正常切换到下一首, event中带有track且为0;
async function changeEventEmit(event: PlaybackTrackChangedEvent) {
  console.log('change event', event)

  await pause()
  // 正常下一首播放
  if (event.track === 0) {
    console.log(1)
    const currentIndex = PlayerStore.playList.findIndex(
      item => item.id === PlayerStore.currentTrack.id
    )
    const nextPlayTrack = toJS(
      PlayerStore.playList[(currentIndex + 1) % PlayerStore.playList.length]
    )
    PlayerStore.setPlayList(changePlayListOrder(nextPlayTrack))
    await playTrack(nextPlayTrack)
  } else {
    // 选择某一首播放
    console.log(3)
    const playingTrack = (await TrackPlayer.getTrack(0)) as SongType.SongProps
    if (
      playingTrack.id === PlayerStore.currentTrack.id &&
      PlayerStore.isPlaying
    )
      return
    PlayerStore.setCurrentTrack(playingTrack)
    PlayerStore.setPlayList(changePlayListOrder(playingTrack))
  }
  await play()
}

function changePlayListOrder(
  currentTrack: SongType.SongProps
): SongType.SongList {
  const position = PlayerStore.playList.findIndex(
    item => item.id === currentTrack.id
  )

  if (position === -1) {
    return uniqBy([currentTrack, ...toJS(PlayerStore.playList)], 'id')
  } else {
    return uniqBy(
      [
        ...toJS([
          ...PlayerStore.playList.slice(position),
          ...toJS(PlayerStore.playList.slice(0, position))
        ])
      ],
      'id'
    )
  }
}

async function initTrack() {
  if (PlayerStore.inited) return
  PlayerStore.setInited(true)
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
        await skipToDirection(1)
      }),
      TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        await skipToDirection(-1)
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

export async function playTrack(trackInfo: SongType.SongProps) {
  await initTrack()

  // 加上尺寸
  if (!trackInfo.albumPicUrl.uri.includes('?param=500y500')) {
    trackInfo.albumPicUrl.uri += '?param=500y500'
  }

  const hasUrlTrackInfo = await fetchTrackInfo({ id: trackInfo.id })
    .then(res => ({
      ...trackInfo,
      url: res.url
    }))
    .catch(err => {
      console.log('false to fetchTrackInfo', err)
      showToastErr({ message: '网络拥挤, 请稍后再试！' })
      return trackInfo
    })
  console.log('track url', hasUrlTrackInfo.url)
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

// 添加track到下一首
export function addTrackToNext(trackInfo: SongType.SongProps) {
  PlayerStore.setNextTrack(trackInfo)
  showToastCommon({ message: '已加入下一首播放', gravity: 'top' })
}

export function removeTrack(trackInfo: SongType.SongProps) {
  PlayerStore.setPlayList(
    toJS(PlayerStore.playList.filter(item => item.id !== trackInfo.id))
  )
  showToastCommon({ message: '移除成功！', gravity: 'top' })
}

// 处理指定已经指定的下一首
async function handleSkipToAssignNextTrack(direction?: number) {
  if (!PlayerStore.nextTrack.id || direction <= 0) return Promise.reject()
  PlayerStore.setPlayList(changePlayListOrder(toJS(PlayerStore.nextTrack)))
  await playTrack(toJS(PlayerStore.nextTrack))
  await play()
  PlayerStore.setNextTrack(initTrackInfo)

  return Promise.resolve()
}

// 跳转指定方向
export async function skipToDirection(direction: number) {
  console.log('direction', direction)
  await handleSkipToAssignNextTrack(direction)
    .then()
    .catch(async () => {
      const currentIndex = PlayerStore.playList.findIndex(
        item => item.id === PlayerStore.currentTrack.id
      )
      const nextIndex =
        (currentIndex + direction + PlayerStore.playList.length) %
        PlayerStore.playList.length
      const nextPlayTrack = toJS(PlayerStore.playList[nextIndex])

      await playTrack(nextPlayTrack)
    })
}
