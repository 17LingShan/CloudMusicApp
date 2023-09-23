import { BannerType } from '@/mobx/types'
import { useRoute } from '@react-navigation/core'
import { StyleSheet } from 'react-native'
import WebView from 'react-native-webview'

function WebScreen(): JSX.Element {
  const { params } = useRoute() as {
    params: Pick<BannerType.BannerProps, 'url'>
  }
  return (
    <>
      <WebView style={style.webViewWrap} source={{ uri: params.url }} />
    </>
  )
}

const style = StyleSheet.create({
  webViewWrap: { flex: 1 }
})

export default WebScreen
