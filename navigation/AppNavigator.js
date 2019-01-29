import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from './../screens/LoadingScreen';
import LoginScreen from './../screens/LoginScreen';
import SignUpScreen from './../screens/SignUpScreen';

const AppStack = createStackNavigator({Main: MainTabNavigator});
const AuthStack = createStackNavigator({Login: LoginScreen});
const SignUpStack = createStackNavigator({SignUp: SignUpScreen});

export default createAppContainer(createSwitchNavigator(
  {
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  //Main: MainTabNavigator,
    AuthLoading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    SignUp: SignUpStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
));