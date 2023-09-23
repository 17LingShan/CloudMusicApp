import { useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  Easing,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
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
  const mWidth = useMemo(() => screenWidth * 0.6, [])
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

  const handleGoBack = () => {
    Keyboard.dismiss()
    navigation.goBack()
  }

  const writeInClipboard = (id: number) => {
    Clipboard.setString(shareOuterBaseURL + id)
    showToastCommon({ message: '复制成功！' })
  }

  useEffect(() => {
    rollText()
  }, [])

  return (
    <>
      <View
        style={{
          ...style.headerWrap,
          backgroundColor: ThemeStore.detailBackground
        }}>
        <StatusBar translucent={true} barStyle="light-content" />
        <View style={style.headerContainer}>
          <RippleIcon
            iconName="keyboard-arrow-down"
            color={ThemeStore.detailSurface}
            onPress={() => handleGoBack()}
          />
          <View style={style.rollTextWrap}>
            <View style={style.titleContainer}>
              <Animated.Text
                style={{
                  ...style.titleText,
                  color: ThemeStore.detailSurface,
                  transform: [{ translateX: translateX }]
                }}>
                {trackInfo.title}
              </Animated.Text>
            </View>
            <View style={style.artistWrap}>
              <Text style={{ color: ThemeStore.detailSurface }}>
                {trackInfo.artist}
              </Text>
              <Icon
                style={{ ...style.artistIcon, color: ThemeStore.detailSurface }}
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

const style = StyleSheet.create({
  headerWrap: { paddingTop: StatusBar.currentHeight + 10 },
  headerContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rollTextWrap: {
    width: screenWidth * 0.6,
    alignItems: 'center',
    overflow: 'hidden'
  },
  titleContainer: { height: 40 },
  titleText: { lineHeight: 40, fontSize: 22 },
  artistWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6
  },
  artistIcon: { marginLeft: 8 }
})

export default observer(PlayDetailHeader)
