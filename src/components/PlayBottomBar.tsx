import { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  Image,
  Pressable,
  View,
  StyleSheet
} from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CommonActions, useNavigation } from '@react-navigation/core'
import {
  GestureEvent,
  PanGestureHandler,
  State
} from 'react-native-gesture-handler'
import ThemeStore from '@/mobx/theme'
import PlayerStore from '@/mobx/player'
import coverImg from '@/assets/cover.jpg'
import { pause, play, skipToDirection } from '@/util/playTool'
import { hexToRGB, screenHeight, screenWidth } from '@/util/common'

function PlayBottomBar(): JSX.Element {
  const navigation = useNavigation()
  const [skipping, setSkipping] = useState(false)

  const bottom = useRef(
    new Animated.Value(
      PlayerStore.currentTrack.id ?? 0
        ? screenHeight * 0.1
        : -screenHeight * 0.1
    )
  ).current

  const bottomAni = Animated.timing(bottom, {
    toValue:
      PlayerStore.currentTrack.id ?? 0
        ? screenHeight * 0.1
        : -screenHeight * 0.1,
    duration: 400,
    useNativeDriver: false,
    easing: Easing.quad
  })
  bottomAni.start()

  const handleBarHorEvent = async (event: GestureEvent) => {
    if (skipping) return
    if (event.nativeEvent.state === State.ACTIVE) {
      const TranX = event.nativeEvent.translationX as number
      if (Math.abs(TranX) > screenWidth * 0.3) {
        console.log('Rotation TranX', TranX)
        setSkipping(true)
        await skipToDirection(-1 * Math.sign(TranX))
      }
    }
  }

  useEffect(() => {
    return () => {
      bottomAni.reset()
    }
  }, [])

  useEffect(() => {
    if (PlayerStore.isPlaying) {
      setSkipping(false)
    }
  }, [PlayerStore.isPlaying])

  return (
    <>
      <PanGestureHandler onGestureEvent={handleBarHorEvent}>
        <Animated.View
          style={{
            ...style.barWrap,
            bottom: bottom
          }}>
          <View
            style={{
              ...style.barContainer,
              backgroundColor: `rgba(${hexToRGB(ThemeStore.onSurface)},0.6)`
            }}>
            <Pressable
              onPress={() => {
                navigation.dispatch(CommonActions.navigate('PlayDetail'))
              }}>
              <Image
                style={style.imgStyle}
                source={
                  PlayerStore.currentTrack.id
                    ? toJS(PlayerStore.currentTrack.albumPicUrl)
                    : coverImg
                }
              />
            </Pressable>
            <Icon
              size={48}
              style={{ ...style.iconStyle, color: ThemeStore.surface }}
              name={PlayerStore.isPlaying ? 'pause' : 'play-arrow'}
              onPress={() => (PlayerStore.isPlaying ? pause() : play())}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

const style = StyleSheet.create({
  barWrap: {
    width: '100%',
    height: screenHeight * 0.1,
    position: 'absolute',
    paddingHorizontal: 16
  },
  barContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingVertical: screenHeight * 0.01,
    paddingHorizontal: screenHeight * 0.02,
    overflow: 'hidden'
  },
  imgStyle: {
    width: screenHeight * 0.08,
    height: screenHeight * 0.08,
    borderRadius: 6
  },
  iconStyle: {
    lineHeight: screenHeight * 0.08
  }
})

export default observer(PlayBottomBar)
