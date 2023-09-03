import { StatusBar, Text } from 'react-native'
import { Drawer } from 'react-native-paper'
import { useNavigation, CommonActions } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/MaterialIcons'
import type { Props as DrawerItemProps } from 'react-native-paper/src/components/Drawer/DrawerItem'

const DrawerMenuOption: DrawerItemProps[] = [
  {
    label: 'login',
    icon: () => <Icon name="settings" size={24} />
  },
  {
    label: 'settings',
    icon: () => <Icon name="settings" size={24} />,
    right: () => <Text>213</Text>
  },
  {
    label: 'about',
    icon: () => <Icon name="medical-information" size={24} />
  }
]

function DrawerMenu(): JSX.Element {
  const navigation = useNavigation()

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
        style={{ paddingTop: StatusBar.currentHeight + 10 }}>
        {DrawerMenuOption.map((item, index) => {
          return (
            <Drawer.Item
              key={index}
              label={item.label}
              icon={item.icon}
              right={item.right}
              onPress={() => handlePress(item.label)}>
              {item.label}
            </Drawer.Item>
          )
        })}
      </Drawer.Section>
    </>
  )
}

export default DrawerMenu
