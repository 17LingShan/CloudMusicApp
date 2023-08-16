import { Text, View } from 'react-native'

function StackPlay(): JSX.Element {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{ fontSize: 48 }}>play</Text>
      </View>
    </>
  )
}

export default StackPlay
