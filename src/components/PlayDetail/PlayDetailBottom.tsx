import { View } from 'react-native'
import { useAtomValue } from 'jotai'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { isPlayingAtom, next, pause, play, prev } from '@/jotai/player'
import { useTheme } from 'react-native-paper/src/core/theming'
import { useMemo, useState } from 'react'

function PlayDetailBottom(): JSX.Element {
  const playModal = useMemo(() => ['autorenew', 'replay'], [])
  const theme = useTheme()
  const [modalSelect, setModalSelect] = useState(0)
  const isPlaying = useAtomValue(isPlayingAtom)

  return (
    <>
      <View
        style={{
          height: '80%',
          flexDirection: 'row',
          paddingHorizontal: 36,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Icon
          name={playModal[modalSelect]}
          color={theme.colors.surface}
          size={30}
          onPress={() => setModalSelect(prev => (prev + 1) % playModal.length)}
        />
        <Icon
          name="keyboard-double-arrow-left"
          color={theme.colors.surface}
          size={30}
          onPress={() => prev()}
        />
        <Icon
          name={isPlaying ? 'pause-circle' : 'play-circle'}
          color={theme.colors.surface}
          size={60}
          onPress={() => (isPlaying ? pause() : play())}
        />
        <Icon
          name="keyboard-double-arrow-right"
          color={theme.colors.surface}
          size={30}
          onPress={() => next()}
        />
        <Icon name="playlist-play" color={theme.colors.surface} size={30} />
      </View>
    </>
  )
}

export default PlayDetailBottom
