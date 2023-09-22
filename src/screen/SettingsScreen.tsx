import { Text, View } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { observer } from 'mobx-react'
import ThemeStore from '@/mobx/theme'
import { changeTheme, hexToRGB, screenHeight, screenWidth } from '@/util/common'

function SettingsScreen(): JSX.Element {
  return (
    <>
      <View
        style={{
          flex: 1,
          paddingVertical: screenHeight * 0.05,
          paddingHorizontal: screenWidth * 0.05
        }}>
        <View
          style={{
            height: screenHeight * 0.1,
            paddingHorizontal: screenWidth * 0.05,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: `rgba(${hexToRGB(ThemeStore.surface)},0.2)`
          }}>
          <Text
            style={{
              height: '100%',
              color: ThemeStore.surface,
              verticalAlign: 'middle',
              fontSize: 18
            }}>
            深色主题
          </Text>
          <Checkbox
            status={ThemeStore.theme === 'dark' ? 'checked' : 'unchecked'}
            onPress={() => {
              changeTheme()
            }}
          />
        </View>
      </View>
    </>
  )
}

export default observer(SettingsScreen)
