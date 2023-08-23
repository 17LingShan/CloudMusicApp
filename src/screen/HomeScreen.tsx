import { fetchHotAlbumList, fetchBanner } from '@/api/hotInfo'
import HomeCarousel from '@/components/Home/HomeBanner'
import HotAlbumList from '@/components/Home/HotAlbumList'
import { BannerAtom, HotAlbumListAtom } from '@/jotai/searcher'
import { useIsFocused } from '@react-navigation/core'
import { useSetAtom } from 'jotai'
import { useState, useCallback, useEffect } from 'react'
import {
  RefreshControl,
  ScrollView,
  View,
  useWindowDimensions
} from 'react-native'

function HomeSCreen() {
  const width = useWindowDimensions().width

  const isFocused = useIsFocused()
  const setBanner = useSetAtom(BannerAtom)
  const setAlbumList = useSetAtom(HotAlbumListAtom)
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
    if (isFocused) onRefresh()

    return () => {
      setRefreshing(false)
    }
  }, [isFocused])
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ marginTop: 20 }}>
          <HomeCarousel />
        </View>
        <View
          style={{
            width: '100%',
            height: width / 2,
            marginTop: 42
          }}>
          <HotAlbumList />
        </View>
      </ScrollView>
    </>
  )
}

export default HomeSCreen
