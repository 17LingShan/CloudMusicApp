import { Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'

function RippleIcon({ name, onPress }): JSX.Element {
  return (
    <>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          margin: 8,
          overflow: 'hidden'
        }}>
        <TouchableRipple
          onPress={onPress}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          rippleColor="rgba(0, 0, 0, .32)">
          <Icon name={name} size={24}></Icon>
        </TouchableRipple>
      </View>
    </>
  )
}

export default RippleIcon
