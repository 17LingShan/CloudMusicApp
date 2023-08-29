import { useState, useCallback, useEffect } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { fetchHotAlbumList, fetchBanner } from '@/api/hotInfo'
import HomeCarousel from '@/components/Home/BannerCarousel'
import HotAlbumList from '@/components/Home/HotAlbumList'
import { AlbumType, BannerType } from '@/mobx/types'
import { screenWidth } from '@/util/common'

function HomeSCreen() {
  const width = screenWidth
  const [banner, setBanner] = useState<BannerType.BannerList>()
  const [albumList, setAlbumList] = useState<AlbumType.AlbumList>()
  const [refreshing, setRefreshing] = useState(false)

  const handleBanner = async () => {
    await fetchBanner({})
      .then(res => {
        setBanner([...res.data.banners.map(item => ({ pic: item.pic }))])
      })
      .catch(e => console.log('err of Banner'))
  }

  const handleAlbumList = async () => {
    await fetchHotAlbumList({})
      .then(res => {
        setAlbumList([
          ...res.data.playlists.map(item => ({
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
      .catch(e => console.log('err of HotAlbumList'))
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([handleBanner(), handleAlbumList()])
    setRefreshing(false)
  }, [])
  useEffect(() => {
    onRefresh()
  }, [])

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ marginTop: 20 }}>
          <HomeCarousel bannerList={banner} />
        </View>
        <View
          style={{
            width: '100%',
            height: width / 2,
            marginTop: 42
          }}>
          <HotAlbumList albumList={albumList} />
        </View>
      </ScrollView>
    </>
  )
}

export default HomeSCreen
