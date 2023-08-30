import { Button, FlatList } from 'react-native'
import { Text, View } from 'react-native'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { storage } from '@/storage'
import MediaItem from '@/components/MediaItem'
import { useTheme } from 'react-native-paper/src/core/theming'
import { useNavigation } from '@react-navigation/core'
import { observer } from 'mobx-react'
import { handlePressItem, handlePressModalIcon } from '@/util/navigateTool'

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
          <MediaItem
            position={index + 1}
            trackInfo={item}
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
              paddingTop: 40,
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
    </>
  )
}

export default observer(PlayListScreen)
