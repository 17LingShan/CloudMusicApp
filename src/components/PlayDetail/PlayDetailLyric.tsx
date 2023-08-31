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
  const { position } = useProgress(500)
  const carouselRef = useRef<ICarouselInstance>(null)
  const [lrcIdx, setLrcIdx] = useState(0)

  const scrollToItem = (index: number): void => {
    console.log('scrollToItem', index)
    setLrcIdx(index)
    carouselRef.current?.scrollTo({ index: index, animated: true })
  }

  useEffect(() => {
    if (!lyric.length) return

    if (lrcIdx - 1 < lyric.length) {
      for (let reachIdx = lrcIdx; reachIdx - 1 < lyric.length; reachIdx++) {
        if (
          lyric[reachIdx]?.time <= position &&
          lyric[reachIdx + 1]?.time >= position
        ) {
          scrollToItem(reachIdx)
          break
        } else if (lyric[reachIdx + 1]?.time > position) {
          scrollToItem(0)
          break
        }
      }
    } else {
      scrollToItem(lyric.length - 1)
    }
  }, [position])

  useEffect(() => {
    setLrcIdx(0)
  }, [lyric])

  return (
    <>
      <View style={{ height: '100%', width: '100%' }}>
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
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 30,
                justifyContent: 'center'
              }}>
              <Text
                style={{
                  color:
                    lrcIdx === index
                      ? theme.colors.surface
                      : theme.colors.onSurface,
                  textAlign: 'center',
                  alignItems: 'center',
                  fontSize: lrcIdx === index ? 20 : 12,
                  maxWidth: screenWidth
                }}>
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
