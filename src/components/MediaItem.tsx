import { Text, View } from 'react-native'
import type { MediaItemType } from './types'
function MediaItem({
  position,
  MediaName,
  description
}: MediaItemType.MediaItemProps): JSX.Element {
  return (
    <>
      <View
        style={{
          height: 48,
          flexDirection: 'row'
        }}>
        <View
          style={{
            width: '15%',
            height: '100%',
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text>{position}</Text>
        </View>
        <View
          style={{
            width: '65%',
            height: '100%',
            backgroundColor: 'blue'
          }}></View>
        <View
          style={{
            width: '20%',
            height: '100%',

            backgroundColor: 'yellow'
          }}></View>
      </View>
    </>
  )
}

export default MediaItem
