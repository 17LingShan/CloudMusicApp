import { Animated, Button, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper/src/core/theming'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { SongType } from '@/mobx/types'
import { screenWidth } from '@/util/common'
import { useEffect, useRef, useState } from 'react'
import { useProgress } from 'react-native-track-player'

function PlayDetailLyric({
  lyric
}: Pick<SongType.SongProps, 'lyric'>): JSX.Element {
  const theme = useTheme()
  const { position } = useProgress()
  const [idx, setIdx] = useState(1)
  const carouselRef = useRef<ICarouselInstance>(null)

  const scrollToItem = (index: number) => {
    console.log(index)
    carouselRef.current?.scrollTo({ index: index })
  }
  useEffect(() => {
    // console.log(position)
  }, [position])
  return (
    <>
      <View style={{ height: '100%', width: '100%' }}>
        <Button
          title="scrollToItem + 1"
          onPress={() => {
            scrollToItem(idx)
            setIdx(prev => prev + 1)
          }}></Button>
        <Carousel
          ref={carouselRef}
          loop={false}
          height={30}
          style={{
            height: screenWidth * 1.3,
            justifyContent: 'center',
            alignContent: 'center'
          }}
          onProgressChange={() => {}}
          vertical={true}
          data={lyric}
          renderItem={({ item }) => (
            <View
              style={{
                height: 30,
                justifyContent: 'center'
              }}>
              <Text
                style={{ color: theme.colors.surface, textAlign: 'center' }}>
                {item.text}
              </Text>
            </View>
          )}
        />
      </View>
    </>
  )
}

export default PlayDetailLyric
