import { StyleSheet, Text, View } from 'react-native'
import { toJS } from 'mobx'
import Slider from '@react-native-community/slider'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import ThemeStore from '@/mobx/theme'
import { formatMinute } from '@/util/common'

function PlayDetailSlider(): JSX.Element {
  const { position, duration } = useProgress()

  return (
    <>
      <View>
        <Text style={{ color: ThemeStore.onSurface }}>
          {formatMinute(position)}
        </Text>
      </View>
      <Slider
        style={style.slider}
        minimumValue={0}
        maximumValue={1}
        onValueChange={async value =>
          await TrackPlayer.seekTo(value * duration)
        }
        value={position / duration}
        minimumTrackTintColor={ThemeStore.onPrimary}
        maximumTrackTintColor={ThemeStore.shadow}
        thumbTintColor={ThemeStore.primary}
      />
      <View>
        <Text style={{ color: ThemeStore.onSurface }}>
          {formatMinute(duration)}
        </Text>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  slider: { width: '80%', height: 40 }
})

export default PlayDetailSlider
