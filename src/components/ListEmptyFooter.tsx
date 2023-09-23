import { View } from 'react-native'
import { screenHeight } from '@/util/common'

function ListEmptyFooter(): JSX.Element {
  return (
    <>
      <View style={{ height: screenHeight * 0.3 }} />
    </>
  )
}

export default ListEmptyFooter
