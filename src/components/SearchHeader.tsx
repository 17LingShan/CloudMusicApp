import { View, StatusBar, Text } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useAtom } from 'jotai'
import RippleIcon from './RippleIcon'
import IconInput from './IconInput'
import { SearchKeywordsAtom } from '@/jotai/searcher'

function SearchHeader({ handleSearch }): JSX.Element {
  const navigation = useNavigation()
  const [_, setKeywords] = useAtom(SearchKeywordsAtom)

  return (
    <>
      <View style={{ paddingTop: StatusBar.currentHeight + 10 }}>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <View>
            <RippleIcon
              iconName="chevron-left"
              onPress={() => navigation.goBack()}
            />
          </View>
          <IconInput
            iconName="close"
            onSubmit={() => handleSearch()}
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
      </View>
    </>
  )
}

export default SearchHeader
