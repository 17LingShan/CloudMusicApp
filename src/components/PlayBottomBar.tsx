import { isPlayingAtom, pause, play, useTrackPlayer } from '@/jotai/player'
import {
  CommonActions,
  useIsFocused,
  useNavigation
} from '@react-navigation/core'
import { useEffect, useMemo, useState } from 'react'
import { Animated, Easing, Image, Pressable, View } from 'react-native'
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  useTrackPlayerEvents
} from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialIcons'
import coverImg from '@/assets/cover.jpg'
import { SongType } from '@/jotai/types'
import { useAtom } from 'jotai'

function PlayBottomBar(): JSX.Element {
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  // const [isPlaying, setPlaying] = useAtom(isPlayingAtom)
  // const [currentTrack, setCurrentTrack] = useState<SongType.SongProps>()
  const { isPlaying, currentTrack } = useTrackPlayer()
  const bottom = useMemo(
    () => new Animated.Value(currentTrack.id ? 60 : -80),
    []
  )

  // const handleTrackStateChange = async () => {
  //   const state = await TrackPlayer.getState()
  //   console.log('playBottomBar state', state)
  //   switch (state) {
  //     case State.Playing:
  //       setPlaying(true)
  //       await handleChangeIntoPlay()
  //       break
  //     case State.Paused:
  //       setPlaying(false)
  //       break
  //     case State.None:
  //       setPlaying(false)
  //       await handleIdleState()
  //       break
  //     default:
  //       setPlaying(false)
  //       break
  //   }
  // }

  // const handleIdleState = async () => {
  //   if (await TrackPlayer.isServiceRunning()) {
  //     const playList = await TrackPlayer.getQueue()
  //     console.log('idle Track List', playList)
  //     await TrackPlayer.reset()
  //     // await TrackPlayer.setRepeatMode(RepeatMode.Queue)
  //     await TrackPlayer.add(playList)
  //     // await TrackPlayer.play()
  //   } else {
  //     console.log('unknown Error')
  //   }
  // }

  // const handleChangeIntoPlay = async () => {
  //   if (await TrackPlayer.isServiceRunning()) {
  //     console.log('running')
  //     setCurrentTrack(
  //       (await TrackPlayer.getTrack(
  //         await TrackPlayer.getCurrentTrack()
  //       )) as SongType.SongProps
  //     )
  //   }
  //   console.log('currentTrack in handleChangeIntoPlay', currentTrack)
  // }
  const handleChangeIntoPause = async () => {}
  const handleChangeIntoNext = async () => {}
  const handleChangeIntoPrev = async () => {}

  // useTrackPlayerEvents(
  //   [Event.PlaybackState, Event.PlaybackTrackChanged],
  //   async () => await handleTrackStateChange()
  // )
  const bottomAni = Animated.timing(bottom, {
    toValue: currentTrack.id ? 60 : -80,
    duration: 400,
    useNativeDriver: false,
    easing: Easing.quad
  })
  bottomAni.start()
  useEffect(() => {
    console.log('render ')

    return () => {
      bottomAni.reset()
      console.log('destroy')
    }
  }, [])

  return (
    <>
      <Animated.View
        style={{
          width: '100%',
          position: 'absolute',
          paddingHorizontal: 16,
          bottom: bottom
        }}>
        <View style={{ width: '100%' }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 12,
              overflow: 'hidden'
            }}>
            <Pressable
              onPress={() => {
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'playDetail',
                    params: currentTrack
                  })
                )
              }}>
              <Image
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 6
                }}
                source={currentTrack?.albumPicUrl ?? coverImg}
              />
            </Pressable>
            <Icon
              size={48}
              name={isPlaying ? 'pause' : 'play-arrow'}
              onPress={() => (isPlaying ? pause() : play())}
            />
          </View>
        </View>
      </Animated.View>
    </>
  )
}

export default PlayBottomBar
