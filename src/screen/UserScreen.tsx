import { fetchLikeAlbums } from '@/api/user'
import AlbumListItem from '@/components/AlbumListItem'
import UserAlbumList from '@/components/User/UserAlbumList'
import UserTitle from '@/components/User/UserTitle'
import { AlbumType } from '@/mobx/types'
import UserStore from '@/mobx/user'
import { handleAccountInfo, showToastErr } from '@/util/common'
import { toJS } from 'mobx'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native'

function UserScreen(): JSX.Element {
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
      <FlatList
        data={likeAlbum}
        ListHeaderComponent={() => <UserTitle />}
        ListFooterComponent={() => <View style={{ height: 120 }} />}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <AlbumListItem albumInfo={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </>
  )
}

export default UserScreen
