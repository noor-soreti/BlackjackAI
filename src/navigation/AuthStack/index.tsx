import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IntroScreens from '../../screens/RootScreens/IntroScreens';
import SignupScreen from '../../screens/RootScreens/SignupScreens';
import CreateAccount from '../../screens/RootScreens/SignupScreens/CreateAccount';  
import PreBoard from '../../screens/RootScreens/PreBoard/PreBoard';
const Stack = createStackNavigator();

const routes = [
  {name: 'PreBoard', component: PreBoard},
  {name: 'IntroScreen', component: IntroScreens},
  {name: 'SignupScreen', component: SignupScreen},
  {name: 'CreateAccount', component: CreateAccount},
];

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
}

export default AuthStack;
