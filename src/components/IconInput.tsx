import { TextInput, View } from 'react-native'
import RippleIcon from './RippleIcon'
import type { IconInputType } from './types'
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { SearchKeywordsAtom } from '@/jotai/searcher'

function IconInput({
  iconName,
  onSubmit,
  placeholder,
  onIconPress
}: IconInputType.IconInputProps): JSX.Element {
  const [keywords, setKeywords] = useAtom(SearchKeywordsAtom)
  const [backColor, setBackColor] = useState<string>('')
  const [iconShown, setIconShown] = useState<boolean>(true)
  useEffect(() => {
    keywords.length > 0 ? setIconShown(true) : setIconShown(false)
  }, [keywords])

  const handleBlur = () => {
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
        value={keywords}
        placeholder={placeholder ?? 'search'}
        style={{ width: '70%', overflow: 'hidden' }}
        onChangeText={text => setKeywords(text)}
        onSubmitEditing={onSubmit}
        onFocus={() => setBackColor('#c6c6d0')}
        onBlur={() => handleBlur()}
      />
      <RippleIcon iconName={iconName} shown={iconShown} onPress={onIconPress} />
    </View>
  )
}

export default IconInput
