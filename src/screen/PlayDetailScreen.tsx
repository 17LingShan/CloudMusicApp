import { useEffect } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import playerStore from '@/mobx/player'
import { handleFetchLyric, showToastErr } from '@/util/common'
import PlayDetailHeader from '@/components/PlayDetail/PlayDetailHeader'
import PlayDetailBottom from '@/components/PlayDetail/PlayDetailBottom'
import PlayDetailCenter from '@/components/PlayDetail/PlayDetailCenter'
import PlayDetailSlider from '@/components/PlayDetail/PlayDetailSlider'

function PlayDetailScreen(): JSX.Element {
  const theme = useTheme()
  const handleLyric = async (id: number) => {
    if (!id) return
    await handleFetchLyric({ id: id })
      .then(res => {
        playerStore.setCurrentTrack({
          ...playerStore.currentTrack,
          lyric: res
        })
      })
      .catch(err => {
        showToastErr({ message: '获取歌词失败！' })
      })
  }

  useEffect(() => {
    handleLyric(playerStore.currentTrack.id)
  }, [playerStore.currentTrack.id])

  return (
    <>
      <View style={{ flex: 1 }}>
        <PlayDetailHeader trackInfo={toJS(playerStore.currentTrack)} />
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background
          }}>
          <PlayDetailCenter trackInfo={toJS(playerStore.currentTrack)} />
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
