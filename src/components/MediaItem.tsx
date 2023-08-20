import { StyleSheet, Text, View } from 'react-native'
import type { MediaItemType } from './types'
import { playTracker } from '@/jotai/player'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

function MediaItem({
  position,
  songInfo
}: MediaItemType.MediaItemProps): JSX.Element {
  return (
    <>
      <TouchableRipple
        onPress={() => playTracker(songInfo)}
        style={{ width: '100%' }}
        rippleColor="rgba(0, 0, 0, .32)">
        <View style={{ width: '100%', height: 60, flexDirection: 'row' }}>
          <View
            style={{
              width: '10%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.7
            }}>
            <Text>{position}</Text>
          </View>
          <View style={{ width: '65%', justifyContent: 'space-between' }}>
            <View style={{ ...styles.textContainer, height: '60%' }}>
              <Text numberOfLines={1} style={{ fontSize: 20 }}>
                {songInfo.title}
              </Text>
            </View>
            <View style={{ ...styles.textContainer, height: '40%' }}>
              <Text numberOfLines={1}>
                {`${songInfo.artist} - ${songInfo.album}`}
              </Text>
            </View>
          </View>
          <View style={{ width: '25%', flexDirection: 'row' }}>
            <View style={styles.iconContainer}>
              <Icon name="movie-filter" size={24} />
            </View>
            <View style={styles.iconContainer}>
              <Icon name="list" size={24} />
            </View>
          </View>
        </View>
      </TouchableRipple>
    </>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 8,
    overflow: 'hidden'
  },
  iconContainer: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MediaItem
