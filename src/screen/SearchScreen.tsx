import React, { useState } from 'react'
import { FlatList, Keyboard } from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useNavigation } from '@react-navigation/core'
import { RefreshControl } from 'react-native-gesture-handler'
import { search } from '@/api/search'
import { SongType } from '@/mobx/types'
import SearchStore from '@/mobx/searcher'
import { showToastErr } from '@/util/common'
import { handlePressItem, handlePressModalIcon } from '@/util/navigateTool'
import TrackItem from '@/components/TrackItem'
import ListEmptyFooter from '@/components/ListEmptyFooter'
import SearchHeader from '@/components/Search/SearchHeader'

function SearchScreen(): JSX.Element {
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)

  const handleSearch = async () => {
    if (!SearchStore.keywords) return setRefreshing(false)
    Keyboard.dismiss()
    setRefreshing(true)

    await search({
      keywords: toJS(SearchStore.keywords),
      type: toJS(SearchStore.searchType)
    })
      .then(res => {
        if (res.data.code !== 200) {
          showToastErr({ code: res.data.code, message: res.data.message })
          return
        }
        SearchStore.setSearchList([
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

  const handleTyping = async () => {
    if (!SearchStore.keywords) return
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
        onIconPress={() => SearchStore.setKeywords('')}
      />
      <FlatList
        data={toJS(SearchStore.searchList)}
        renderItem={({ item, index }) => (
          <TrackItem
            position={index + 1}
            trackInfo={item}
            onPressItem={async () => await handlePressItem(navigation, item)}
            onPressIcon={() => handlePressModalIcon(navigation, item)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={() => {
          console.log('on search end')
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleRefreshing()}
          />
        }
        ListFooterComponent={() => <ListEmptyFooter />}
      />
    </>
  )
}

export default observer(SearchScreen)
