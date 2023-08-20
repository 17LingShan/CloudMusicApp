import { Text, View, FlatList, ScrollView } from 'react-native'
import { SearchKeywordsAtom, SearchListAtom } from '@/jotai/searcher'
import { useAtom } from 'jotai'
import MediaItem from '@/components/MediaItem'
import SearchHeader from '@/components/SearchHeader'
import { RefreshControl } from 'react-native-gesture-handler'
import { search } from '@/api/search'
import { useCallback, useState } from 'react'

function SearchScreen(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false)
  const [keywords, _] = useAtom(SearchKeywordsAtom)
  const [searchList, setSearchList] = useAtom(SearchListAtom)

  const handleSearch = async () => {
    setRefreshing(true)
    if (!keywords) return setRefreshing(false)

    await search({ keywords: keywords, type: 1 })
      .then(res => {
        setSearchList([
          ...res.data.result.songs.map(item => ({
            id: item.id,
            title: item.name,
            artist: item.ar[0].name,
            album: item.al.name,
            albumPicUrl: {
              uri: item.al.picUrl + '?param=60y60'
            }
          }))
        ])
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => {
        setRefreshing(false)
      })
  }
  return (
    <>
      <SearchHeader handleSearch={handleSearch} />
      <FlatList
        data={searchList}
        renderItem={({ item, index }) => (
          <MediaItem position={index + 1} songInfo={item} />
        )}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleSearch()}
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
