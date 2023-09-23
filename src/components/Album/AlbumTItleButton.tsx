import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { formatCount } from '@/util/common'

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
        <TouchableOpacity style={style.touchWrap}>
          <Icon name={icon} size={16} style={style.touchIcon}></Icon>
          <Text style={style.touchText} numberOfLines={1}>
            {formatCount(count)}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  touchWrap: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '15%',
    backgroundColor: '#DDDDDD',
    opacity: 0.7,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row'
  },
  touchIcon: { width: '30%' },
  touchText: { width: '60%', fontSize: 14 }
})

export default AlbumTitleButton
