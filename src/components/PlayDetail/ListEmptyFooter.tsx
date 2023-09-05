import { screenHeight } from '@/util/common'
import { View } from 'react-native'

function ListEmptyFooter(): JSX.Element {
  return (
    <>
      <View style={{ height: screenHeight * 0.15 }} />
    </>
  )
}

export default ListEmptyFooter
