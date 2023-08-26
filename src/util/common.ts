import { CommonActions, NavigationProp } from '@react-navigation/core'
import { playTrack, playTracker } from '@/jotai/player'
import { SongType } from '@/jotai/types'

export function formatCount(originNum: number) {
  return originNum > 10000
    ? (originNum / 10000).toFixed(1).toString() + '万'
    : originNum
}

export function handlePressModalIcon(
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  songInfo: SongType.SongProps
) {
  navigation.dispatch(
    CommonActions.navigate({ name: 'MediaItemModal', params: songInfo })
  )
}

export async function handlePressItem(
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  songInfo: SongType.SongProps
) {
  await playTrack(songInfo)
  navigation.dispatch(CommonActions.navigate('playDetail'))
}

export function formatMinute(second: number): string {
  return `${Math.floor(second / 60)
    .toString()
    .padStart(2, '0')}:${Math.floor(second % 60)
    .toString()
    .padStart(2, '0')}`
}
