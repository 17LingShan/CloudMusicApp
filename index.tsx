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
import 'react-native-gesture-handler'
import { name as appName } from './app.json'
import StackRoot from '@/navigation/StackRoot'
import DrawerMenu from '@/components/DrawerMenu'
import CustomBackGround from '@/layout/CustomBackGround'

const Drawer = createDrawerNavigator()

function Music(): JSX.Element {
  useEffect(() => {
    return () => {
      console.log('destroy')
    }
  }, [])

  return (
    <>
      <PaperProvider>
        <CustomBackGround>
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
        </CustomBackGround>
      </PaperProvider>
    </>
  )
}

AppRegistry.registerComponent(appName, () => Music)
TrackPlayer.registerPlaybackService(() => async () => {})
