import { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useProgress } from 'react-native-track-player'
import ThemeStore from '@/mobx/theme'
import { SongType } from '@/mobx/types'
import { screenWidth } from '@/util/common'
import ListEmptyFooter from '../ListEmptyFooter'

function PlayDetailLyric({
  lyric
}: Pick<SongType.SongProps, 'lyric'>): JSX.Element {
  const { position } = useProgress(500)
  const flatListRef = useRef<FlatList<SongType.LyricItem>>(null)
  const [lrcIdx, setLrcIdx] = useState(0)

  const scrollToItem = (index: number): void => {
    setLrcIdx(index)
    flatListRef.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0.5
    })
  }

  const handleScrollLyric = (): void => {
    if (!lyric) return

    if (lrcIdx < lyric.length) {
      for (let reachIdx = lrcIdx; reachIdx < lyric.length; reachIdx++) {
        if (reachIdx + 1 === lyric.length) {
          scrollToItem(lyric.length - 1)
          break
        } else if (
          lyric[reachIdx]?.time <= position &&
          lyric[reachIdx + 1]?.time >= position
        ) {
          scrollToItem(reachIdx)
          break
        } else if (lyric[reachIdx]?.time > position) {
          scrollToItem(0)
          break
        }
      }
    }
  }

  useEffect(() => {
    handleScrollLyric()
  }, [position])

  useEffect(() => {
    setLrcIdx(0)
  }, [lyric])

  return (
    <>
      <View style={style.container}>
        <FlatList
          ref={flatListRef}
          data={lyric}
          // initialNumToRender={lyric?.length}
          ListHeaderComponent={() => <ListEmptyFooter />}
          ListFooterComponent={() => <ListEmptyFooter />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={style.renderItemContainer}>
              <Text
                style={{
                  ...style.renderItemText,
                  color:
                    lrcIdx === index
                      ? ThemeStore.detailSurface
                      : ThemeStore.detailOnSurface,
                  fontSize: lrcIdx === index ? 20 : 14
                }}>
                {item.text}
              </Text>
            </View>
          )}
          onScrollToIndexFailed={() => {}}
        />
      </View>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20
  },

  renderItemContainer: {
    minHeight: 36,
    marginVertical: 4
  },
  renderItemText: {
    lineHeight: 36,
    textAlign: 'center',
    alignItems: 'center',
    maxWidth: screenWidth
  }
})

export default PlayDetailLyric
