import { useEffect, useRef, useState } from 'react'
import { Animated, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import Slider from '@react-native-community/slider'
import coverImg from '@/assets/cover.jpg'
import PlayDetailRotation from '@/components/PlayDetail/PlayDetailRotation'
import PlayDetailHeader from '@/components/PlayDetail/PlayDetailHeader'
import PlayDetailBottom from '@/components/PlayDetail/PlayDetailBottom'
import { formatMinute } from '@/util/common'
import playerStore from '@/mobx/player'
import { Easing } from 'react-native-reanimated'
import PlayDetailLyric from '@/components/PlayDetail/PlayDetailLyric'

function PlayDetailScreen(): JSX.Element {
  const theme = useTheme()
  const { position, duration } = useProgress()
  const [isAlbumPic, setIsAlbumPic] = useState(true)

  const AlbumFade = useRef(new Animated.Value(0)).current
  const lyricFade = useRef(new Animated.Value(0)).current

  const fadeAni = Animated.timing(AlbumFade, {
    toValue: isAlbumPic ? 1 : 0,
    duration: 500,
    useNativeDriver: true,
    easing: Easing.linear
  })

  const lyricAni = Animated.timing(lyricFade, {
    toValue: isAlbumPic ? 0 : 1,
    duration: 500,
    useNativeDriver: true,
    easing: Easing.linear
  })

  useEffect(() => {
    fadeAni.start()
    lyricAni.start()
  }, [isAlbumPic])

  return (
    <>
      <View style={{ flex: 1 }}>
        <PlayDetailHeader trackInfo={toJS(playerStore.currentTrack)} />
        <View
          style={{
            position: 'relative',
            flex: 1,
            backgroundColor: theme.colors.background
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{ width: '100%', height: '70%' }}
            onPress={() => {
              AlbumFade.setValue(isAlbumPic ? 1 : 0)
              lyricFade.setValue(isAlbumPic ? 0 : 1)
              setIsAlbumPic(prev => !prev)
            }}>
            <Animated.View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: AlbumFade
              }}>
              <PlayDetailRotation
                albumPicUrl={
                  toJS(playerStore.currentTrack.id)
                    ? toJS(playerStore.currentTrack.albumPicUrl)
                    : coverImg
                }
              />
            </Animated.View>
            <Animated.View
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: lyricFade
              }}>
              <PlayDetailLyric lyric={playerStore.currentTrack.lyric} />
            </Animated.View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: '40%',
                paddingHorizontal: '5%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <View>
                <Text style={{ color: theme.colors.onSurface }}>
                  {formatMinute(position)}
                </Text>
              </View>
              <Slider
                style={{ width: '80%', height: 40 }}
                minimumValue={0}
                maximumValue={1}
                onValueChange={value => TrackPlayer.seekTo(value * duration)}
                value={position / duration}
                minimumTrackTintColor={theme.colors.onPrimary}
                maximumTrackTintColor={theme.colors.shadow}
                thumbTintColor={theme.colors.primary}
              />
              <View>
                <Text style={{ color: theme.colors.onSurface }}>
                  {formatMinute(duration)}
                </Text>
              </View>
            </View>
            <View style={{ height: '60%' }}>
              <PlayDetailBottom isPlaying={toJS(playerStore.isPlaying)} />
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default observer(PlayDetailScreen)
