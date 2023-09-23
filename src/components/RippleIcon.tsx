import { StyleSheet, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ThemeStore from '@/mobx/theme'
import type { RippleIconType } from './types'

function RippleIcon({
  iconName,
  color,
  shown = true,
  onPress
}: RippleIconType.RippleIconProps): JSX.Element {
  return (
    <>
      <View style={{ ...style.iconWrap, display: shown ? 'flex' : 'none' }}>
        <TouchableRipple
          onPress={onPress}
          style={style.touchContainer}
          rippleColor="rgba(0, 0, 0, .32)">
          <Icon name={iconName} color={color || ThemeStore.surface} size={24} />
        </TouchableRipple>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginHorizontal: 8,
    overflow: 'hidden'
  },
  touchContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default RippleIcon
