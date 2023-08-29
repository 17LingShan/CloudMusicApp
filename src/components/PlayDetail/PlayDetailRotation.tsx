import { useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, View } from 'react-native'
import coverImg from '@/assets/cover.jpg'
import { SongType } from '@/mobx/types'
import playerStore from '@/mobx/player'
import { screenWidth } from '@/util/common'

function PlayDetailRotation({
  albumPicUrl
}: Pick<SongType.SongProps, 'albumPicUrl'>): JSX.Element {
  const imageWidth = screenWidth * 0.618
  const rotate = useRef(new Animated.Value(0)).current

  const rotateAni = useMemo(
    () => () => {
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
    },
    []
  )

  useEffect(() => {
    playerStore.isPlaying ? rotateAni() : rotate.stopAnimation()
  }, [playerStore.isPlaying])

  const rotateInterpolation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  return (
    <>
      <View>
        <Animated.Image
          style={{
            width: imageWidth,
            height: imageWidth,
            borderRadius: 99999,
            transform: [{ rotate: rotateInterpolation }]
          }}
          source={albumPicUrl.uri === '' ? coverImg : albumPicUrl}
        />
      </View>
    </>
  )
}

export default PlayDetailRotation
