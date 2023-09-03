import { useEffect, useRef, useState } from 'react'
import { Animated, Easing, TouchableOpacity } from 'react-native'
import PlayDetailRotation from './PlayDetailRotation'
import PlayDetailLyric from './PlayDetailLyric'
import coverImg from '@/assets/cover.jpg'
import { SongType } from '@/mobx/types'

function PlayDetailCenter({
  trackInfo
}: {
  trackInfo: SongType.SongProps
}): JSX.Element {
  const [isAlbumPic, setIsAlbumPic] = useState(true)

  const AlbumFade = useRef(new Animated.Value(0)).current
  const lyricFade = useRef(new Animated.Value(0)).current

  const fadeAni = Animated.timing(AlbumFade, {
    toValue: isAlbumPic ? 1 : 0,
    duration: 200,
    useNativeDriver: true,
    easing: Easing.linear
  })

  const lyricAni = Animated.timing(lyricFade, {
    toValue: isAlbumPic ? 0 : 1,
    duration: 200,
    useNativeDriver: true,
    easing: Easing.linear
  })

  useEffect(() => {
    fadeAni.start()
    lyricAni.start()
  }, [isAlbumPic])
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={{ width: '100%', height: '70%', overflow: 'hidden' }}
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
            albumPicUrl={trackInfo.id ? trackInfo.albumPicUrl : coverImg}
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
          <PlayDetailLyric lyric={trackInfo.lyric} />
        </Animated.View>
      </TouchableOpacity>
    </>
  )
}

export default PlayDetailCenter
