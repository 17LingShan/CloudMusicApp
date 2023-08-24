import { playTracker } from '@/jotai/player'
import { SongType } from '@/jotai/types'
import { CommonActions, NavigationProp } from '@react-navigation/core'

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
  navigation.dispatch(
    CommonActions.navigate({ name: 'playDetail', params: songInfo })
  )
  await playTracker(songInfo)
}

export function formatMinute(second: number): string {
  return `${Math.floor(second / 60)
    .toString()
    .padStart(2, '0')}:${Math.floor(second % 60)
    .toString()
    .padStart(2, '0')}`
}
