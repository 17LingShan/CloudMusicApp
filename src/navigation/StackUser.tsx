import { createStackNavigator } from '@react-navigation/stack'
import UserScreen from '@/screen/UserScreen'
import CommonHeader from '@/components/CommonHeader'

const Stack = createStackNavigator()

function StackUser(): JSX.Element {
  return (
    <>
      <Stack.Navigator initialRouteName="User">
        <Stack.Screen
          name="User"
          children={() => <UserScreen />}
          options={{
            header: () => <CommonHeader />
          }}
        />
      </Stack.Navigator>
    </>
  )
}

export default StackUser
