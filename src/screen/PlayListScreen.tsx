import { useCallback, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { Text, View } from 'react-native'
import { MD3Colors, ProgressBar } from 'react-native-paper'
import { Easing } from 'react-native-reanimated'
import { useProgress } from 'react-native-track-player'

function PlayListScreen(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false)
  const { position, buffered, duration } = useProgress()
  const progress = useRef(new Animated.Value(0))

  const progressAni = () => {
    Animated.timing(progress.current, {
      toValue: 1,
      useNativeDriver: false,
      duration: 30,
      easing: Easing.linear
    })
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <>
      <View
        style={{
          flex: 1,
          width: '50%',
          justifyContent: 'center'
        }}>
        <Text>position:{position}</Text>
        <Text>buffered:{buffered}</Text>
        <Text>duration:{duration}</Text>
        <Animated.View>
          <ProgressBar
            // progress={position / duration}
            animatedValue={position / duration}
            color={MD3Colors.error50}
          />
        </Animated.View>
      </View>
    </>
  )
}

export default PlayListScreen
