import { useState } from 'react'
import { TextInput, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { observer } from 'mobx-react'
import searchStore from '@/mobx/searcher'
import RippleIcon from './RippleIcon'
import type { IconInputType } from './types'

function IconInput({
  iconName,
  onSubmit,
  placeholder,
  onIconPress
}: IconInputType.IconInputProps): JSX.Element {
  const theme = useTheme()
  const [backColor, setBackColor] = useState<string>('')

  const handleBlur = () => {
    searchStore.keywords.length > 0
      ? setBackColor('#c6c6d0')
      : setBackColor('transparent')
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
        value={searchStore.keywords}
        placeholder={placeholder ?? 'search'}
        style={{ width: '70%', overflow: 'hidden' }}
        onChangeText={text => searchStore.setKeywords(text)}
        onSubmitEditing={onSubmit}
        onFocus={() => setBackColor('#c6c6d0')}
        onBlur={() => handleBlur()}
      />
      <RippleIcon
        iconName={iconName}
        color={theme.colors.shadow}
        shown={searchStore.keywords.length > 0}
        onPress={onIconPress}
      />
    </View>
  )
}

export default observer(IconInput)
