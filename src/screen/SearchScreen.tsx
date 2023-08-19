import { Text, View, FlatList } from 'react-native'
import { SearchListAtom } from '@/jotai/player'
import { useAtom } from 'jotai'
import MediaItem from '@/components/MediaItem'
import SearchHeader from '@/components/SearchHeader'

function SearchScreen(): JSX.Element {
  const [searchList, setSearchList] = useAtom(SearchListAtom)

  return (
    <>
      <SearchHeader />
      <FlatList
        data={searchList}
        renderItem={({ item }) => <MediaItem songInfo={item} />}
        keyExtractor={item => item.key.toString()}
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
