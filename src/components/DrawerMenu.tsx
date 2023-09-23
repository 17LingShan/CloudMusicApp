import { useMemo } from 'react'
import { StatusBar, StyleSheet, Text } from 'react-native'
import { observer } from 'mobx-react'
import { Drawer } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation, CommonActions } from '@react-navigation/core'
import type { Props as DrawerItemProps } from 'react-native-paper/src/components/Drawer/DrawerItem'
import ThemeStore from '@/mobx/theme'
import { hexToRGB } from '@/util/common'

function DrawerMenu(): JSX.Element {
  const navigation = useNavigation()

  const DrawerMenuOption: DrawerItemProps[] = useMemo(
    () => [
      {
        label: 'Login',
        icon: () => (
          <Icon name="settings" size={24} color={ThemeStore.onSurface} />
        )
      },
      {
        label: 'Settings',
        icon: () => (
          <Icon name="settings" size={24} color={ThemeStore.onSurface} />
        )
      },
      {
        label: 'About',
        icon: () => (
          <Icon
            name="medical-information"
            size={24}
            color={ThemeStore.onSurface}
          />
        )
      }
    ],
    [ThemeStore.theme]
  )

  const handlePress = (label: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: label
      })
    )
  }

  return (
    <>
      <Drawer.Section
        title="CloudMusic"
        style={{
          ...style.drawerWrap,
          backgroundColor: `rgba(${hexToRGB(ThemeStore.surface)},0.3)`
        }}>
        {DrawerMenuOption.map((item, index) => {
          return (
            <Drawer.Item
              key={index}
              label={item.label}
              icon={item.icon}
              right={item.right}
              onPress={() => handlePress(item.label)}>
              <Text style={{ color: ThemeStore.surface }}>{item.label}</Text>
            </Drawer.Item>
          )
        })}
      </Drawer.Section>
    </>
  )
}

const style = StyleSheet.create({
  drawerWrap: { flex: 1, paddingTop: StatusBar.currentHeight + 10 }
})

export default observer(DrawerMenu)
