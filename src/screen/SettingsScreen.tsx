import { Text, View } from 'react-native'

function SettingsScreen(): JSX.Element {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{ fontSize: 48 }}>SettingsScreen</Text>
      </View>
    </>
  )
}

export default SettingsScreen
