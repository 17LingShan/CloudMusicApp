import { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { useIsFocused, useRoute } from '@react-navigation/core'
import { fetchAlbumAllTrack } from '@/api/search'
import AlbumHeader from '@/components/Album/AlbumHeader'
import AlbumTitle from '@/components/Album/AlbumTitle'
import MediaItem from '@/components/MediaItem'
import { AlbumType, SongType } from '@/jotai/types'

function AlbumScreen(): JSX.Element {
  const { params } = useRoute() as { params: AlbumType.AlbumProps }
  const [refreshing, setRefreshing] = useState(false)
  const isFocused = useIsFocused()

  const [trackList, setTrackList] = useState<SongType.SongList>([])

  const handleFetchAllTrack = async () => {
    await fetchAlbumAllTrack({ id: params.id })
      .then(res => {
        setTrackList([
          ...res.data.songs.map(item => ({
            id: item.id,
            title: item.name,
            artist: item.ar[0].name,
            album: item.al.name,
            albumPicUrl: {
              uri: item.al.picUrl
            }
          }))
        ])
      })
      .catch(e => console.log(e))
  }

  const handleRefreshing = async () => {
    setRefreshing(true)
    await handleFetchAllTrack()
    setRefreshing(false)
  }

  useEffect(() => {
    if (isFocused) handleRefreshing()
  }, [isFocused])

  console.log(params)
  return (
    <>
      <View style={{ flex: 1 }}>
        <AlbumHeader />
        <AlbumTitle albumInfo={params} />
        <FlatList
          data={trackList}
          renderItem={({ item, index }) => (
            <MediaItem position={index + 1} songInfo={item} />
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
      </View>
    </>
  )
}

export default AlbumScreen
