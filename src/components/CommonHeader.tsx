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
      <View
        style={{
          marginTop: StatusBar.currentHeight + 10,
          height: 48,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
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
    </>
  )
}

export default CommonHeader
