import { View } from 'react-native'
import { useAtomValue } from 'jotai'
import { useProgress } from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { isPlayingAtom, next, pause, play, prev } from '@/jotai/player'

function PlayDetailBottom(): JSX.Element {
  const isPlaying = useAtomValue(isPlayingAtom)

  return (
    <>
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
    </>
  )
}

export default PlayDetailBottom
