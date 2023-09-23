import { AlbumType } from '@/mobx/types'
import { Image, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ThemeStore from '@/mobx/theme'
import AlbumTitleButton from './AlbumTItleButton'

function AlbumTitle({
  albumInfo
}: {
  albumInfo: AlbumType.AlbumProps
}): JSX.Element {
  return (
    <>
      <View style={style.titleWrap}>
        <View style={style.titleContainer}>
          <View style={style.imgWrap}>
            <Image
              style={style.imgStyle}
              source={{ uri: albumInfo.coverImgUrl + '?param=500y500' }}
            />
          </View>
          <View style={style.descriptionWrap}>
            <View>
              <Text
                numberOfLines={2}
                style={{
                  ...style.albumNameStyle,
                  color: ThemeStore.surface
                }}>
                {albumInfo.name}
              </Text>
            </View>
            <View style={style.userContainer}>
              <View style={style.avatarContainer}>
                <Image
                  style={style.avatarStyle}
                  source={{ uri: albumInfo.avatarUrl + '?param=500y500' }}
                />
              </View>
              <View style={style.nicknameContainer}>
                <Text
                  style={{ ...style.nicknameText, color: ThemeStore.surface }}
                  numberOfLines={1}>
                  {albumInfo.nickname}
                </Text>
              </View>
              <View style={style.userIcon}>
                <Icon
                  name="arrow-forward-ios"
                  size={14}
                  color={ThemeStore.surface}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={style.buttonWrap}>
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

const style = StyleSheet.create({
  titleWrap: { height: 200, padding: 8, overflow: 'hidden' },
  titleContainer: {
    height: '60%',
    marginTop: 5,
    flexDirection: 'row'
  },
  imgWrap: { width: '30%' },
  imgStyle: { height: '100%', borderRadius: 24 },
  descriptionWrap: { width: '65%', marginLeft: 6, paddingHorizontal: 12 },
  albumNameStyle: { width: '100%', fontSize: 22, overflow: 'hidden' },
  userContainer: {
    height: '25%',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 8
  },
  avatarContainer: { height: '100%', width: '15%' },
  avatarStyle: { height: '100%', width: '100%', borderRadius: 35 },
  nicknameContainer: {
    maxWidth: '60%',
    marginLeft: 10,
    justifyContent: 'center'
  },
  nicknameText: { width: '100%' },
  userIcon: { marginLeft: 2 },
  buttonWrap: {
    height: '30%',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default AlbumTitle
