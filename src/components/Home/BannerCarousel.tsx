import { BannerType } from '@/mobx/types'
import { Image, View, useWindowDimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

function BannerCarousel({
  bannerList
}: {
  bannerList: BannerType.BannerList
}): JSX.Element {
  const width = useWindowDimensions().width
  return (
    <>
      <View>
        <Carousel
          loop={true}
          width={width}
          height={width / 2.57}
          autoPlay={true}
          data={bannerList}
          scrollAnimationDuration={4000}
          renderItem={({ item, index }) => (
            <View style={{ paddingHorizontal: 10 }}>
              <Image
                source={{ uri: item.pic }}
                style={{ aspectRatio: 2.57, borderRadius: 26 }}
              />
            </View>
          )}
        />
      </View>
    </>
  )
}

export default BannerCarousel
