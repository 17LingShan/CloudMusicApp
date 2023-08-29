import { CommonActions, NavigationProp } from '@react-navigation/core'
import { playTrack } from './playTool'
import { SongType } from '@/mobx/types'

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
  navigation.dispatch(CommonActions.navigate('playDetail'))
  await playTrack(songInfo)
}
