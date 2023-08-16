import { useNavigation, DrawerActions } from '@react-navigation/core'
import { View, StatusBar, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RippleIcon from './RippleIcon'

function HeadDrawer(): JSX.Element {
  const navigation = useNavigation()
  const StatusBarH = StatusBar.currentHeight

  return (
    <>
      <View
        style={{
          marginTop: StatusBarH,
          height: 48,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        <RippleIcon
          name={'grip-lines'}
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer())
          }}></RippleIcon>
        <RippleIcon name={'search'} onPress={() => {}}></RippleIcon>
      </View>
    </>
  )
}

export default HeadDrawer
