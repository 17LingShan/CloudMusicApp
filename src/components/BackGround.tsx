import ThemeStore from '@/mobx/theme'
import UserStore from '@/mobx/user'
import { toJS } from 'mobx'
import { Image, StyleSheet } from 'react-native'
import CoverImg from '@/assets/cover.jpg'
import { observer } from 'mobx-react'

function BackGround() {
  return (
    <>
      <Image
        style={{
          ...style.backImgContainer,
          opacity: ThemeStore.theme === 'light' ? 0.7 : 0.1
        }}
        blurRadius={6}
        source={
          UserStore.backgroundUrl
            ? {
                uri: toJS(UserStore.backgroundUrl + '?param=500y500')
              }
            : CoverImg
        }
      />
    </>
  )
}

const style = StyleSheet.create({
  backImgContainer: { height: '100%', width: '100%' }
})

export default observer(BackGround)
