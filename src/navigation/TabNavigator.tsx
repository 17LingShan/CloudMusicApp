import React from 'react'
import { Image } from 'react-native'
import { useTheme } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomBackGround from '@/layout/CustomBackGround'
import PlayBottomBar from '@/components/PlayBottomBar'
import StackHome from './StackHome'
import StackPlay from './StackPlay'
import StackUser from './StackUser'
import UserStore from '@/mobx/user'
import { hexToRGB } from '@/util/common'
import CoverImg from '@/assets/cover.jpg'

const Tab = createBottomTabNavigator()

function TabNavigator(): JSX.Element {
  const theme = useTheme()

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
      <CustomBackGround>
        <React.Fragment>
          <Tab.Navigator
            backBehavior="none"
            screenOptions={{
              tabBarActiveBackgroundColor: `rgba(${hexToRGB(
                theme.colors.background
              )},0.7)`,
              tabBarBackground() {
                return (
                  <>
                    <Image
                      style={{ height: '100%', width: '100%' }}
                      blurRadius={10}
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
      </CustomBackGround>
    </>
  )
}

export default observer(TabNavigator)
