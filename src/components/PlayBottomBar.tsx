import { useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  Image,
  Pressable,
  View,
  StyleSheet
} from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/core'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import playerStore from '@/mobx/player'
import { pause, play } from '@/util/playTool'
import coverImg from '@/assets/cover.jpg'
import { useTheme } from 'react-native-paper'
import { hexToRGB, screenHeight } from '@/util/common'

function PlayBottomBar(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()

  const bottom = useRef(
    new Animated.Value(
      playerStore.currentTrack.id ?? 0
        ? screenHeight * 0.1
        : -screenHeight * 0.1
    )
  ).current

  const bottomAni = Animated.timing(bottom, {
    toValue:
      playerStore.currentTrack.id ?? 0
        ? screenHeight * 0.1
        : -screenHeight * 0.1,
    duration: 400,
    useNativeDriver: false,
    easing: Easing.quad
  })
  bottomAni.start()

  useEffect(() => {
    return () => {
      bottomAni.reset()
    }
  }, [])

  return (
    <>
      <Animated.View
        style={{
          ...style.barWrap,
          bottom: bottom
        }}>
        <View
          style={{
            ...style.barContainer,
            backgroundColor: `rgba(${hexToRGB(theme.colors.surface)},0.6)`
          }}>
          <Pressable
            onPress={() => {
              navigation.dispatch(CommonActions.navigate('playDetail'))
            }}>
            <Image
              style={style.imgStyle}
              source={
                playerStore.currentTrack.id
                  ? toJS(playerStore.currentTrack.albumPicUrl)
                  : coverImg
              }
            />
          </Pressable>
          <Icon
            size={48}
            style={style.iconStyle}
            name={playerStore.isPlaying ? 'pause' : 'play-arrow'}
            onPress={() => (playerStore.isPlaying ? pause() : play())}
          />
        </View>
      </Animated.View>
    </>
  )
}

const style = StyleSheet.create({
  barWrap: {
    width: '100%',
    height: screenHeight * 0.1,
    position: 'absolute',
    paddingHorizontal: 16
  },
  barContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingVertical: screenHeight * 0.01,
    paddingHorizontal: screenHeight * 0.02,
    overflow: 'hidden'
  },
  imgStyle: {
    width: screenHeight * 0.08,
    height: screenHeight * 0.08,
    borderRadius: 6
  },
  iconStyle: {
    lineHeight: screenHeight * 0.08
  }
})

export default observer(PlayBottomBar)
