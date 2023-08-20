import AlbumHeader from '@/components/AlbumHeader'
import { AlbumType } from '@/jotai/types'
import { useRoute } from '@react-navigation/core'
import { Image, Text, View } from 'react-native'

function AlbumScreen(): JSX.Element {
  const { params } = useRoute() as { params: AlbumType.AlbumProps }
  console.log(params)
  return (
    <>
      <View>
        <AlbumHeader />
        <View
          style={{
            height: 210,
            backgroundColor: 'red',
            paddingHorizontal: 10
          }}>
          <View
            style={{
              height: '70%',
              marginTop: 5,
              backgroundColor: 'blue',
              flexDirection: 'row'
            }}>
            <View
              style={{
                width: '40%',
                backgroundColor: 'green',
                height: '100%'
              }}>
              <Image
                style={{ height: '100%', borderRadius: 30 }}
                source={{
                  uri: params.coverImgUrl + '?param=300y300'
                }}></Image>
            </View>
            <View style={{ width: '60%', padding: 8 }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 16,
                  overflow: 'hidden',
                  backgroundColor: 'pink'
                }}>
                {params.name}
              </Text>
            </View>
            <View></View>
          </View>
          <View></View>
        </View>
      </View>
    </>
  )
}

export default AlbumScreen
