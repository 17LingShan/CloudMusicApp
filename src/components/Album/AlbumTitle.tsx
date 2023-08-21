import { AlbumType } from '@/jotai/types'
import { Image, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AlbumTitleButton from './AlbumTItleButton'

function AlbumTitle({
  albumInfo
}: {
  albumInfo: AlbumType.AlbumProps
}): JSX.Element {
  return (
    <>
      <View style={{ height: 200, padding: 8, overflow: 'hidden' }}>
        <View
          style={{
            height: '60%',
            marginTop: 5,
            flexDirection: 'row'
          }}>
          <View style={{ width: '30%' }}>
            <Image
              style={{ height: '100%', borderRadius: 30 }}
              source={{ uri: albumInfo.coverImgUrl }}
            />
          </View>
          <View
            style={{
              width: '65%',
              marginLeft: 6,
              paddingHorizontal: 12
            }}>
            <View>
              <Text
                numberOfLines={2}
                style={{ width: '100%', fontSize: 22, overflow: 'hidden' }}>
                {albumInfo.name}
              </Text>
            </View>
            <View
              style={{
                height: '25%',
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                paddingHorizontal: 8
              }}>
              <View style={{ height: '100%', width: '15%' }}>
                <Image
                  style={{ height: '100%', width: '100%', borderRadius: 35 }}
                  source={{ uri: albumInfo.avatarUrl }}
                />
              </View>
              <View
                style={{
                  maxWidth: '60%',
                  marginLeft: 10,
                  justifyContent: 'center'
                }}>
                <Text style={{ width: '100%' }} numberOfLines={1}>
                  {albumInfo.nickname}
                </Text>
              </View>
              <View style={{ marginLeft: 2 }}>
                <Icon name="arrow-forward-ios" size={14} />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            height: '30%',
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <AlbumTitleButton icon="share" count={albumInfo.shareCount} />
          <AlbumTitleButton icon="comment" count={albumInfo.commentCount} />
          <AlbumTitleButton icon="add-card" count={albumInfo.subscribedCount} />
        </View>
      </View>
    </>
  )
}

export default AlbumTitle
