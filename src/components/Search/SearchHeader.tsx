import { useEffect } from 'react'
import { View, StatusBar, Text, Keyboard } from 'react-native'
import { observer } from 'mobx-react'
import { useNavigation } from '@react-navigation/core'
import ThemeStore from '@/mobx/theme'
import SearchStore from '@/mobx/searcher'
import IconInput from './IconInput'
import RippleIcon from '../RippleIcon'
import { screenHeight, screenWidth } from '@/util/common'

function SearchHeader({ handleSearch, onIconPress }): JSX.Element {
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
            color={ThemeStore.surface}
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
              style={{ fontSize: 16, color: ThemeStore.surface }}
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
