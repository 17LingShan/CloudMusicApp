import { useState } from 'react'
import { Text, View } from 'react-native'
import { search } from '@/api/search'

function Home() {
  const [text, setText] = useState('213')

  async function handleSearch() {
    const time = new Date()
    setText(time.getMinutes().toString())
    const params: APIParams.SearchParams = {
      keywords: '海阔天空'
    }

    await search(params)
      .then(res => console.log(res))
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{ fontSize: 48 }} onPress={() => handleSearch()}>
          Home
        </Text>
      </View>
    </>
  )
}

export default Home
