import { useMemo, useState } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from 'react-native-paper/src/core/theming'
import { pause, play, skipToDirection } from '@/util/playTool'

function PlayDetailBottom({ isPlaying }: { isPlaying: boolean }): JSX.Element {
  const playMode = useMemo(() => ['autorenew', 'replay'], [])
  const theme = useTheme()
  const [ModeSelect, setModeSelect] = useState<number>(0)

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
          name={playMode[ModeSelect]}
          color={theme.colors.surface}
          size={30}
          onPress={() => setModeSelect(prev => (prev + 1) % playMode.length)}
        />
        <Icon
          name="keyboard-double-arrow-left"
          color={theme.colors.surface}
          size={30}
          onPress={async () => await skipToDirection(-1)}
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
          onPress={async () => await skipToDirection(1)}
        />
        <Icon name="playlist-play" color={theme.colors.surface} size={30} />
      </View>
    </>
  )
}

export default PlayDetailBottom
