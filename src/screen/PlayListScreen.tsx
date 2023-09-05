import { Button, FlatList } from 'react-native'
import { Text, View } from 'react-native'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '@/storage'
import TrackItem from '@/components/TrackItem'
import { useTheme } from 'react-native-paper/src/core/theming'
import { useNavigation } from '@react-navigation/core'
import { observer } from 'mobx-react'
import { handlePressItem, handlePressModalIcon } from '@/util/navigateTool'
import { screenHeight } from '@/util/common'

function PlayListScreen(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()
  const [storagePlayList, setStoragePlayList] = useMMKVStorage(
    'play-list',
    storage,
    []
  )

  return (
    <>
      <Button
        title="重置播放列表"
        color={theme.colors.primary}
        onPress={() => {
          setStoragePlayList([])
        }}
      />
      <FlatList
        data={storagePlayList}
        renderItem={({ item, index }) => (
          <TrackItem
            position={index + 1}
            trackInfo={item}
            iconColor={theme.colors.shadow}
            onPressItem={async () => await handlePressItem(navigation, item)}
            onPressIcon={() => handlePressModalIcon(navigation, item)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={() => (
          <View style={{ height: screenHeight * 0.15 }} />
        )}
      />
    </>
  )
}

export default observer(PlayListScreen)
