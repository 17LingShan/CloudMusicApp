import { Image, Text, View, Pressable, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import Carousel from 'react-native-reanimated-carousel'
import { useNavigation, CommonActions } from '@react-navigation/core'
import ThemeStore from '@/mobx/theme'
import { AlbumType } from '@/mobx/types'
import { hexToRGB, screenWidth } from '@/util/common'

function HotAlbumList({
  albumList
}: {
  albumList: AlbumType.AlbumList
}): JSX.Element {
  const navigation = useNavigation()

  return (
    <>
      <View
        style={{
          ...style.listWrap,
          backgroundColor: `rgba(${hexToRGB(ThemeStore.onSurface)},0.2)`
        }}>
        <View style={style.hotTextContainer}>
          <Text
            style={{
              ...style.hotText,
              color: ThemeStore.surface
            }}>
            热门歌单
          </Text>
        </View>
        <Carousel
          height={screenWidth * 0.4}
          width={screenWidth * 0.4}
          style={{ width: screenWidth, overflow: 'visible' }}
          data={albumList}
          loop={false}
          overscrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate({ name: 'Album', params: item })
                )
              }>
              <View style={style.itemWrap}>
                <Image
                  style={style.itemImg}
                  source={{ uri: item.coverImgUrl + '?param=500y500' }}
                />
                <View>
                  <View style={style.itemTextContainer}>
                    <Text
                      numberOfLines={2}
                      style={{ color: ThemeStore.surface }}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </>
  )
}

const style = StyleSheet.create({
  listWrap: { height: '100%' },
  hotTextContainer: {
    height: screenWidth * 0.15,
    paddingHorizontal: screenWidth * 0.08
  },
  hotText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '900',
    fontSize: 20,
    lineHeight: screenWidth * 0.15
  },
  itemWrap: { paddingHorizontal: 10 },
  itemImg: { height: '100%', borderRadius: 13 },
  itemTextContainer: {
    position: 'absolute',
    width: '100%',
    bottom: -screenWidth * 0.1
  }
})

export default observer(HotAlbumList)
