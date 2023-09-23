import { Image, Text, View } from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import UserStore from '@/mobx/user'
import ThemeStore from '@/mobx/theme'
import { hexToRGB } from '@/util/common'
import { CoverImg } from '@/assets/base64Img'

function UserTitle(): JSX.Element {
  return (
    <>
      <View
        style={{
          height: 200,
          marginBottom: 50
        }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 100,
              top: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 99
            }}>
            <Image
              style={{ height: 100, width: 100, borderRadius: 50 }}
              source={
                UserStore.avatarUrl
                  ? { uri: toJS(UserStore.avatarUrl) + '?param=500y500' }
                  : { uri: CoverImg }
              }
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              height: 150,
              borderRadius: 20,
              backgroundColor: `rgba(${hexToRGB(ThemeStore.surface)},0.2)`,
              justifyContent: 'center'
            }}>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  color: ThemeStore.surface,
                  fontSize: 24,
                  fontWeight: '900'
                }}>
                {toJS(UserStore.nickname)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default observer(UserTitle)
