import { createStackNavigator } from '@react-navigation/stack'
import PlayDetailScreen from '@/screen/PlayDetailScreen'
import SettingsScreen from '@/screen/SettingsScreen'
import SearchScreen from '@/screen/SearchScreen'
import AlbumScreen from '@/screen/AlbumScreen'
import AboutScreen from '@/screen/AboutScreen'
import TrackModal from '@/screen/TrackModal'
import WebScreen from '@/screen/WebScreen'
import TabNavigator from './TabNavigator'
import LoginScreen from '@/screen/LoginScreen'

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
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: 'transparentModal'
          }}>
          <Stack.Screen name="TrackItemModal" component={TrackModal} />
          <Stack.Screen name="webView" component={WebScreen} />
        </Stack.Group>
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
