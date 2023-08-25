import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Slider from '@react-native-community/slider'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import coverImg from '@/assets/cover.jpg'
import PlayDetailRotation from '@/components/PlayDetail/PlayDetailRotation'
import PlayDetailHeader from '@/components/PlayDetail/PlayDetailHeader'
import PlayDetailBottom from '@/components/PlayDetail/PlayDetailBottom'
import { formatMinute } from '@/util/common'
import { useTrackPlayer } from '@/jotai/player'

function PlayDetailScreen(): JSX.Element {
  const theme = useTheme()

  const { position, buffered, duration } = useProgress()
  const { isPlaying, currentTrack } = useTrackPlayer()

  return (
    <>
      <View style={{ flex: 1 }}>
        <PlayDetailHeader trackInfo={currentTrack} />
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <PlayDetailRotation
            albumPicUrl={currentTrack.id ? currentTrack.albumPicUrl : coverImg}
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
              <PlayDetailBottom isPlaying={isPlaying} />
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default PlayDetailScreen
