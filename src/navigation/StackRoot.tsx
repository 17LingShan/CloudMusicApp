import AboutScreen from '@/screen/AboutScreen'
import SettingsScreen from '@/screen/SettingsScreen'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from './TabNavigator'
import SearchScreen from '@/screen/SearchScreen'
import AlbumScreen from '@/screen/AlbumScreen'
import PlayDetailScreen from '@/screen/PlayDetailScreen'

const Stack = createStackNavigator()

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
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="playDetail"
            component={PlayDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </>
  )
}

export default StackRoot
