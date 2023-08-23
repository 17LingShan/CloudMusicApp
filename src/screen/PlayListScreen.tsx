import { Button, FlatList } from 'react-native'
import { Text, View } from 'react-native'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '@/storage'
import MediaItem from '@/components/MediaItem'
import { useEffect } from 'react'

function PlayListScreen(): JSX.Element {
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
          <MediaItem position={index + 1} songInfo={item} />
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
