import { BannerType } from '@/mobx/types'
import { useRoute } from '@react-navigation/core'
import WebView from 'react-native-webview'

function WebScreen(): JSX.Element {
  const { params } = useRoute() as {
    params: Pick<BannerType.BannerProps, 'url'>
  }
  console.log(params)
  return (
    <>
      <WebView source={{ uri: params.url }} style={{ flex: 1 }} />
    </>
  )
}

export default WebScreen
