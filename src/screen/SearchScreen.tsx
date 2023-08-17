import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import SearchHeader from '@/components/SearchHeader'
import MediaItem from '@/components/MediaItem'
import type { MediaItemType } from '@/components/types'

function SearchScreen(): JSX.Element {
  const DATA: MediaItemType.MediaItemProps[] = [
    {
      position: 1,
      key: 'bd7ac123bea-c0891b1-46c2-aed5-3ad53abb28ba',
      MediaName: 'First Item'
    },
    {
      position: 2,
      key: '3ac68afc90-c605-48d3-a4f8-123fbd91aa97f63',
      MediaName: 'Second Item'
    },
    {
      position: 3,
      key: '4a0f-3da1-471f123-bd96-145571e29d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694d91236-145571e29d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-1233da1-471f-bd96-145572',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '586a0f-3da1-471f-b123d96-1452',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58a0f-3da1-471f-bd96-145571e2123219d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '5869f-3da1-471f-bd96-145571231231e29d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-3da1231-471f-bd96-145529d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-13231233da1-471f-bd96-145571e72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '5869f-3da312312324321-471f-bd96-145571e29d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-3da471f-bd96-14345457655e29d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0da1-471f-bd96-145571768879e29d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58690f-3da1-471f-bd96-145571890e2d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-a1-471f-bd96-145590-71e29d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-3a1-471f-bd90=6-145571e29d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-3da1-471f-bd96-1hjk5571e29d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-3dacvb1-71f-bd96-145571e29d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-3da1-47f-bd96-145571e29xcvd72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-3da1-471f-bd96-145zxc571e29d2',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-3da1-47qew1f-bd96-145571e2d72',
      MediaName: 'Third Item'
    },
    {
      position: 3,
      key: '58694a0f-3da1-471f-bd96-rewr141e29d72',
      MediaName: 'Third Item'
    }
  ]
  return (
    <>
      <View>
        <SearchHeader />
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <MediaItem position={item.position} MediaName={item.MediaName} />
          )}
          keyExtractor={item => item.key}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: '#f9c2ff',
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
})
export default SearchScreen
