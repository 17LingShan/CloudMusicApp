import { useMemo } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import {
  useNavigation,
  DrawerActions,
  CommonActions
} from '@react-navigation/core'
import { observer } from 'mobx-react'
import ThemeStore from '@/mobx/theme'
import RippleIcon from './RippleIcon'
import { RippleIconType } from './types'
import { screenHeight } from '@/util/common'

function CommonHeader(): JSX.Element {
  const navigation = useNavigation()

  const HeadOption: RippleIconType.RippleIconProps[] = useMemo(
    () => [
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
          navigation.dispatch(CommonActions.navigate('Search'))
        }
      }
    ],
    [ThemeStore.theme]
  )

  return (
    <>
      <View style={style.headerWrap}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle={`${
            ThemeStore.theme === 'light' ? 'dark-content' : 'light-content'
          }`}
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
  headerWrap: { paddingTop: StatusBar.currentHeight + 10 },
  headerContainer: {
    height: screenHeight * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default observer(CommonHeader)
