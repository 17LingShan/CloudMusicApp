import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useTheme } from 'react-native-paper'
import { addTrackToNext, removeTrack } from '@/util/playTool'
import { SongType } from '@/mobx/types'
import { screenHeight } from '@/util/common'

function ModalItem({
  trackInfo
}: {
  trackInfo: SongType.SongProps
}): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <>
      <View
        style={{
          height: screenHeight * 0.3,
          padding: 20,
          backgroundColor: theme.colors.background,
          borderRadius: 36
        }}>
        <View
          style={{
            height: '100%',
            paddingHorizontal: 20,
            borderRadius: 24,
            backgroundColor: theme.colors.shadow
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
                  color: theme.colors.surface
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
                  color: theme.colors.surface
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
