import { View, StatusBar, StyleSheet } from 'react-native'
import {
  useNavigation,
  DrawerActions,
  CommonActions
} from '@react-navigation/core'
import { screenHeight } from '@/util/common'
import ThemeStore from '@/mobx/theme'
import RippleIcon from './RippleIcon'
import { RippleIconType } from './types'

function CommonHeader(): JSX.Element {
  const navigation = useNavigation()

  const HeadOption: RippleIconType.RippleIconProps[] = [
    {
      iconName: 'menu',
      color: ThemeStore.surface,
      onPress: () => {
        navigation.dispatch(DrawerActions.openDrawer())
      }
    },
    {
      iconName: 'search',
      color: ThemeStore.surface,
      onPress: () => {
        navigation.dispatch(CommonActions.navigate('search'))
      }
    }
  ]

  return (
    <>
      <View
        style={{
          paddingTop: StatusBar.currentHeight + 10
        }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={style.headerContainer}>
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

const style = StyleSheet.create({
  headerContainer: {
    height: screenHeight * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default CommonHeader
