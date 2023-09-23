import { StyleSheet, Text, View } from 'react-native'
import { observer } from 'mobx-react'
import { Checkbox } from 'react-native-paper'
import ThemeStore from '@/mobx/theme'
import { changeTheme, hexToRGB, screenHeight, screenWidth } from '@/util/common'

function SettingsScreen(): JSX.Element {
  return (
    <>
      <View style={style.settingWrap}>
        <View
          style={{
            ...style.settingContainer,
            backgroundColor: `rgba(${hexToRGB(ThemeStore.surface)},0.2)`
          }}>
          <Text style={{ ...style.settingText, color: ThemeStore.surface }}>
            深色主题
          </Text>
          <Checkbox
            color={ThemeStore.primary}
            status={ThemeStore.theme === 'dark' ? 'checked' : 'unchecked'}
            onPress={() => changeTheme()}
          />
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  settingWrap: {
    flex: 1,
    paddingVertical: screenHeight * 0.05,
    paddingHorizontal: screenWidth * 0.05
  },
  settingContainer: {
    height: screenHeight * 0.1,
    paddingHorizontal: screenWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  settingText: {
    height: '100%',
    verticalAlign: 'middle',
    fontSize: 18
  }
})

export default observer(SettingsScreen)
