import { useEffect, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useTheme } from 'react-native-paper'
import { fetchAlbumDetail } from '@/api/search'
import { AlbumType, SongType } from '@/mobx/types'
import { handlePressItem, handlePressModalIcon } from '@/util/navigateTool'
import ListEmptyFooter from '@/components/PlayDetail/ListEmptyFooter'
import CustomBackGround from '@/layout/CustomBackGround'
import AlbumHeader from '@/components/Album/AlbumHeader'
import AlbumTitle from '@/components/Album/AlbumTitle'
import TrackItem from '@/components/TrackItem'

function AlbumScreen(): JSX.Element {
  const { params } = useRoute() as { params: AlbumType.AlbumProps }
  const navigation = useNavigation()
  const theme = useTheme()

  const [refreshing, setRefreshing] = useState(false)
  const [trackList, setTrackList] = useState<SongType.SongList>([])

  const handleFetchAllTrack = async () => {
    setRefreshing(true)
    await fetchAlbumDetail({ id: params.id })
      .then(res => {
        setTrackList([
          ...res.data.playlist.tracks.map(
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
        console.log('error of fetchAlbumAllTrack')
      })
    setRefreshing(false)
  }

  useEffect(() => {
    handleFetchAllTrack()
  }, [])

  return (
    <>
      <CustomBackGround>
        <View style={{ flex: 1 }}>
          <AlbumHeader />
          <AlbumTitle albumInfo={params} />
          <FlatList
            data={trackList}
            initialNumToRender={100}
            renderItem={({ item, index }) => (
              <TrackItem
                position={index + 1}
                trackInfo={item}
                iconColor={theme.colors.shadow}
                onPressItem={async () =>
                  await handlePressItem(navigation, item)
                }
                onPressIcon={() => handlePressModalIcon(navigation, item)}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} />}
            ListFooterComponent={() => <ListEmptyFooter />}
          />
        </View>
      </CustomBackGround>
    </>
  )
}

export default AlbumScreen
