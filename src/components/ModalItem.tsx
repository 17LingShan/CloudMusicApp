import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { observer } from 'mobx-react'
import { useNavigation } from '@react-navigation/core'
import ThemeStore from '@/mobx/theme'
import { SongType } from '@/mobx/types'
import { screenHeight } from '@/util/common'
import { addTrackToNext, removeTrack } from '@/util/playTool'

function ModalItem({
  trackInfo
}: {
  trackInfo: SongType.SongProps
}): JSX.Element {
  const navigation = useNavigation()

  const ModalItemOption = [
    {
      text: '下一首播放',
      onPress: () => {
        addTrackToNext(trackInfo)
        navigation.goBack()
      }
    },
    {
      text: '移除',
      onPress: () => {
        removeTrack(trackInfo)
        navigation.goBack()
      }
    }
  ]

  return (
    <>
      <View
        style={{
          ...style.modalWrap,
          backgroundColor: ThemeStore.detailSurface
        }}>
        <View
          style={{
            ...style.modalContainer,
            backgroundColor: ThemeStore.detailBackground
          }}>
          {ModalItemOption.map((item, index) => {
            return (
              <View key={index} style={style.itemWrap}>
                <TouchableOpacity onPress={item.onPress}>
                  <Text
                    style={{
                      ...style.itemText,
                      color: ThemeStore.detailSurface
                    }}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  modalWrap: { height: screenHeight * 0.35, padding: 20, borderRadius: 36 },
  modalContainer: { height: '100%', paddingHorizontal: 20, borderRadius: 24 },
  itemWrap: { height: '25%' },
  itemText: { height: '100%', textAlignVertical: 'center', fontSize: 18 }
})

export default observer(ModalItem)
