import { PlayListAtom, next, pause, play, prev } from '@/jotai/player'
import { useIsFocused, useRoute } from '@react-navigation/core'
import { useEffect, useMemo, useState } from 'react'
import { Animated, Easing, Button, Image, View, Text } from 'react-native'
import TrackPlayer, {
  Event,
  State,
  Track,
  useTrackPlayerEvents
} from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialIcons'
import coverImg from '@/assets/cover.jpg'
import { SongType } from '@/jotai/types'

function PlayBottomBar(): JSX.Element {
  const isFocused = useIsFocused()

  const [currentTrack, setCurrentTrack] = useState<SongType.SongProps>()
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const bottomPos = useMemo(
    () => new Animated.Value(currentTrack ? 32 : -72),
    []
  )
  const handleTrackStateChange = async () => {
    const state = await TrackPlayer.getState()

    switch (state) {
      case State.Playing:
        setPlaying(true)
        handleChangeIntoPlay()
        break
      case State.Paused:
        setPlaying(false)
        handleChangeIntoPause()
        break
      default:
        console.log('otherState')
        break
    }
  }

  const handleChangeIntoPlay = async () => {
    if (await TrackPlayer.isServiceRunning()) {
      console.log('play')
      setCurrentTrack(
        (await TrackPlayer.getTrack(
          await TrackPlayer.getCurrentTrack()
        )) as SongType.SongProps
      )
    }
  }
  const handleChangeIntoPause = async () => {
    setPlaying(false)
    console.log('pause')
  }
  const handleChangeIntoNext = async () => {}
  const handleChangeIntoPrev = async () => {}

  useTrackPlayerEvents(
    [Event.PlaybackState, Event.PlaybackTrackChanged],
    async () => {
      await handleTrackStateChange()
    }
  )

  Animated.timing(bottomPos, {
    toValue: currentTrack ? 60 : -80,
    duration: 800,
    useNativeDriver: false,
    easing: Easing.quad
  }).start()

  useEffect(() => {
    isFocused ? handleChangeIntoPlay() : setCurrentTrack(null)
    console.log('isFocused', isFocused)
    console.log('currentTrack', currentTrack)
    return () => {
      console.log('destroy')
    }
  }, [isFocused])

  return (
    <>
      <Animated.View
        style={{
          width: '100%',
          position: 'absolute',
          paddingHorizontal: 16,
          bottom: bottomPos
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
            <Image
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                marginRight: 16
              }}
              source={currentTrack?.albumPicUrl ?? coverImg}></Image>
            {/* <Button
              title={isPlaying ? 'pause' : 'play'}
              onPress={() => (isPlaying ? pause() : play())}></Button> */}
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
