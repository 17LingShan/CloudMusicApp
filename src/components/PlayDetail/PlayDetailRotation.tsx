import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import coverImg from '@/assets/cover.jpg'
import { SongType } from '@/mobx/types'
import playerStore from '@/mobx/player'
import { screenWidth } from '@/util/common'
import {
  GestureEvent,
  PanGestureHandler,
  State
} from 'react-native-gesture-handler'
import { skipToDirection } from '@/util/playTool'

function PlayDetailRotation({
  albumPicUrl
}: Pick<SongType.SongProps, 'albumPicUrl'>): JSX.Element {
  const rotate = useRef(new Animated.Value(0)).current
  const [skipping, setSkipping] = useState(false)

  const rotateInterpolation = useMemo(
    () =>
      rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      }),
    []
  )

  const handleHorizontalEvent = async (event: GestureEvent) => {
    if (skipping) return
    if (event.nativeEvent.state === State.ACTIVE) {
      const TranX = event.nativeEvent.translationX as number
      if (Math.abs(TranX) > screenWidth * 0.4) {
        console.log(123)
        setSkipping(true)
        await skipToDirection(Math.sign(TranX) * 1)
      }
    }
  }

  const rotateAni = () => {
    Animated.timing(rotate, {
      toValue: 1,
      useNativeDriver: true,
      duration: 24000,
      easing: Easing.linear
    }).start(({ finished }) => {
      if (finished) {
        rotate.setValue(0)
        rotateAni()
      }
    })
  }

  useEffect(() => {
    if (playerStore.isPlaying) {
      rotateAni()
      setSkipping(false)
    } else {
      rotate.stopAnimation()
    }
  }, [playerStore.isPlaying])

  return (
    <>
      <PanGestureHandler onGestureEvent={handleHorizontalEvent}>
        <Animated.Image
          style={{
            ...style.imgStyle,
            transform: [{ rotate: rotateInterpolation }]
          }}
          source={albumPicUrl.uri ? albumPicUrl : coverImg}
        />
      </PanGestureHandler>
    </>
  )
}

const style = StyleSheet.create({
  imgStyle: {
    width: screenWidth * 0.618,
    height: screenWidth * 0.618,
    borderRadius: 9999
  }
})

export default PlayDetailRotation
