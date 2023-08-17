import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CommonHeader from '@/components/CommonHeader'
import HomeScreen from '@/screen/HomeScreen'

const Stack = createNativeStackNavigator()

function StackHome(): JSX.Element {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          children={() => <HomeScreen />}
          options={{
            header: () => <CommonHeader />
          }}
        />
      </Stack.Navigator>
    </>
  )
}

export default StackHome
