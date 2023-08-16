import { Text, View } from 'react-native'

function StackLogin(): JSX.Element {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{ fontSize: 48 }}>Login</Text>
      </View>
    </>
  )
}

export default StackLogin
