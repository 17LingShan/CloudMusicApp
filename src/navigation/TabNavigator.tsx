import { ImageBackground } from 'react-native'
import { useTheme } from 'react-native-paper'
import { toJS } from 'mobx'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import PlayBottomBar from '@/components/PlayBottomBar'
import CoverImg from '@/assets/cover.jpg'
import StackHome from './StackHome'
import StackPlay from './StackPlay'
import StackUser from './StackUser'
import UserStore from '@/mobx/user'

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
      name: 'Home',
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
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={
          UserStore.backgroundUrl
            ? { uri: toJS(UserStore.backgroundUrl) }
            : CoverImg
        }>
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
                  tabBarHideOnKeyboard: true,
                  tabBarActiveTintColor: '#dfcbce',
                  tabBarInactiveTintColor: '#4a1e23'
                }}
              />
            )
          })}
        </Tab.Navigator>
        <PlayBottomBar />
      </ImageBackground>
    </>
  )
}

export default TabNavigator
