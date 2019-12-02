import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';

import { MonoText } from '../components/StyledText';
import SignUpFormScreen from '../screens/SignUpFormScreen';

const AuthStack = createStackNavigator({ SignIn: SignInScreen,SignUp:SignUpFormScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoadingScreen,
      Main: MainTabNavigator,
      Auth: AuthStack,
      
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
