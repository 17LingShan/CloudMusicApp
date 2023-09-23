import { StyleSheet, Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { observer } from 'mobx-react'
import ThemeStore from '@/mobx/theme'
import RippleIcon from './RippleIcon'
import type { TrackItemType } from './types'
import { screenHeight } from '@/util/common'

function TrackItem({
  position,
  trackInfo,
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
              <Text
                numberOfLines={1}
                style={{
                  ...styles.titleText,
                  color: ThemeStore.surface
                }}>
                {trackInfo.title}
              </Text>
            </View>
            <View style={styles.descriptionStyle}>
              {trackInfo.fee === 1 ? (
                <Text
                  style={{
                    ...styles.descriptionVIP,
                    color: ThemeStore.primary
                  }}>
                  VIP
                </Text>
              ) : null}
              <Text
                numberOfLines={1}
                style={{
                  ...styles.descriptionText,
                  color: ThemeStore.surface
                }}>
                {`${trackInfo.fee}-${trackInfo.artist}-${trackInfo.album}`}
              </Text>
            </View>
          </View>
          <View style={styles.iconWrap}>
            <View style={styles.iconContainer}>
              <RippleIcon iconName="movie-filter" color={ThemeStore.backdrop} />
            </View>
            <View style={styles.iconContainer}>
              <RippleIcon
                iconName="list"
                color={ThemeStore.backdrop}
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
    height: screenHeight * 0.08,
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
  titleText: {
    height: '100%',
    fontSize: 16,
    lineHeight: screenHeight * 0.08 * 0.6
  },
  descriptionStyle: {
    height: '40%',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  descriptionVIP: {
    marginRight: 8,
    fontSize: 12
  },
  descriptionText: {
    fontSize: 12
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
export default observer(TrackItem)
