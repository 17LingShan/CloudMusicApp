import { useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, Keyboard, StatusBar, Text, View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/core'
import { SongType } from '@/mobx/types'
import RippleIcon from '@/components/RippleIcon'
import { screenWidth, showToastCommon } from '@/util/common'
import { shareOuterBaseURL } from '@/config/share'

function PlayDetailHeader({
  trackInfo
}: {
  trackInfo: SongType.SongProps
}): JSX.Element {
  const mWidth = screenWidth * 0.6
  const theme = useTheme()
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
          backgroundColor: theme.colors.background
        }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <RippleIcon
            iconName="keyboard-arrow-down"
            color={theme.colors.surface}
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
                  color: theme.colors.surface,
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
              <Text style={{ color: theme.colors.surface }}>
                {trackInfo.artist}
              </Text>
              <Icon
                style={{ marginLeft: 8, color: theme.colors.surface }}
                name="arrow-forward-ios"
              />
            </View>
          </View>
          <RippleIcon
            iconName="share"
            color={theme.colors.surface}
            onPress={() => writeInClipboard(trackInfo.id)}
          />
        </View>
      </View>
    </>
  )
}

export default PlayDetailHeader
