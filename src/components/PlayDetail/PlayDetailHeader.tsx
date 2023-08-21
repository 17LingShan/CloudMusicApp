import {
  Animated,
  Dimensions,
  PanResponder,
  StatusBar,
  Text,
  View
} from 'react-native'
import { RippleIconType } from '../types'
import { useNavigation } from '@react-navigation/core'
import RippleIcon from '../RippleIcon'
import { SongType } from '@/jotai/types'
import { MarqueeHorizontal } from 'react-native-marquee-ab'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
function PlayDetailHeader({
  trackInfo
}: {
  trackInfo: SongType.SongProps
}): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()
  let mWidth = Dimensions.get('window').width * 0.6

  return (
    <>
      <View
        style={{
          paddingTop: StatusBar.currentHeight + 10,
          backgroundColor: theme.colors.primary
        }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <RippleIcon
            iconName="keyboard-arrow-down"
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              width: '60%'
            }}>
            <MarqueeHorizontal
              height="60%"
              speed={30}
              textList={[{ value: trackInfo.title }]}
              width={mWidth}
              bgContainerStyle={{
                borderRadius: 4,
                backgroundColor: theme.colors.primary
              }}
              textStyle={{
                fontSize: 18,
                color: theme.colors.surface,
                opacity: 0.8
              }}
              onTextClick={item => console.log(item)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.6
              }}>
              <Text style={{ color: theme.colors.surface }}>
                {trackInfo.artist}
              </Text>
              <Icon
                style={{ marginLeft: 8, color: theme.colors.surface }}
                name="arrow-forward-ios"
              />
            </View>
          </View>
          <RippleIcon iconName="share" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </>
  )
}

export default PlayDetailHeader
