import { useState } from 'react'
import { Text, View } from 'react-native'
import { useRoute } from '@react-navigation/core'
import { useTheme } from 'react-native-paper'
import Slider from '@react-native-community/slider'
import TrackPlayer, {
  Event,
  State,
  useProgress,
  useTrackPlayerEvents
} from 'react-native-track-player'
import coverImg from '@/assets/cover.jpg'
import { SongType } from '@/jotai/types'
import PlayDetailRotation from '@/components/PlayDetail/PlayDetailRotation'
import PlayDetailHeader from '@/components/PlayDetail/PlayDetailHeader'
import PlayDetailBottom from '@/components/PlayDetail/PlayDetailBottom'
import { storage } from '@/storage'
import { useMMKVStorage } from 'react-native-mmkv-storage'
import { uniqBy } from 'lodash'
import { formatMinute } from '@/util/common'

function PlayDetailScreen(): JSX.Element {
  const theme = useTheme()
  const [storagePlayList, setStoragePlayList] = useMMKVStorage(
    'play-list',
    storage,
    []
  )
  const { params } = useRoute() as { params: SongType.SongProps }
  const { position, buffered, duration } = useProgress()
  const [currentTrack, setCurrentTrack] = useState<SongType.SongProps>(params)

  const handleTrackChange = async () => {
    const state = await TrackPlayer.getState()
    switch (state) {
      case State.Playing:
        setCurrentTrack(
          (await TrackPlayer.getTrack(
            await TrackPlayer.getCurrentTrack()
          )) as SongType.SongProps
        )
        setTimeout(async () => {
          setStoragePlayList(uniqBy(await TrackPlayer.getQueue(), 'id'))
        }, 500)
        break
    }
  }

  useTrackPlayerEvents(
    [Event.PlaybackState, Event.PlaybackTrackChanged],
    async e => await handleTrackChange()
  )
  return (
    <>
      <View style={{ flex: 1 }}>
        <PlayDetailHeader trackInfo={currentTrack} />
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <PlayDetailRotation
            albumPicUrl={currentTrack?.albumPicUrl ?? coverImg}
          />
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
                onPointerUp={() => {
                  console.log('pointerUp')
                }}
                onPointerDown={() => {
                  console.log('down')
                }}
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
              <PlayDetailBottom />
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default PlayDetailScreen
