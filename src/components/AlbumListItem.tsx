import { AlbumType } from '@/mobx/types'
import { Image, Text, View } from 'react-native'

function AlbumListItem({
  albumInfo
}: {
  albumInfo: AlbumType.AlbumProps
}): JSX.Element {
  return (
    <>
      <View style={{ width: '100%', height: 60, backgroundColor: 'red' }}>
        <View
          style={{
            height: '100%',
            paddingHorizontal: 5,
            flexDirection: 'row'
          }}>
          <View style={{ width: 60, height: '100%' }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{ uri: albumInfo.coverImgUrl + '?param=500y500' }}
            />
          </View>
        </View>
      </View>
    </>
  )
}

export default AlbumListItem
