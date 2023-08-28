import { View, StatusBar, Text, Keyboard } from 'react-native'
import { observer } from 'mobx-react'
import { useNavigation } from '@react-navigation/core'
import { useTheme } from 'react-native-paper'
import RippleIcon from './RippleIcon'
import IconInput from './IconInput'

function SearchHeader({ handleSearch, onIconPress }): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <>
      <View style={{ paddingTop: StatusBar.currentHeight + 10 }}>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
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
          <IconInput
            iconName="close"
            onSubmit={() => handleSearch()}
            onIconPress={onIconPress}
          />
          <View
            style={{
              width: 48,
              marginHorizontal: 12,
              alignItems: 'center'
            }}>
            <Text
              style={{ fontSize: 16, color: theme.colors.shadow }}
              onPress={() => handleSearch()}>
              搜索
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default SearchHeader
