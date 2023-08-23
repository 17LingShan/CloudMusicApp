import { View, StatusBar, Text, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useSetAtom } from 'jotai'
import RippleIcon from './RippleIcon'
import IconInput from './IconInput'
import { SearchKeywordsAtom } from '@/jotai/searcher'
import { useTheme } from 'react-native-paper/src/core/theming'

function SearchHeader({ handleSearch }): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()
  const setKeywords = useSetAtom(SearchKeywordsAtom)

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
              color={theme.colors.shadow}
              onPress={() => {
                Keyboard.dismiss()
                navigation.goBack()
              }}
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
            <Text
              style={{ fontSize: 16, color: theme.colors.shadow }}
              onPress={() => handleSearch()}>
              搜索
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default SearchHeader
