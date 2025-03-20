import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  CommunityActiveIcon,
  CommunityIcon,
  HomeActiveIcon,
  HomeIcon,
  PlanActiveIcon,
  PlanIcon,
  TaskActiveIcon,
  TaskIcon,
} from '../../../assets/Svg';
import IndexCommunityScreen from '../../../screens/CommunityScreen/indexCommuinity';
import HomeScreen from '../../../screens/HomeScreens';
import TaskScreen from '../../../screens/TaskScreen';
import {COLORS} from '../../../styles/colors';
import PlanStack from '../PlanStack';
import IndexScreen from '../../../screens/CommunityScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const routes = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    icon: () => <HomeIcon />,
    activeIcon: () => <HomeActiveIcon />,
    backgroundColor: COLORS.primary,
  },
  {
    name: 'PlanStackScreen',
    component: PlanStack,
    icon: () => <PlanIcon />,
    activeIcon: () => <PlanActiveIcon />,
    backgroundColor: COLORS.primary,
  },
  {
    name: 'TaskScreen',
    component: TaskScreen,
    icon: () => <TaskIcon />,
    activeIcon: () => <TaskActiveIcon />,
    backgroundColor: COLORS.primary,
  },
  {
    name: 'CommunityScreen',
    component: IndexScreen,
    icon: () => <CommunityIcon />,
    activeIcon: () => <CommunityActiveIcon />,
    backgroundColor: COLORS.primary,
  },
];
function BottomTab() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => <View style={styles.background} />,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          minHeight: 102,
          borderColor: '#434343',
          paddingBottom: insets.bottom,
          backgroundColor: '#0e0e0e',
        },
        tabBarItemStyle: {
          marginTop: 8,
          paddingTop: 10,
          flexDirection: 'row',
          // alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center',
        },
        tabBarShowLabel: false,
      }}
      initialRouteName="HomeScreen">
      {routes.map((route, index) => (
        <Tab.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={{
            tabBarIcon: ({focused}: {focused: boolean}) =>
              focused ? route?.activeIcon() : route.icon(),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  background: {
    height: 50,
    backgroundColor: '#0e0e0e',
    flex: 1,
  },
});
