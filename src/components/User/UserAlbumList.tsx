import { hexToRGB } from '@/util/common'
import { FlatList, SafeAreaView, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import AlbumListItem from '../AlbumListItem'
import { AlbumType } from '@/mobx/types'
import UserTitle from './UserTitle'

function UserAlbumList({
  likeAlbum
}: {
  likeAlbum: AlbumType.AlbumList
}): JSX.Element {
  const theme = useTheme()

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 50,
          borderRadius: 20,
          backgroundColor: `rgba(${hexToRGB(theme.colors.surface)},0.2)`,
          justifyContent: 'center'
        }}>
        <FlatList
          data={likeAlbum}
          ListHeaderComponent={() => <UserTitle />}
          ListFooterComponent={() => <View></View>}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <AlbumListItem albumInfo={item} />}
        />
      </SafeAreaView>
    </>
  )
}

export default UserAlbumList
