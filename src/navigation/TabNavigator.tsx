import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import UserStore from '@/mobx/user'
import ThemeStore from '@/mobx/theme'
import { hexToRGB } from '@/util/common'
import CoverImg from '@/assets/cover.jpg'
import StackHome from './StackHome'
import StackPlay from './StackPlay'
import StackUser from './StackUser'
import PlayBottomBar from '@/components/PlayBottomBar'

const Tab = createBottomTabNavigator()

function TabNavigator(): JSX.Element {
  const handleTabIcon: TabNavigatorType.HandleIcon = iconName => {
    return ({ color, size }) => {
      return <Icon name={iconName} color={color} size={size} />
    }
  }

  const CommonRoutes = [
    {
      name: 'home',
      icon: handleTabIcon('home'),
      component: StackHome
    },
    {
      name: 'play',
      icon: handleTabIcon('play'),
      component: StackPlay
    },
    {
      name: 'user',
      icon: handleTabIcon('user'),
      component: StackUser
    }
  ]

  return (
    <>
      <React.Fragment>
        <Tab.Navigator
          backBehavior="none"
          screenOptions={{
            tabBarActiveBackgroundColor: `rgba(${hexToRGB(
              ThemeStore.background
            )},0.7)`,
            tabBarBackground() {
              return (
                <>
                  <Image
                    style={{
                      ...style.backImgContainer,
                      opacity: ThemeStore.theme === 'light' ? 0.7 : 0.1
                    }}
                    blurRadius={6}
                    source={
                      UserStore.backgroundUrl
                        ? {
                            uri: toJS(
                              UserStore.backgroundUrl + '?param=500y500'
                            )
                          }
                        : CoverImg
                    }
                  />
                </>
              )
            }
          }}>
          {CommonRoutes.map((item, index) => {
            return (
              <Tab.Screen
                key={index}
                name={'stack_' + item.name}
                component={item.component}
                options={{
                  title: item.name,
                  headerShown: false,
                  tabBarIcon: item.icon,
                  tabBarHideOnKeyboard: true,
                  tabBarActiveTintColor: '#dfcbce',
                  tabBarInactiveTintColor: '#4a1e23'
                }}
              />
            )
          })}
        </Tab.Navigator>
        <PlayBottomBar />
      </React.Fragment>
    </>
  )
}

const style = StyleSheet.create({
  backImgContainer: { height: '100%', width: '100%' }
})

export default observer(TabNavigator)
