import { View, StatusBar, Text, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { toJS } from 'mobx'
import ThemeStore from '@/mobx/theme'
import RippleIcon from '../RippleIcon'

function AlbumHeader(): JSX.Element {
  const navigation = useNavigation()

  return (
    <>
      <View
        style={{
          paddingTop: StatusBar.currentHeight + 10,
          backgroundColor: 'transparent'
        }}>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
            justifyContent: 'space-between'
          }}>
          <View>
            <RippleIcon
              iconName="chevron-left"
              color={ThemeStore.shadow}
              onPress={() => {
                Keyboard.dismiss()
                navigation.goBack()
              }}
            />
          </View>
          <View
            style={{
              width: 48,
              marginHorizontal: 12,
              alignItems: 'center'
            }}>
            <Text style={{ fontSize: 16, color: ThemeStore.shadow }}>搜索</Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default AlbumHeader
