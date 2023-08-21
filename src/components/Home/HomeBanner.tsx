import { BannerAtom } from '@/jotai/searcher'
import { useAtom } from 'jotai'
import { Dimensions, Image, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

function HomeCarousel(): JSX.Element {
  const width = Dimensions.get('screen').width
  const [banner, _] = useAtom(BannerAtom)

  return (
    <>
      <View>
        <Carousel
          loop={true}
          width={width}
          height={width / 2.57}
          autoPlay={true}
          data={banner}
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

export default HomeCarousel
