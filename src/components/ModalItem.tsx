import playerStore from '@/mobx/player'
import { SongType } from '@/mobx/types'
import { useNavigation } from '@react-navigation/core'
import { Button, View } from 'react-native'
import { useTheme } from 'react-native-paper'

function ModalItem({
  trackInfo
}: {
  trackInfo: SongType.SongProps
}): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <>
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: theme.colors.background,
          borderRadius: 40
        }}>
        <Button
          title="add to next play"
          onPress={() => {
            playerStore.setNextTrack(trackInfo)
            navigation.goBack()
          }}
        />
      </View>
    </>
  )
}

export default ModalItem
