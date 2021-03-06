import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';

import { MonoText } from '../components/StyledText';
import SignUpFormScreen from '../screens/SignUpFormScreen';
import SignUpNameForm from '../screens/SignUpNameForm';
import SignUpRunForm from '../screens/SignUpRunForm';

const AuthStack = createStackNavigator(
  { SignIn: SignInScreen,SignUp: SignUpFormScreen,
    SignUpName:SignUpNameForm,SignUpRun:SignUpRunForm },
  {
    defaultNavigationOptions: {
      title: 'Sign In',
      headerStyle: {
        backgroundColor: 'forestgreen',
      },
      headerTintColor: '#0F3E15',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
    },
  }
);

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
