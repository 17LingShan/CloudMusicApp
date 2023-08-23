import { useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, View, useWindowDimensions } from 'react-native'
import { useAtomValue } from 'jotai'
import coverImg from '@/assets/cover.jpg'
import { SongType } from '@/jotai/types'
import { isPlayingAtom, useTrackPlayer } from '@/jotai/player'

function PlayDetailRotation({
  albumPicUrl
}: Pick<SongType.SongProps, 'albumPicUrl'>): JSX.Element {
  const screenWidth = useWindowDimensions().width * 0.618
  // const isPlaying = useAtomValue(isPlayingAtom)
  const { isPlaying } = useTrackPlayer()
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
    isPlaying ? rotateAni() : rotate.stopAnimation()
  }, [isPlaying])

  const rotateInterpolation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  return (
    <>
      <View
        style={{
          height: '70%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Animated.Image
          style={{
            width: screenWidth,
            height: screenWidth,
            borderRadius: 99999,
            transform: [{ rotate: rotateInterpolation }]
          }}
          source={albumPicUrl ?? coverImg}
        />
      </View>
    </>
  )
}

export default PlayDetailRotation
