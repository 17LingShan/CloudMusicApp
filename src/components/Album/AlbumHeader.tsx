import { View, StatusBar, Text, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import RippleIcon from '../RippleIcon'
import IconInput from '../IconInput'

function AlbumHeader(): JSX.Element {
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
            <Text style={{ fontSize: 16 }}>搜索</Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default AlbumHeader
