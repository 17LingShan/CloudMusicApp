import AboutScreen from '@/screen/AboutScreen'
import SettingsScreen from '@/screen/SettingsScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import SearchScreen from '@/screen/SearchScreen'
import AlbumScreen from '@/screen/AlbumScreen'

const Stack = createNativeStackNavigator()

function StackRoot(): JSX.Element {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="album"
          component={AlbumScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  )
}

export default StackRoot
