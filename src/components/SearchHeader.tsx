import { useState } from 'react'
import { View, StatusBar, Text } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useAtom } from 'jotai'
import RippleIcon from './RippleIcon'
import IconInput from './IconInput'
import { search } from '@/api/search'
import { SearchListAtom } from '@/jotai/player'
import { SongType } from '@/jotai/types'

function SearchHeader(): JSX.Element {
  const navigation = useNavigation()
  const [_, setSearchList] = useAtom(SearchListAtom)
  const [keywords, setKeywords] = useState<string>('')

  const handleSearch = async () => {
    console.log('keywords', keywords)
    await search({ keywords: keywords, type: 1 })
      .then(res => {
        const searchList: SongType.SongList = res.data.result.songs.map(
          (item, index) => ({
            id: item.id,
            title: item.name,
            artist: item.ar[0].name,
            album: item.al.name
          })
        )
        setSearchList(prev => [...searchList])
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <>
      <View
        style={{
          marginTop: StatusBar.currentHeight + 10,
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <View>
          <RippleIcon
            iconName="chevron-left"
            onPress={() => {
              navigation.goBack()
            }}
          />
        </View>
        <IconInput
          iconName="close"
          value={keywords}
          change={setKeywords}
          onSubmit={() => handleSearch()}
          onIconPress={() => setKeywords('')}
        />
        <View
          style={{
            width: 48,
            marginHorizontal: 12,
            alignItems: 'center'
          }}>
          <Text style={{ fontSize: 16 }} onPress={() => handleSearch()}>
            搜索
          </Text>
        </View>
      </View>
    </>
  )
}

export default SearchHeader
