import { useEffect } from 'react'
import { View, StatusBar, Text, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useTheme } from 'react-native-paper'
import { observer } from 'mobx-react'
import SearchStore from '@/mobx/searcher'
import { screenHeight, screenWidth } from '@/util/common'
import RippleIcon from '../RippleIcon'
import IconInput from './IconInput'

function SearchHeader({ handleSearch, onIconPress }): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()

  useEffect(() => {
    console.log('SearchStore.isInputFocus', SearchStore.isInputFocus)
  }, [SearchStore.isInputFocus])

  return (
    <>
      <View style={{ paddingTop: StatusBar.currentHeight + 10 }}>
        <View
          style={{
            position: 'relative',
            height: screenHeight * 0.08,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          {SearchStore.isInputFocus && SearchStore.keywords.length ? (
            <View
              style={{
                position: 'absolute',
                top: 60,
                width: screenWidth,
                height: screenWidth * 0.6,
                backgroundColor: 'red'
              }}></View>
          ) : null}
          <RippleIcon
            iconName="chevron-left"
            color={theme.colors.shadow}
            onPress={() => {
              Keyboard.dismiss()
              navigation.goBack()
            }}
          />
          <IconInput
            iconName="close"
            onSubmit={() => handleSearch()}
            onIconPress={onIconPress}
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

export default observer(SearchHeader)
