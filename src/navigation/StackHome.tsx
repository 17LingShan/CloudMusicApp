import { Text, View } from 'react-native'

function StackHome(): JSX.Element {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{ fontSize: 48 }}>Home</Text>
      </View>
    </>
  )
}

export default StackHome
