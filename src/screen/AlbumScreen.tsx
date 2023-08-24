import { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useTheme } from 'react-native-paper'
import { fetchAlbumAllTrack } from '@/api/search'
import AlbumHeader from '@/components/Album/AlbumHeader'
import AlbumTitle from '@/components/Album/AlbumTitle'
import MediaItem from '@/components/MediaItem'
import { AlbumType, SongType } from '@/jotai/types'
import { handlePressItem, handlePressModalIcon } from '@/util/common'

function AlbumScreen(): JSX.Element {
  const { params } = useRoute() as { params: AlbumType.AlbumProps }
  const navigation = useNavigation()
  const theme = useTheme()

  const [refreshing, setRefreshing] = useState(false)
  const [trackList, setTrackList] = useState<SongType.SongList>([])

  const handleFetchAllTrack = async () => {
    setRefreshing(true)
    await fetchAlbumAllTrack({ id: params.id })
      .then(res => {
        setTrackList([
          ...res.data.songs.map(
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
      .catch(e => console.log('error of fetchAlbumAllTrack'))
    setRefreshing(false)
  }

  useEffect(() => {
    handleFetchAllTrack()
  }, [])

  return (
    <>
      <View style={{ flex: 1 }}>
        <AlbumHeader />
        <AlbumTitle albumInfo={params} />
        <FlatList
          data={trackList}
          renderItem={({ item, index }) => (
            <MediaItem
              position={index + 1}
              songInfo={item}
              iconColor={theme.colors.shadow}
              onPressItem={async () => await handlePressItem(navigation, item)}
              onPressIcon={() => handlePressModalIcon(navigation, item)}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} />}
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
