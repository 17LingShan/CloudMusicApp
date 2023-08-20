import { View, StatusBar, Text } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import RippleIcon from './RippleIcon'
import IconInput from './IconInput'

function AlbumHeader(): JSX.Element {
  const navigation = useNavigation()

  return (
    <>
      <View>
        <View
          style={{
            height: 60,
            marginTop: StatusBar.currentHeight + 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <View>
            <RippleIcon
              iconName="chevron-left"
              onPress={() => navigation.goBack()}
            />
          </View>
          <IconInput iconName="close" placeholder="搜索歌单内歌曲" />
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
