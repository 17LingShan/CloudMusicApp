import { View, StatusBar, Text, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import RippleIcon from '../RippleIcon'
import { useTheme } from 'react-native-paper/src/core/theming'

function AlbumHeader(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <>
      <View
        style={{
          paddingTop: StatusBar.currentHeight + 10,
          backgroundColor: 'transparent'
        }}>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
            justifyContent: 'space-between'
          }}>
          <View>
            <RippleIcon
              iconName="chevron-left"
              color={theme.colors.shadow}
              onPress={() => {
                Keyboard.dismiss()
                navigation.goBack()
              }}
            />
          </View>
          <View
            style={{
              width: 48,
              marginHorizontal: 12,
              alignItems: 'center'
            }}>
            <Text style={{ fontSize: 16, color: theme.colors.shadow }}>
              搜索
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default AlbumHeader
