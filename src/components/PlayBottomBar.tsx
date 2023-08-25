import { useEffect, useMemo, useRef } from 'react'
import { pause, play, useTrackPlayer } from '@/jotai/player'
import {
  CommonActions,
  useIsFocused,
  useNavigation
} from '@react-navigation/core'
import { Animated, Easing, Image, Pressable, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import coverImg from '@/assets/cover.jpg'

function PlayBottomBar(): JSX.Element {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const { isPlaying, currentTrack } = useTrackPlayer()

  const bottom = useRef(
    new Animated.Value(currentTrack.id ?? 0 ? 60 : -80)
  ).current

  const bottomAni = Animated.timing(bottom, {
    toValue: currentTrack.id ?? 0 ? 60 : -80,
    duration: 400,
    useNativeDriver: false,
    easing: Easing.quad
  })
  bottomAni.start()

  useEffect(() => {
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
                navigation.dispatch(CommonActions.navigate('playDetail'))
              }}>
              <Image
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 6
                }}
                source={
                  currentTrack.id ?? 0 ? currentTrack.albumPicUrl : coverImg
                }
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
