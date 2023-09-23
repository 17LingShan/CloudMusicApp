import React from 'react'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ThemeStore from '@/mobx/theme'
import { hexToRGB } from '@/util/common'
import StackHome from './StackHome'
import StackPlay from './StackPlay'
import StackUser from './StackUser'
import PlayBottomBar from '@/components/PlayBottomBar'
import BackGround from '@/components/BackGround'

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
              return <BackGround />
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

export default observer(TabNavigator)
