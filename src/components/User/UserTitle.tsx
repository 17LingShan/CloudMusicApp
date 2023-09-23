import { Image, StyleSheet, Text, View } from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import UserStore from '@/mobx/user'
import ThemeStore from '@/mobx/theme'
import { hexToRGB } from '@/util/common'
import CoverImg from '@/assets/cover.jpg'

function UserTitle(): JSX.Element {
  return (
    <>
      <View style={style.titleWrap}>
        <View style={style.titleContainer}>
          <View style={style.avatarContainer}>
            <Image
              style={style.avatar}
              source={
                UserStore.avatarUrl
                  ? { uri: toJS(UserStore.avatarUrl) + '?param=500y500' }
                  : CoverImg
              }
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              ...style.nicknameWrap,
              backgroundColor: `rgba(${hexToRGB(ThemeStore.onSurface)},0.2)`
            }}>
            <View style={style.nicknameContainer}>
              <Text style={{ ...style.nickname, color: ThemeStore.surface }}>
                {toJS(UserStore.nickname)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  titleWrap: { height: 200, marginBottom: 50 },
  titleContainer: { flex: 1, justifyContent: 'flex-end' },
  avatarContainer: {
    position: 'absolute',
    width: '100%',
    height: 100,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99
  },
  avatar: { height: 100, width: 100, borderRadius: 50 },
  nicknameWrap: { height: 150, borderRadius: 20, justifyContent: 'center' },
  nicknameContainer: { alignItems: 'center' },
  nickname: { fontSize: 24, fontWeight: '900' }
})

export default observer(UserTitle)
