import type { TrackItemType } from './types'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import RippleIcon from './RippleIcon'

function TrackItem({
  position,
  trackInfo,
  iconColor,
  onPressItem,
  onPressIcon
}: TrackItemType.TrackItemProps): JSX.Element {
  return (
    <>
      <TouchableRipple rippleColor="rgba(0,0,0,0.4)" onPress={onPressItem}>
        <View style={styles.itemContainer}>
          <View style={styles.positionStyle}>
            <Text>{position}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.titleStyle}>
              <Text numberOfLines={1} style={{ fontSize: 20 }}>
                {trackInfo.title}
              </Text>
            </View>
            <View style={styles.descriptionStyle}>
              {trackInfo.fee === 1 ? (
                <Text style={{ marginRight: 8, color: '#e92645' }}>VIP</Text>
              ) : null}
              <Text numberOfLines={1}>
                {`${trackInfo.fee} - ${trackInfo.artist} - ${trackInfo.album}`}
              </Text>
            </View>
          </View>
          <View style={styles.iconWrap}>
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
  itemContainer: {
    height: 60,
    flexDirection: 'row'
  },
  positionStyle: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7
  },
  infoContainer: {
    width: '65%',
    justifyContent: 'space-between'
  },

  titleStyle: {
    height: '60%',
    justifyContent: 'center',
    paddingHorizontal: 8,
    overflow: 'hidden'
  },
  descriptionStyle: {
    height: '40%',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  iconWrap: {
    width: '25%',
    flexDirection: 'row'
  },
  iconContainer: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default TrackItem
