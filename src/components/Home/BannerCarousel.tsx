import { Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/core'
import Carousel from 'react-native-reanimated-carousel'
import { BannerType } from '@/mobx/types'
import { screenWidth } from '@/util/common'

function BannerCarousel({
  bannerList
}: {
  bannerList: BannerType.BannerList
}): JSX.Element {
  const navigation = useNavigation()

  return (
    <>
      <View>
        <Carousel
          loop={true}
          width={screenWidth}
          height={screenWidth / 2.57}
          autoPlay={true}
          data={bannerList}
          scrollAnimationDuration={5000}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (item.url) {
                  navigation.dispatch(
                    CommonActions.navigate({ name: 'WebView', params: item })
                  )
                }
              }}>
              <View style={style.bannerWrap}>
                <Image
                  style={style.bannerImg}
                  source={{ uri: item.pic + '?param=500y500' }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  )
}

const style = StyleSheet.create({
  bannerWrap: { paddingHorizontal: 10 },
  bannerImg: { aspectRatio: 2.57, borderRadius: 26 }
})

export default BannerCarousel
