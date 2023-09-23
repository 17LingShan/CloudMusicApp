import CommonHeader from '@/components/CommonHeader'
import PlayListScreen from '@/screen/PlayListScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function StackPlay(): JSX.Element {
  return (
    <>
      <Stack.Navigator initialRouteName="PlayList">
        <Stack.Screen
          name="PlayList"
          children={() => <PlayListScreen />}
          options={{ header: () => <CommonHeader /> }}
        />
      </Stack.Navigator>
    </>
  )
}

export default StackPlay
