import { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { pause, play, skipToDirection } from '@/util/playTool'
import ThemeStore from '@/mobx/theme'

function PlayDetailBottom({ isPlaying }: { isPlaying: boolean }): JSX.Element {
  const playMode = useMemo(() => ['autorenew', 'replay'], [])
  const [ModeSelect, setModeSelect] = useState<number>(0)

  return (
    <>
      <View style={style.bottomWrap}>
        <Icon
          name={playMode[ModeSelect]}
          color={ThemeStore.detailSurface}
          size={30}
          onPress={() => setModeSelect(prev => (prev + 1) % playMode.length)}
        />
        <Icon
          name="keyboard-double-arrow-left"
          color={ThemeStore.detailSurface}
          size={30}
          onPress={async () => await skipToDirection(-1)}
        />
        <Icon
          name={isPlaying ? 'pause-circle' : 'play-circle'}
          color={ThemeStore.detailSurface}
          size={60}
          onPress={() => (isPlaying ? pause() : play())}
        />
        <Icon
          name="keyboard-double-arrow-right"
          color={ThemeStore.detailSurface}
          size={30}
          onPress={async () => await skipToDirection(1)}
        />
        <Icon name="playlist-play" color={ThemeStore.detailSurface} size={30} />
      </View>
    </>
  )
}

const style = StyleSheet.create({
  bottomWrap: {
    height: '80%',
    flexDirection: 'row',
    paddingHorizontal: 36,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default PlayDetailBottom
