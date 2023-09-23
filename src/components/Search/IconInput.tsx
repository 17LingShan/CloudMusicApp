import { useState } from 'react'
import { ColorValue, TextInput, View } from 'react-native'
import { observer } from 'mobx-react'
import ThemeStore from '@/mobx/theme'
import RippleIcon from '../RippleIcon'
import { hexToRGB } from '@/util/common'
import SearchStore from '@/mobx/searcher'
import type { IconInputType } from '../types'

function IconInput({
  iconName,
  onSubmit,
  placeholder,
  onIconPress
}: IconInputType.IconInputProps): JSX.Element {
  const [backColor, setBackColor] = useState<ColorValue>('transparent')

  const handleFocus = () => {
    SearchStore.setIsInputFocus(true)
    setBackColor(`rgba(${hexToRGB(ThemeStore.focus)},0.5)`)
  }

  const handleTyping = (text: string) => {
    SearchStore.setKeywords(text)
  }

  const handleOnSearch = (text: string) => {
    SearchStore.setKeywords(text)
  }

  const handleBlur = () => {
    SearchStore.setIsInputFocus(false)
    SearchStore.keywords.length > 0
      ? setBackColor(`rgba(${hexToRGB(ThemeStore.focus)},0.5)`)
      : setBackColor('transparent')
  }

  return (
    <>
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
          value={SearchStore.keywords}
          placeholder={placeholder ?? 'search'}
          style={{ width: '70%', overflow: 'hidden' }}
          onChangeText={handleTyping}
          onSubmitEditing={onSubmit}
          onFocus={() => handleFocus()}
          onBlur={() => {
            handleBlur()
          }}
          onEndEditing={event => {
            console.log('ending event', event.nativeEvent)
            handleOnSearch(event.nativeEvent.text)
          }}
        />
        <RippleIcon
          iconName={iconName}
          color={ThemeStore.shadow}
          shown={SearchStore.keywords.length > 0}
          onPress={onIconPress}
        />
      </View>
    </>
  )
}

export default observer(IconInput)
