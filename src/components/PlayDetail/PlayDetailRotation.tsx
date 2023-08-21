import { useEffect, useMemo, useState } from 'react'
import { Animated, Dimensions, Easing, View } from 'react-native'
import coverImg from '@/assets/cover.jpg'
import { SongType } from '@/jotai/types'
import { isPlayingAtom } from '@/jotai/player'
import { useAtom } from 'jotai'

function PlayDetailRotation({
  albumPicUrl
}: Pick<SongType.SongProps, 'albumPicUrl'>): JSX.Element {
  const screenWidth = Dimensions.get('window').width * 0.618
  const [currentAni, setCurrentAni] = useState<number>(0)
  const [isPlaying, _] = useAtom(isPlayingAtom)

  const rotate = useMemo(() => new Animated.Value(0), [])

  const rotateAni = useMemo(
    () =>
      Animated.loop(
        Animated.timing(rotate, {
          toValue: 1,
          duration: 24000,
          useNativeDriver: false,
          easing: Easing.linear
        })
      ),
    []
  )

  useEffect(() => {
    isPlaying ? rotateAni.start() : rotate.stopAnimation()
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
