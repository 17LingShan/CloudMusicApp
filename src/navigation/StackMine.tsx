import { Text, View } from 'react-native'

function StackMine(): JSX.Element {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{ fontSize: 48 }}>Mine</Text>
      </View>
    </>
  )
}

export default StackMine
