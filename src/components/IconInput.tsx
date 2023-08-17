import { TextInput, View } from 'react-native'
import RippleIcon from './RippleIcon'
import type { IconInputType } from './types'
import { useState, useEffect } from 'react'

function IconInput({
  iconName,
  value,
  change,
  onIconPress
}: IconInputType.IconInputProps): JSX.Element {
  const [backColor, setBackColor] = useState<string>('')
  const [iconShown, setIconShown] = useState<boolean>(true)
  useEffect(() => {
    value.length > 0 ? setIconShown(true) : setIconShown(false)
  }, [value])

  const handleBlur = () => {
    console.log(iconShown)
    iconShown ? setBackColor('#c6c6d0') : setBackColor('transparent')
  }

  return (
    <View
      style={{
        width: '60%',
        height: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 24,
        paddingLeft: 24,
        backgroundColor: backColor,
        overflow: 'hidden'
      }}>
      <TextInput
        value={value}
        placeholder="search"
        style={{ maxWidth: '70%', overflow: 'hidden' }}
        onChangeText={change}
        onFocus={() => setBackColor('#c6c6d0')}
        onBlur={() => handleBlur()}
      />
      <RippleIcon iconName={iconName} shown={iconShown} onPress={onIconPress} />
    </View>
  )
}

export default IconInput
