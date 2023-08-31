import { Image, View, TouchableOpacity } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/core'
import Carousel from 'react-native-reanimated-carousel'
import { BannerType } from '@/mobx/types'
import { screenWidth } from '@/util/common'

function BannerCarousel({
  bannerList
}: {
  bannerList: BannerType.BannerList
}): JSX.Element {
  const width = screenWidth
  const navigation = useNavigation()

  return (
    <>
      <View>
        <Carousel
          loop={true}
          width={width}
          height={width / 2.57}
          autoPlay={true}
          data={bannerList}
          scrollAnimationDuration={5000}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                if (item.url) {
                  console.log(item)
                  navigation.dispatch(
                    CommonActions.navigate({ name: 'webView', params: item })
                  )
                }
              }}>
              <View style={{ paddingHorizontal: 10 }}>
                <Image
                  source={{ uri: item.pic }}
                  style={{ aspectRatio: 2.57, borderRadius: 26 }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  )
}

export default BannerCarousel
