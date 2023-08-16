import { useState } from 'react'
import { TextInput, View } from 'react-native'

function HeadInput(): JSX.Element {
  const [inputText, setInputText] = useState<string>()
  const handleTextChange = (newText: string) => {
    setInputText(newText)
  }

  return (
    <>
      <View style={{ padding: 20 }}>
        <TextInput
          style={{ height: 60, fontSize: 20 }}
          placeholder="type keywords for searching"
          onChangeText={newText => handleTextChange(newText)}
          value={inputText}
        />
      </View>
    </>
  )
}

export default HeadInput
