import type { MediaItemType } from './types'
import { TouchableRipple } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'
import RippleIcon from './RippleIcon'

function MediaItem({
  position,
  trackInfo,
  iconColor,
  onPressItem,
  onPressIcon
}: MediaItemType.MediaItemProps): JSX.Element {
  return (
    <>
      <TouchableRipple
        onPress={onPressItem}
        style={{ width: '100%' }}
        rippleColor="rgba(0, 0, 0, .32)">
        <View style={{ width: '100%', height: 60, flexDirection: 'row' }}>
          <View
            style={{
              width: '10%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.5
            }}>
            <Text>{position}</Text>
          </View>
          <View style={{ width: '65%', justifyContent: 'space-between' }}>
            <View style={{ ...styles.textContainer, height: '60%' }}>
              <Text numberOfLines={1} style={{ fontSize: 20 }}>
                {trackInfo.title}
              </Text>
            </View>
            <View
              style={{
                ...styles.textContainer,
                height: '40%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
              {trackInfo.fee === 1 ? (
                <Text style={{ marginRight: 8, color: '#e92645' }}>VIP</Text>
              ) : null}
              <Text numberOfLines={1}>
                {`${trackInfo.fee} - ${trackInfo.artist} - ${trackInfo.album}`}
              </Text>
            </View>
          </View>
          <View style={{ width: '25%', flexDirection: 'row' }}>
            <View style={styles.iconContainer}>
              <RippleIcon iconName="movie-filter" color={iconColor} />
            </View>
            <View style={styles.iconContainer}>
              <RippleIcon
                iconName="list"
                color={iconColor}
                onPress={onPressIcon}
              />
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
