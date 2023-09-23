import { useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, Keyboard, StatusBar, Text, View } from 'react-native'
import { observer } from 'mobx-react'
import { useNavigation } from '@react-navigation/core'
import Clipboard from '@react-native-clipboard/clipboard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ThemeStore from '@/mobx/theme'
import { SongType } from '@/mobx/types'
import RippleIcon from '@/components/RippleIcon'
import { shareOuterBaseURL } from '@/config/share'
import { screenWidth, showToastCommon } from '@/util/common'

function PlayDetailHeader({
  trackInfo
}: {
  trackInfo: SongType.SongProps
}): JSX.Element {
  const mWidth = screenWidth * 0.6
  const navigation = useNavigation()
  const translateX = useRef(new Animated.Value(0)).current

  const rollText = useMemo(
    () => () => {
      Animated.timing(translateX, {
        toValue: -mWidth,
        duration: 12000,
        useNativeDriver: true,
        easing: Easing.linear
      }).start(({ finished }) => {
        if (finished) {
          translateX.setValue(mWidth)
          rollText()
        }
      })
    },
    []
  )

  const writeInClipboard = (id: number) => {
    showToastCommon({ message: '复制成功！' })
    Clipboard.setString(shareOuterBaseURL + id)
  }

  useEffect(() => {
    rollText()
  }, [])

  return (
    <>
      <View
        style={{
          paddingTop: StatusBar.currentHeight + 10,
          backgroundColor: ThemeStore.detailBackground
        }}>
        <StatusBar translucent={true} barStyle="light-content" />
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <RippleIcon
            iconName="keyboard-arrow-down"
            color={ThemeStore.detailSurface}
            onPress={() => {
              Keyboard.dismiss()
              navigation.goBack()
            }}
          />
          <View
            style={{ width: mWidth, alignItems: 'center', overflow: 'hidden' }}>
            <View style={{ height: 40 }}>
              <Animated.Text
                style={{
                  lineHeight: 40,
                  fontSize: 22,
                  color: ThemeStore.detailSurface,
                  transform: [{ translateX: translateX }]
                }}>
                {trackInfo.title}
              </Animated.Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.6
              }}>
              <Text style={{ color: ThemeStore.detailSurface }}>
                {trackInfo.artist}
              </Text>
              <Icon
                style={{ marginLeft: 8, color: ThemeStore.detailSurface }}
                name="arrow-forward-ios"
              />
            </View>
          </View>
          <RippleIcon
            iconName="share"
            color={ThemeStore.detailSurface}
            onPress={() => writeInClipboard(trackInfo.id)}
          />
        </View>
      </View>
    </>
  )
}

export default observer(PlayDetailHeader)
