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
      <Button
        title="重置播放列表"
        color={theme.colors.primary}
        onPress={() => setStoragePlayList([])}
      />
      <FlatList
        data={storagePlayList}
        style={{
          flex: 1
        }}
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
          <View
            style={{
              borderRightColor: 'blue',
              paddingTop: 20,
              alignItems: 'center'
            }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: 18, color: theme.colors.onSurface }}>
              已经到底啦！
            </Text>
          </View>
        )}
      />
      {/* <View
        style={{
          flex: 1,
          paddingTop: 20,
          alignItems: 'center',
          backgroundColor: theme.colors.onPrimary
        }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 18, color: theme.colors.onSurface }}>
          已经到底啦！
        </Text>
      </View> */}
    </>
  )
}

export default PlayListScreen
