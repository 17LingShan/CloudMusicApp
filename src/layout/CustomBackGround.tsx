import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import UserStore from '@/mobx/user'
import CoverImg from '@/assets/cover.jpg'
import ThemeStore from '@/mobx/theme'

function CustomBackGround({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <>
      <ImageBackground
        style={style.imgBack}
        resizeMode="cover"
        source={
          UserStore.backgroundUrl
            ? { uri: toJS(UserStore.backgroundUrl) }
            : CoverImg
        }>
        <View
          style={{
            ...style.backMask,
            backgroundColor: `rgba(0,0,0,${
              ThemeStore.theme === 'light' ? 0.1 : 0.7
            })`
          }}>
          {React.Children.only(children)}
        </View>
      </ImageBackground>
    </>
  )
}

const style = StyleSheet.create({
  imgBack: {
    flex: 1
  },
  backMask: {
    flex: 1
  }
})

export default observer(CustomBackGround)
