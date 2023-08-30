import { useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useTheme } from 'react-native-paper'
import { RefreshControl } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'
import { showToastErr } from '@/util/common'
import SearchHeader from '@/components/SearchHeader'
import MediaItem from '@/components/MediaItem'
import { search } from '@/api/search'
import searchStore from '@/mobx/searcher'
import { SongType } from '@/mobx/types'
import { handlePressItem, handlePressModalIcon } from '@/util/navigateTool'

function SearchScreen(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)

  const handleSearch = async () => {
    if (!searchStore.keywords) return setRefreshing(false)
    setRefreshing(true)
    await search({ keywords: toJS(searchStore.keywords), type: 1 })
      .then(res => {
        if (res.data.code !== 200) {
          showToastErr({ code: res.data.code, message: res.data.message })
          return
        }
        searchStore.setSearchList([
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
      .catch(err => {
        console.log('error of search in searchScreen', err)
      })
    setRefreshing(false)
  }

  const handleRefreshing = async () => {
    setRefreshing(true)
    await handleSearch()
    setRefreshing(false)
  }

  return (
    <>
      <SearchHeader
        handleSearch={handleSearch}
        onIconPress={() => searchStore.setKeywords('')}
      />
      <FlatList
        data={toJS(searchStore.searchList)}
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

export default observer(SearchScreen)
