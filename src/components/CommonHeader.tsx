import { View, StatusBar } from 'react-native'
import {
  useNavigation,
  DrawerActions,
  CommonActions
} from '@react-navigation/core'
import RippleIcon from './RippleIcon'
import { RippleIconType } from './types'
import { useTheme } from 'react-native-paper/src/core/theming'

function CommonHeader(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()

  const HeadOption: RippleIconType.RippleIconProps[] = [
    {
      iconName: 'menu',
      color: theme.colors.shadow,
      onPress: () => {
        navigation.dispatch(DrawerActions.openDrawer())
      }
    },
    {
      iconName: 'search',
      color: theme.colors.shadow,
      onPress: () => {
        navigation.dispatch(CommonActions.navigate('search'))
      }
    }
  ]

  return (
    <>
      <View style={{ paddingTop: StatusBar.currentHeight + 10 }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={{
            height: 48,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          {HeadOption.map((item, index) => {
            return (
              <RippleIcon
                key={index}
                color={item.color}
                iconName={item.iconName}
                onPress={item.onPress}
              />
            )
          })}
        </View>
      </View>
    </>
  )
}

export default CommonHeader
