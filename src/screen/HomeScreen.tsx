import { useState, useCallback, useEffect } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { handleAccountInfo, screenWidth } from '@/util/common'
import { fetchHotAlbumList, fetchBanner } from '@/api/hotInfo'
import BannerCarousel from '@/components/Home/BannerCarousel'
import HotAlbumList from '@/components/Home/HotAlbumList'
import { AlbumType, BannerType } from '@/mobx/types'
import RecommendTrackList from '@/components/Home/RecommendTrackList'

function HomeSCreen() {
  const [banner, setBanner] = useState<BannerType.BannerList>()
  const [albumList, setAlbumList] = useState<AlbumType.AlbumList>()
  const [refreshing, setRefreshing] = useState(false)

  const handleBanner = async () => {
    await fetchBanner({})
      .then(res => {
        setBanner([
          ...res.data.banners.map(item => ({ pic: item.pic, url: item.url }))
        ])
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
            trackCount: item.trackCount,
            shareCount: item.shareCount,
            commentCount: item.commentCount,
            subscribedCount: item.subscribedCount
          }))
        ])
      })
      .catch(e => console.log('err of HotAlbumList'))
  }

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([handleAccountInfo(), handleBanner(), handleAlbumList()])
    setRefreshing(false)
  }, [])
  useEffect(() => {
    handleRefresh()
  }, [])

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View style={style.bannerWrap}>
          <BannerCarousel bannerList={banner} />
        </View>
        <View style={style.hotListWrap}>
          <HotAlbumList albumList={albumList} />
        </View>
        <View style={{}}>
          <RecommendTrackList />
        </View>
      </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
  bannerWrap: {
    marginTop: 20
  },
  hotListWrap: {
    height: screenWidth * 0.7,
    marginTop: 10
  }
})

export default HomeSCreen
