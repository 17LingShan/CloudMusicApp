import CommonHeader from '@/components/CommonHeader'
import PlayListScreen from '@/screen/PlayListScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function StackPlay(): JSX.Element {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          children={() => <PlayListScreen />}
          options={{ header: () => <CommonHeader /> }}
        />
      </Stack.Navigator>
    </>
  )
}

export default StackPlay
