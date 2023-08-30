import { formatMinute } from '@/util/common'
import Slider from '@react-native-community/slider'
import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import TrackPlayer, { useProgress } from 'react-native-track-player'

function PlayDetailSlider(): JSX.Element {
  const theme = useTheme()
  const { position, duration } = useProgress()

  return (
    <>
      <View>
        <Text style={{ color: theme.colors.onSurface }}>
          {formatMinute(position)}
        </Text>
      </View>
      <Slider
        style={{ width: '80%', height: 40 }}
        minimumValue={0}
        maximumValue={1}
        onValueChange={async value =>
          await TrackPlayer.seekTo(value * duration)
        }
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
    </>
  )
}

export default PlayDetailSlider
