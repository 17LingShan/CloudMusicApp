import AboutScreen from '@/screen/AboutScreen'
import Home from '@/screen/HomeScreen'
import SettingsScreen from '@/screen/SettingsScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'

const Stack = createNativeStackNavigator()

function StackRoot(): JSX.Element {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="home" component={Home} />
        <Stack.Screen
          name="settings"
          component={SettingsScreen}
          options={{ title: 'setting' }}
        />
        <Stack.Screen
          name="about"
          component={AboutScreen}
          options={{ title: 'about' }}
        />
      </Stack.Navigator>
    </>
  )
}

export default StackRoot
