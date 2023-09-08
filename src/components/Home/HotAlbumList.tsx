import { Image, Text, View, Pressable } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/core'
import { useTheme } from 'react-native-paper'
import Carousel from 'react-native-reanimated-carousel'
import { hexToRGB, screenWidth } from '@/util/common'
import { AlbumType } from '@/mobx/types'

function HotAlbumList({
  albumList
}: {
  albumList: AlbumType.AlbumList
}): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <>
      <View
        style={{
          height: '100%',
          backgroundColor: `rgba(${hexToRGB(theme.colors.surface)},0.2)`
        }}>
        <View
          style={{
            height: screenWidth * 0.15,
            paddingHorizontal: screenWidth * 0.08
          }}>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: '900',
              fontSize: 20,
              color: theme.colors.background,
              lineHeight: screenWidth * 0.15
            }}>
            热门歌单
          </Text>
        </View>
        <Carousel
          height={screenWidth * 0.4}
          width={screenWidth * 0.4}
          style={{ width: screenWidth, overflow: 'visible' }}
          data={albumList}
          overscrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate({ name: 'album', params: item })
                )
              }>
              <View
                style={{
                  paddingHorizontal: 10
                }}>
                <Image
                  source={{ uri: item.coverImgUrl + '?param=500y500' }}
                  style={{ height: '100%', borderRadius: 13 }}
                />
                <View>
                  <View
                    style={{
                      position: 'absolute',
                      width: '100%',
                      bottom: -screenWidth * 0.1
                    }}>
                    <Text numberOfLines={2}>{item.name}</Text>
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

export default HotAlbumList
