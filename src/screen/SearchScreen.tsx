import { useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { useAtom, useAtomValue } from 'jotai'
import { search } from '@/api/search'
import { SearchKeywordsAtom, SearchListAtom } from '@/jotai/searcher'
import MediaItem from '@/components/MediaItem'
import SearchHeader from '@/components/SearchHeader'
import { RefreshControl } from 'react-native-gesture-handler'
import { handlePressItem, handlePressModalIcon } from '@/util/common'
import { useNavigation } from '@react-navigation/core'
import { SongType } from '@/jotai/types'
import { useTheme } from 'react-native-paper'

function SearchScreen(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()
  const keywords = useAtomValue(SearchKeywordsAtom)
  const [searchList, setSearchList] = useAtom(SearchListAtom)
  const [refreshing, setRefreshing] = useState(false)

  const handleSearch = async () => {
    if (!keywords) return setRefreshing(false)
    setRefreshing(true)
    await search({ keywords: keywords, type: 1 })
      .then(res => {
        setSearchList([
          ...res.data.result.songs.map(
            item =>
              ({
                id: item.id,
                title: item.name,
                artist: item.ar[0].name,
                album: item.al.name,
                fee: item.fee,
                albumPicUrl: {
                  uri: item.al.picUrl
                }
              } as SongType.SongProps)
          )
        ])
      })
      .catch(e => console.log('error of search in searchScreen'))
    setRefreshing(false)
  }

  const handleRefreshing = async () => {
    setRefreshing(true)
    await handleSearch()
    setRefreshing(false)
  }

  return (
    <>
      <SearchHeader handleSearch={handleSearch} />
      <FlatList
        data={searchList}
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleRefreshing()}
          />
        }
        ListFooterComponent={() => (
          <View>
            <Text>213213</Text>
          </View>
        )}
      />
    </>
  )
}

export default SearchScreen
