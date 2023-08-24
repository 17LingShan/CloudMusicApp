import { Button, FlatList } from 'react-native'
import { Text, View } from 'react-native'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '@/storage'
import MediaItem from '@/components/MediaItem'
import { useEffect } from 'react'
import { useTheme } from 'react-native-paper/src/core/theming'
import { handlePressItem, handlePressModalIcon } from '@/util/common'
import { useNavigation } from '@react-navigation/core'

function PlayListScreen(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()
  const [storagePlayList, setStoragePlayList] = useMMKVStorage(
    'play-list',
    storage,
    []
  )

  useEffect(() => {
    console.log('PlayListScreen on')
  }, [storagePlayList])
  return (
    <>
      <Button title="reset" onPress={() => setStoragePlayList([])} />
      <FlatList
        data={storagePlayList}
        renderItem={({ item, index }) => (
          <MediaItem
            position={index + 1}
            songInfo={item}
            iconColor={theme.colors.shadow}
            onPressItem={async () => await handlePressItem(navigation, item)}
            onPressIcon={() => handlePressModalIcon(navigation, item)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={() => (
          <View>
            <Text>{storagePlayList.length}</Text>
          </View>
        )}
      />
    </>
  )
}

export default PlayListScreen
