import { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { CommonActions, useNavigation } from '@react-navigation/core'
import UserStore from '@/mobx/user'
import { AlbumType } from '@/mobx/types'
import { fetchLikeAlbums } from '@/api/user'
import UserTitle from '@/components/User/UserTitle'
import AlbumListItem from '@/components/AlbumListItem'
import ListEmptyFooter from '@/components/ListEmptyFooter'
import { handleAccountInfo, showToastErr } from '@/util/common'

function UserScreen(): JSX.Element {
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const [likeAlbum, setLikeAlbum] = useState<AlbumType.AlbumList>([])

  const handleFetchLikeAlbum = async () => {
    await fetchLikeAlbums({ uid: toJS(UserStore.userId) })
      .then(res => {
        setLikeAlbum([
          ...res.data.playlist.map(item => ({
            name: item.name,
            id: item.id,
            userId: item.userId,
            nickname: item.creator.nickname,
            avatarUrl: item.creator.avatarUrl,
            coverImgUrl: item.coverImgUrl,
            description: item.description,
            trackCount: item.trackCount,
            shareCount: item.shareCount,
            commentCount: item.commentCount,
            subscribedCount: item.subscribedCount
          }))
        ])
      })
      .catch(err => {
        showToastErr({ message: err })
      })
  }

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await handleAccountInfo()
    await handleFetchLikeAlbum()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    handleRefresh()
  }, [])

  return (
    <>
      <View style={style.container}>
        <FlatList
          data={likeAlbum}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <UserTitle />}
          ListFooterComponent={() => <ListEmptyFooter />}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate({ name: 'Album', params: item })
                )
              }>
              <AlbumListItem position={index} albumInfo={item} />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  }
})

export default observer(UserScreen)
