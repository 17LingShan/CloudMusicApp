import { View, StatusBar } from 'react-native'
import {
  useNavigation,
  DrawerActions,
  CommonActions
} from '@react-navigation/core'
import RippleIcon from './RippleIcon'
import { RippleIconType } from './types'

function CommonHeader(): JSX.Element {
  const navigation = useNavigation()

  const HeadOption: RippleIconType.RippleIconProps[] = [
    {
      iconName: 'menu',
      onPress: () => {
        navigation.dispatch(DrawerActions.openDrawer())
      }
    },
    {
      iconName: 'search',
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
