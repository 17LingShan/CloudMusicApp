import { View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import type { RippleIconType } from './types'

function RippleIcon({
  iconName,
  shown = true,
  onPress
}: RippleIconType.RippleIconProps): JSX.Element {
  return (
    <>
      <View
        style={{
          display: shown ? 'flex' : 'none',
          width: 48,
          height: 48,
          borderRadius: 24,
          marginHorizontal: 8,
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
          <Icon name={iconName} size={24}></Icon>
        </TouchableRipple>
      </View>
    </>
  )
}

export default RippleIcon
