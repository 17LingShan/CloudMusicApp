import { createStackNavigator } from '@react-navigation/stack'
import PlayDetailScreen from '@/screen/PlayDetailScreen'
import SettingsScreen from '@/screen/SettingsScreen'
import SearchScreen from '@/screen/SearchScreen'
import AlbumScreen from '@/screen/AlbumScreen'
import LoginScreen from '@/screen/LoginScreen'
import AboutScreen from '@/screen/AboutScreen'
import TrackModal from '@/screen/TrackModal'
import WebScreen from '@/screen/WebScreen'
import TabNavigator from './TabNavigator'

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
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'setting' }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'about' }}
        />
        <Stack.Screen
          name="Album"
          component={AlbumScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />

        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: 'transparentModal'
          }}>
          <Stack.Screen name="TrackItemModal" component={TrackModal} />
          <Stack.Screen name="WebView" component={WebScreen} />
        </Stack.Group>

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="PlayDetail"
            component={PlayDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </>
  )
}

export default StackRoot
