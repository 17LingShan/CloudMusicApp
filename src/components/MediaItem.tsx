import { Text, View } from 'react-native'
import type { MediaItemType } from './types'
import { playTracker } from '@/jotai/player'

function MediaItem({
  position,
  songInfo,
  onPress
}: MediaItemType.MediaItemProps): JSX.Element {
  return (
    <>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          borderWidth: 1
        }}>
        <View
          style={{
            width: '10%',
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
            justifyContent: 'space-between',
            backgroundColor: 'skyblue'
          }}>
          <View style={{ height: '50%', backgroundColor: 'pink' }}>
            <Text
              onPress={() => {
                console.log('onPress')
                console.log('mediaItem', songInfo)

                playTracker(songInfo)
              }}>
              {songInfo.title}
            </Text>
          </View>
          <View style={{ height: '50%' }}>
            <Text>{songInfo.artist}</Text>
          </View>
        </View>
        <View
          style={{
            width: '30%',
            height: '100%',
            backgroundColor: 'yellow'
          }}></View>
      </View>
    </>
  )
}

export default MediaItem