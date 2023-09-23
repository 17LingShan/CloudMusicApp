import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import ThemeStore from '@/mobx/theme'
import PlayerStore from '@/mobx/player'
import { handleFetchLyric, showToastErr } from '@/util/common'
import PlayDetailHeader from '@/components/PlayDetail/PlayDetailHeader'
import PlayDetailBottom from '@/components/PlayDetail/PlayDetailBottom'
import PlayDetailCenter from '@/components/PlayDetail/PlayDetailCenter'
import PlayDetailSlider from '@/components/PlayDetail/PlayDetailSlider'

function PlayDetailScreen(): JSX.Element {
  const handleLyric = async (id: number) => {
    if (!id) return
    await handleFetchLyric({ id: id })
      .then(res => {
        PlayerStore.setCurrentTrack({
          ...PlayerStore.currentTrack,
          lyric: res
        })
      })
      .catch(err => {
        showToastErr({ message: '获取歌词失败！' })
      })
  }

  useEffect(() => {
    handleLyric(PlayerStore.currentTrack.id)
  }, [PlayerStore.currentTrack.id])

  return (
    <>
      <View style={style.detailWrap}>
        <PlayDetailHeader trackInfo={toJS(PlayerStore.currentTrack)} />
        <View
          style={{
            ...style.centerWrap,
            backgroundColor: ThemeStore.detailBackground
          }}>
          <PlayDetailCenter trackInfo={toJS(PlayerStore.currentTrack)} />
          <View style={style.sliderWrap}>
            <View style={style.sliderContainer}>
              <PlayDetailSlider />
            </View>
            <View style={style.bottomWrap}>
              <PlayDetailBottom isPlaying={toJS(PlayerStore.isPlaying)} />
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  detailWrap: { flex: 1 },
  centerWrap: { flex: 1 },
  sliderWrap: { flex: 1 },
  sliderContainer: {
    height: '40%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomWrap: { height: '60%' }
})

export default observer(PlayDetailScreen)
