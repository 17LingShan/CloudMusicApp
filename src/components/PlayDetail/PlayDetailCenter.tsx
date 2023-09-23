import { useEffect, useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, TouchableOpacity } from 'react-native'
import { SongType } from '@/mobx/types'
import coverImg from '@/assets/cover.jpg'
import PlayDetailLyric from './PlayDetailLyric'
import PlayDetailRotation from './PlayDetailRotation'

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

  const changeAlbumLyric = () => {
    AlbumFade.setValue(isAlbumPic ? 1 : 0)
    lyricFade.setValue(isAlbumPic ? 0 : 1)
    setIsAlbumPic(prev => !prev)
  }

  useEffect(() => {
    fadeAni.start()
    lyricAni.start()
  }, [isAlbumPic])
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={style.touchWrap}
        onPress={() => changeAlbumLyric()}>
        <Animated.View style={{ ...style.albumWrap, opacity: AlbumFade }}>
          <PlayDetailRotation
            albumPicUrl={trackInfo.id ? trackInfo.albumPicUrl : coverImg}
          />
        </Animated.View>
        <Animated.View style={{ ...style.lyricWrap, opacity: lyricFade }}>
          <PlayDetailLyric lyric={trackInfo.lyric} />
        </Animated.View>
      </TouchableOpacity>
    </>
  )
}

const style = StyleSheet.create({
  touchWrap: { position: 'relative', width: '100%', height: '70%' },
  albumWrap: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lyricWrap: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default PlayDetailCenter
