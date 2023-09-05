import { Image, StyleSheet, Text, View } from 'react-native'
import { AlbumType } from '@/mobx/types'
import { hexToRGB } from '@/util/common'

function AlbumListItem({
  position,
  albumInfo,
  itemColor
}: {
  position: number
  albumInfo: AlbumType.AlbumProps
  itemColor: {
    containerColor: string
    nameColor: string
    countColor: string
  }
}): JSX.Element {
  return (
    <>
      <View
        style={{
          ...style.wrap,
          borderTopLeftRadius: position ? 0 : 20,
          borderTopRightRadius: position ? 0 : 20,
          backgroundColor: `rgba(${hexToRGB(itemColor.containerColor)},0.2)`
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
              style={{ ...style.nameStyle, color: itemColor.nameColor }}>
              {albumInfo.name}
            </Text>
            <Text style={{ ...style.countStyle, color: itemColor.countColor }}>
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
    height: '100%'
  },
  infoWrap: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: '1%',
    paddingHorizontal: '5%'
  },
  nameStyle: {
    fontSize: 18
  },
  countStyle: {
    fontSize: 16
  }
})

export default AlbumListItem
