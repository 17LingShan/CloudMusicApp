import { AlbumType } from '@/mobx/types'
import { Image, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AlbumTitleButton from './AlbumTItleButton'
import ThemeStore from '@/mobx/theme'

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
              style={{ height: '100%', borderRadius: 24 }}
              source={{ uri: albumInfo.coverImgUrl + '?param=500y500' }}
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
                style={{
                  width: '100%',
                  fontSize: 22,
                  overflow: 'hidden',
                  color: ThemeStore.surface
                }}>
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
                  source={{ uri: albumInfo.avatarUrl + '?param=500y500' }}
                />
              </View>
              <View
                style={{
                  maxWidth: '60%',
                  marginLeft: 10,
                  justifyContent: 'center'
                }}>
                <Text
                  style={{ width: '100%', color: ThemeStore.surface }}
                  numberOfLines={1}>
                  {albumInfo.nickname}
                </Text>
              </View>
              <View style={{ marginLeft: 2 }}>
                <Icon
                  name="arrow-forward-ios"
                  size={14}
                  color={ThemeStore.surface}
                />
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
          <AlbumTitleButton icon="share" count={albumInfo.shareCount || 0} />
          <AlbumTitleButton
            icon="comment"
            count={albumInfo.commentCount || 0}
          />
          <AlbumTitleButton
            icon="add-card"
            count={albumInfo.subscribedCount || 0}
          />
        </View>
      </View>
    </>
  )
}

export default AlbumTitle
