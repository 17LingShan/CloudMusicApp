import { formatCount } from '@/util/common'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

function AlbumTitleButton({
  icon,
  count
}: {
  icon: string
  count: number
}): JSX.Element {
  return (
    <>
      <View style={{ width: '33%', padding: 10 }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            paddingHorizontal: '15%',
            backgroundColor: '#DDDDDD',
            opacity: 0.7,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 30,
            flexDirection: 'row'
          }}>
          <Icon name={icon} size={16} style={{ width: '30%' }}></Icon>
          <Text
            style={{
              width: '60%',
              fontSize: 14
            }}
            numberOfLines={1}>
            {formatCount(count)}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default AlbumTitleButton
