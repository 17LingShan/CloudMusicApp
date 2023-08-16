import { Text, View } from 'react-native'

function AboutScreen(): JSX.Element {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{ fontSize: 48 }}>AboutScreen</Text>
      </View>
    </>
  )
}

export default AboutScreen
