import React from 'react'
import { ImageBackground } from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import UserStore from '@/mobx/user'
import { CoverImg } from '@/assets/base64Img'
// import CoverImg from '@/assets/cover.jpg'

function CustomBackGround({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={
          UserStore.backgroundUrl
            ? { uri: toJS(UserStore.backgroundUrl) }
            : { uri: CoverImg }
        }>
        {React.Children.only(children)}
      </ImageBackground>
    </>
  )
}

export default observer(CustomBackGround)
