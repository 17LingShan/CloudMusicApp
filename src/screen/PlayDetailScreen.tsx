import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import Slider from '@react-native-community/slider'

import PlayDetailHeader from '@/components/PlayDetail/PlayDetailHeader'
import PlayDetailBottom from '@/components/PlayDetail/PlayDetailBottom'
import { formatMinute } from '@/util/common'
import playerStore from '@/mobx/player'

import PlayDetailCenter from '@/components/PlayDetail/PlayDetailCenter'
import PlayDetailSlider from '@/components/PlayDetail/PlayDetailSlider'

function PlayDetailScreen(): JSX.Element {
  const theme = useTheme()
  const { position, duration } = useProgress()

  return (
    <>
      <View style={{ flex: 1 }}>
        <PlayDetailHeader trackInfo={toJS(playerStore.currentTrack)} />
        <View
          style={{
            position: 'relative',
            flex: 1,
            backgroundColor: theme.colors.background
          }}>
          <PlayDetailCenter trackInfo={playerStore.currentTrack} />
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: '40%',
                paddingHorizontal: '5%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <PlayDetailSlider />
            </View>
            <View style={{ height: '60%' }}>
              <PlayDetailBottom isPlaying={toJS(playerStore.isPlaying)} />
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default observer(PlayDetailScreen)
