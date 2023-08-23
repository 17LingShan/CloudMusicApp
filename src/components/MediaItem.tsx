import type { MediaItemType } from './types'
import { playTracker, useTrackPlayer } from '@/jotai/player'
import { useTheme } from 'react-native-paper'
import { useNavigation, CommonActions } from '@react-navigation/core'
import CommonListItem from './CommonListItem'

function MediaItem({
  position,
  songInfo
}: MediaItemType.MediaItemProps): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()
  const handlePressItem = async () => {
    navigation.dispatch(
      CommonActions.navigate({ name: 'playDetail', params: songInfo })
    )
    await playTracker(songInfo)
  }

  const handlePressModalIcon = () => {
    navigation.dispatch(
      CommonActions.navigate({ name: 'MediaItemModal', params: songInfo })
    )
  }

  return (
    <>
      {/* <TouchableRipple
        onPress={async () => await handlePressItem()}
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
              <RippleIcon
                iconName="list"
                color={theme.colors.shadow}
                onPress={() => handlePressModalIcon()}
              />
            </View>
          </View>
        </View>
      </TouchableRipple> */}
      <CommonListItem
        position={position}
        songInfo={songInfo}
        iconColor={theme.colors.shadow}
        onPress={handlePressItem}
        onPressIcon={() => handlePressModalIcon()}
      />
    </>
  )
}

export default MediaItem
