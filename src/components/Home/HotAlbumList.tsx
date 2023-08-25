import { Image, Text, View, Pressable, useWindowDimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useNavigation, CommonActions } from '@react-navigation/core'
import { AlbumType } from '@/jotai/types'

function HotAlbumList({
  albumList
}: {
  albumList: AlbumType.AlbumList
}): JSX.Element {
  const width = useWindowDimensions().width

  const navigation = useNavigation()

  return (
    <>
      <View style={{ height: '100%' }}>
        <Carousel
          defaultIndex={0}
          loop={false}
          height={width / 2.5}
          width={width / 2.5}
          style={{ width: width, overflow: 'visible' }}
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
                  source={{ uri: item.coverImgUrl + '?param=300y300' }}
                  style={{ height: '100%', borderRadius: 13 }}
                />
                <View>
                  <View
                    style={{
                      position: 'absolute',
                      width: '100%',
                      bottom: -width * 0.1
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
