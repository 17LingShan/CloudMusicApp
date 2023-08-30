import { useEffect, useRef } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/core'
import { Animated, Easing, Image, Pressable, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import coverImg from '@/assets/cover.jpg'
import playerStore from '@/mobx/player'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { pause, play } from '@/util/playTool'

function PlayBottomBar(): JSX.Element {
  const navigation = useNavigation()

  const bottom = useRef(
    new Animated.Value(playerStore.currentTrack.id ?? 0 ? 60 : -80)
  ).current

  const bottomAni = Animated.timing(bottom, {
    toValue: playerStore.currentTrack.id ?? 0 ? 60 : -80,
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
          width: '100%',
          position: 'absolute',
          paddingHorizontal: 16,
          bottom: bottom
        }}>
        <View style={{ width: '100%' }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 12,
              overflow: 'hidden'
            }}>
            <Pressable
              onPress={() => {
                navigation.dispatch(CommonActions.navigate('playDetail'))
              }}>
              <Image
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 6
                }}
                source={
                  toJS(playerStore.currentTrack.id)
                    ? toJS(playerStore.currentTrack.albumPicUrl)
                    : coverImg
                }
              />
            </Pressable>
            <Icon
              size={48}
              name={playerStore.isPlaying ? 'pause' : 'play-arrow'}
              onPress={() => (playerStore.isPlaying ? pause() : play())}
            />
          </View>
        </View>
      </Animated.View>
    </>
  )
}

export default observer(PlayBottomBar)
