import React from 'react'
import { Text, View } from 'react-native'
import { search } from '@/api/search'

function Home() {
  const [text, setText] = React.useState('213')

  async function handleSearch() {
    const time = new Date()
    setText(time.getMinutes().toString())
    const params: API.SearchParams = {
      keywords: '海阔天空'
    }

    await search(params).then(res => console.log(res))
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{ fontSize: 48 }}>Home</Text>
      </View>
    </>
  )
}

export default Home
