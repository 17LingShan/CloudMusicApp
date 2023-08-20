import { useTheme } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import StackHome from './StackHome'
import StackPlay from './StackPlay'
import StackMine from './StackMine'
import PlayBottomBar from '@/components/PlayBottomBar'
import React from 'react'

const Tab = createBottomTabNavigator()

function TabNavigator(): JSX.Element {
  const theme = useTheme()

  const handleIcon: TabNavigatorType.HandleIcon = iconName => {
    return ({ focused, color, size }) => {
      return <Icon name={iconName} color={color} size={size} />
    }
  }

  const CommonRoutes = [
    {
      name: 'Home',
      icon: handleIcon('home'),
      component: StackHome
    },
    {
      name: 'play',
      icon: handleIcon('play'),
      component: StackPlay
    },
    {
      name: 'user',
      icon: handleIcon('user'),
      component: StackMine
    }
  ]

  return (
    <React.Fragment>
      <Tab.Navigator
        backBehavior="none"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.primary
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
                tabBarActiveTintColor: '#dfcbce',
                tabBarInactiveTintColor: '#4a1e23'
              }}
            />
          )
        })}
      </Tab.Navigator>
      <PlayBottomBar />
    </React.Fragment>
  )
}

export default TabNavigator
