import { CommonActions, NavigationProp } from '@react-navigation/core'
import { playTrack } from './playTool'
import { SongType } from '@/mobx/types'

export function handlePressModalIcon(
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  trackInfo: SongType.SongProps
) {
  navigation.dispatch(
    CommonActions.navigate({ name: 'TrackItemModal', params: trackInfo })
  )
}

export async function handlePressItem(
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  trackInfo: SongType.SongProps
) {
  navigation.dispatch(CommonActions.navigate('PlayDetail'))
  await playTrack(trackInfo)
}
