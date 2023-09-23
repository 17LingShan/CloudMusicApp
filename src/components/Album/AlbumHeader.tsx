import { View, StatusBar, Text, Keyboard, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { useNavigation } from '@react-navigation/core'
import ThemeStore from '@/mobx/theme'
import RippleIcon from '../RippleIcon'

function AlbumHeader(): JSX.Element {
  const navigation = useNavigation()

  return (
    <>
      <View style={style.headerWrap}>
        <View style={style.headerContainer}>
          <View>
            <RippleIcon
              iconName="chevron-left"
              color={ThemeStore.surface}
              onPress={() => {
                Keyboard.dismiss()
                navigation.goBack()
              }}
            />
          </View>
          <View style={style.searchContainer}>
            <Text style={{ ...style.searchText, color: ThemeStore.surface }}>
              搜索
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  headerWrap: {
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: 'transparent'
  },
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  searchContainer: {
    width: 48,
    marginHorizontal: 12,
    alignItems: 'center'
  },
  searchText: {
    fontSize: 16
  }
})

export default observer(AlbumHeader)
