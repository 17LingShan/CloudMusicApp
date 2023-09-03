/**
 * @format
 */
import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { AppRegistry } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import {
  NavigationContainer,
  DefaultTheme as NavigationTheme
} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DefaultTheme, PaperProvider } from 'react-native-paper'
import type { ThemeProp } from 'react-native-paper/src/types'
import { name as appName } from './app.json'
import StackRoot from '@/navigation/StackRoot'
import DrawerMenu from '@/components/DrawerMenu'

const Drawer = createDrawerNavigator()

function Music(): JSX.Element {
  useEffect(() => {
    return () => {
      console.log('destroy')
    }
  }, [])
  const paperTheme: ThemeProp = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#e92645',
      surface: '#f2f2f2',
      onSurface: '#b3aa8c',
      onPrimary: '#c70c0c',
      background: '#3e3b3c',
      onBackground: '#ed9db2',
      shadow: '#202020'
    }
  }

  return (
    <>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer
          theme={{
            dark: false,
            colors: {
              ...NavigationTheme.colors,
              background: 'transparent'
            }
          }}>
          <Drawer.Navigator
            initialRouteName="Root"
            screenOptions={{
              headerShown: false,
              drawerStyle: {
                width: '70%'
              }
            }}
            drawerContent={() => <DrawerMenu />}>
            <Drawer.Screen name="Home" component={StackRoot} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  )
}

AppRegistry.registerComponent(appName, () => Music)
TrackPlayer.registerPlaybackService(() => async () => {})
