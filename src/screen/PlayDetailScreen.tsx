import { View } from 'react-native'
import { useRoute } from '@react-navigation/core'
import PlayDetailRotation from '@/components/PlayDetail/PlayDetailRotation'
import PlayDetailHeader from '@/components/PlayDetail/PlayDetailHeader'
import PlayDetailBottom from '@/components/PlayDetail/PlayDetailBottom'
import { SongType } from '@/jotai/types'
import TrackPlayer, {
  Event,
  useProgress,
  useTrackPlayerEvents
} from 'react-native-track-player'
import { useState } from 'react'
import coverImg from '@/assets/cover.jpg'
import { MD3Colors, ProgressBar } from 'react-native-paper'

function PlayDetailScreen(): JSX.Element {
  const { position, buffered, duration } = useProgress()
  const { params } = useRoute() as { params: SongType.SongProps }
  const [currentTrack, setCurrentTrack] = useState<SongType.SongProps>(params)
  const handleTrackChange = async () => {
    setCurrentTrack(
      (await TrackPlayer.getTrack(
        await TrackPlayer.getCurrentTrack()
      )) as SongType.SongProps
    )
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async () => {
    await handleTrackChange()
  })
  return (
    <>
      <View style={{ flex: 1 }}>
        <PlayDetailHeader trackInfo={currentTrack} />
        <View style={{ flex: 1 }}>
          <PlayDetailRotation
            albumPicUrl={currentTrack?.albumPicUrl ?? coverImg}
          />
          <View style={{ flex: 1, backgroundColor: 'red' }}>
            <View
              style={{
                height: '40%',
                backgroundColor: 'yellow',
                alignItems: 'center'
              }}>
              <ProgressBar
                animatedValue={position / duration}
                style={{ width: '60%' }}
                color={MD3Colors.error50}
              />
            </View>
            <View style={{ height: '60%', backgroundColor: 'skyblue' }}>
              <PlayDetailBottom />
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default PlayDetailScreen
