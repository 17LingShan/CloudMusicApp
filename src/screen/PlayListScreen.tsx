import { FlatList, Text, View } from 'react-native'
import { observer } from 'mobx-react'
import { useNavigation } from '@react-navigation/core'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '@/storage'
import ThemeStore from '@/mobx/theme'
import { hexToRGB, screenHeight } from '@/util/common'
import { handlePressItem, handlePressModalIcon } from '@/util/navigateTool'
import TrackItem from '@/components/TrackItem'
import ListEmptyFooter from '@/components/ListEmptyFooter'

function PlayListScreen(): JSX.Element {
  const navigation = useNavigation()
  const [storagePlayList, setStoragePlayList] = useMMKVStorage(
    'play-list',
    storage,
    []
  )

  return (
    <>
      <View
        style={{
          height: screenHeight * 0.05,
          backgroundColor: `rgba(${hexToRGB(ThemeStore.onPrimary)},0.4)`
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontWeight: '700',
            color: ThemeStore.surface,
            verticalAlign: 'middle',
            textAlign: 'center'
          }}>
          重置播放列表
        </Text>
      </View>
      <FlatList
        data={storagePlayList}
        renderItem={({ item, index }) => (
          <TrackItem
            position={index + 1}
            trackInfo={item}
            onPressItem={async () => await handlePressItem(navigation, item)}
            onPressIcon={() => handlePressModalIcon(navigation, item)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={() => <ListEmptyFooter />}
      />
    </>
  )
}

export default observer(PlayListScreen)
