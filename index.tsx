/**
 * @format
 */
import 'react-native-gesture-handler'
import React, { useEffect, useMemo } from 'react'
import { AppRegistry } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { DefaultTheme, PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
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
  const theme: ThemeProp = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#e92645',
      surface: '#f2f2f2',
      onSurface: '#b3aa8c',
      onPrimary: '#c70c0c',
      background: '#3e3b3c',
      shadow: '#202020'
    }
  }

  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer>
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
