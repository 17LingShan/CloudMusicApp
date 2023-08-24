import { View } from 'react-native'
import { TouchableRipple, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import type { RippleIconType } from './types'

function RippleIcon({
  iconName,
  color,
  shown = true,
  onPress
}: RippleIconType.RippleIconProps): JSX.Element {
  const theme = useTheme()
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
          <Icon
            name={iconName}
            color={color || theme.colors.surface}
            size={24}></Icon>
        </TouchableRipple>
      </View>
    </>
  )
}

export default RippleIcon
