import { View, StatusBar, Text } from 'react-native'
import RippleIcon from './RippleIcon'
import { useState } from 'react'
import IconInput from './IconInput'
import { useNavigation } from '@react-navigation/core'
import { search } from '@/api/search'

function SearchHeader(): JSX.Element {
  const navigation = useNavigation()

  const StatusBarH = StatusBar.currentHeight
  const [keywords, setKeywords] = useState<string>('')

  const handleSearch = async () => {
    await search({ keywords: keywords })
      .then(res => console.log(res))
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <>
      <View
        style={{
          marginTop: StatusBarH + 10,
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <RippleIcon
          iconName="chevron-left"
          onPress={() => {
            navigation.goBack()
          }}
        />
        <IconInput
          iconName="close"
          value={keywords}
          change={setKeywords}
          onIconPress={() => setKeywords('')}
        />
        <View
          style={{
            width: 48,
            marginHorizontal: 12,
            alignItems: 'center'
          }}>
          <Text style={{ fontSize: 16 }} onPress={() => handleSearch()}>
            搜索
          </Text>
        </View>
      </View>
    </>
  )
}

export default SearchHeader
