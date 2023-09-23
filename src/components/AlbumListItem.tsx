import { Image, StyleSheet, Text, View } from 'react-native'
import { observer } from 'mobx-react'
import ThemeStore from '@/mobx/theme'
import { AlbumType } from '@/mobx/types'
import { hexToRGB } from '@/util/common'

function AlbumListItem({
  position,
  albumInfo
}: {
  position: number
  albumInfo: AlbumType.AlbumProps
}): JSX.Element {
  return (
    <>
      <View
        style={{
          ...style.wrap,
          borderTopLeftRadius: position ? 0 : 20,
          borderTopRightRadius: position ? 0 : 20,
          backgroundColor: `rgba(${hexToRGB(ThemeStore.surface)},0.2)`
        }}>
        <View style={style.container}>
          <View style={style.imgWrap}>
            <Image
              style={style.imgContainer}
              source={{ uri: albumInfo.coverImgUrl + '?param=500y500' }}
            />
          </View>
          <View style={style.infoWrap}>
            <Text
              numberOfLines={1}
              style={{ ...style.nameStyle, color: ThemeStore.surface }}>
              {albumInfo.name}
            </Text>
            <Text style={{ ...style.countStyle, color: ThemeStore.surface }}>
              {`${albumInfo.trackCount}首`}
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 70,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    flexDirection: 'row'
  },
  imgWrap: {
    width: 60,
    height: '100%'
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 6
  },
  infoWrap: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: '1%',
    paddingHorizontal: '5%'
  },
  nameStyle: {
    fontSize: 16,
    lineHeight: 30
  },
  countStyle: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 30
  }
})

export default observer(AlbumListItem)
