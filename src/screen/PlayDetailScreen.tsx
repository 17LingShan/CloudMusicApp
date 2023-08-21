import { SongType } from '@/jotai/types'
import { useRoute } from '@react-navigation/core'
import { View } from 'react-native'
import { useEffect, useMemo, useRef, useState } from 'react'
import PlayDetailRotation from '@/components/PlayDetail/PlayDetailRotation'
import PlayDetailHeader from '@/components/PlayDetail/PlayDetailHeader'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { isPlayingAtom, next, pause, play, prev } from '@/jotai/player'
import { useAtom } from 'jotai'

function PlayDetailScreen(): JSX.Element {
  const { params } = useRoute() as { params: SongType.SongProps }
  const [isPlaying, _] = useAtom(isPlayingAtom)

  return (
    <>
      <View style={{ flex: 1 }}>
        <PlayDetailHeader trackInfo={params} />
        <View style={{ flex: 1 }}>
          <PlayDetailRotation albumPicUrl={params.albumPicUrl} />
          <View style={{ flex: 1, backgroundColor: 'red' }}>
            <View style={{ height: '40%', backgroundColor: 'yellow' }}></View>
            <View style={{ height: '60%', backgroundColor: 'skyblue' }}>
              <View
                style={{
                  height: '80%',
                  backgroundColor: 'pink',
                  flexDirection: 'row',
                  paddingHorizontal: 36,
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <Icon name="search" size={36} />
                <Icon
                  name="keyboard-double-arrow-left"
                  size={36}
                  onPress={() => prev()}
                />
                <Icon
                  size={48}
                  name={isPlaying ? 'pause' : 'play-arrow'}
                  onPress={() => (isPlaying ? pause() : play())}
                />
                <Icon
                  name="keyboard-double-arrow-right"
                  size={36}
                  onPress={() => next()}
                />
                <Icon name="search" size={36} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default PlayDetailScreen
