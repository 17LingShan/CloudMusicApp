import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { addTrackToNext, removeTrack } from '@/util/playTool'
import { SongType } from '@/mobx/types'
import { screenHeight } from '@/util/common'
import ThemeStore from '@/mobx/theme'

function ModalItem({
  trackInfo
}: {
  trackInfo: SongType.SongProps
}): JSX.Element {
  const navigation = useNavigation()

  return (
    <>
      <View
        style={{
          height: screenHeight * 0.35,
          padding: 20,
          backgroundColor: ThemeStore.background,
          borderRadius: 36
        }}>
        <View
          style={{
            height: '100%',
            paddingHorizontal: 20,
            borderRadius: 24,
            backgroundColor: ThemeStore.surface
          }}>
          <View
            style={{
              height: '25%'
            }}>
            <TouchableOpacity
              onPress={() => {
                addTrackToNext(trackInfo)
                navigation.goBack()
              }}>
              <Text
                style={{
                  height: '100%',
                  textAlignVertical: 'center',
                  fontSize: 18,
                  color: ThemeStore.surface
                }}>
                下一首播放
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '25%'
            }}>
            <TouchableOpacity
              onPress={() => {
                removeTrack(trackInfo)
                navigation.goBack()
              }}>
              <Text
                style={{
                  height: '100%',
                  textAlignVertical: 'center',
                  fontSize: 18,
                  color: ThemeStore.surface
                }}>
                移除
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

export default ModalItem
