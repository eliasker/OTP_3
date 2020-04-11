import React from 'react'
import {  createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as LangProvider } from './src/context/LangContext'
import { setNavigator } from './src/navigationRef'
import { ThemeProvider } from 'react-native-elements'
import { Feather } from '@expo/vector-icons'

import IndexScreen from './src/screens/IndexScreen'
import ChatScreen from './src/screens/ChatScreen'
import SigninScreen from './src/screens/SigninScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import LogoutHandler from './src/components/LogoutHandler'
import AccountScreen from './src/screens/AccountScreen'
import CustomDrawer from './src/components/CustomDrawer'
import LanguageScreen from './src/screens/settings/LanguageScreen'
import HelpScreen from './src/screens/settings/HelpScreen'
import ChangeNameForm from './src/screens/settings/ChangeNameForm'
import ChangePasswordForm from './src/screens/settings/ChangePasswordForm'


const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
  }),
  mainFlow: createDrawerNavigator({
    Home: {
      screen: createStackNavigator({
        Index: IndexScreen,
        Chat: ChatScreen,
      }),
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Feather name="home" size={24} style={{ color: tintColor }} />
        ),
      },
    },
    Account: {
      screen: createStackNavigator({
        account: AccountScreen,
        language: LanguageScreen,
        nameForm: ChangeNameForm,
        passwordForm: ChangePasswordForm,
        help: HelpScreen
      }),
      navigationOptions: {
        drawerLabel: 'Account',
        drawerIcon: ({ tintColor }) => (
          <Feather name="user" size={24} style={{ color: tintColor }} />
        ),
      },
    },
    Logout: {
      screen: LogoutHandler,
      navigationOptions: {
        drawerLabel: 'Log out',
        drawerIcon: ({ tintColor }) => (
          <Feather name="log-out" size={24} style={{ color: tintColor }} />
        ),
      },
    },
  }, {
    drawerBackgroundColor: '#1D2637',
    contentComponent: CustomDrawer
  })
})

const App = createAppContainer(switchNavigator)

const theme = {
  colors: {
    primary: '#4d5f76'
  }
}

export default () => {
  return(
    <AuthProvider>
      <LangProvider>
        <ThemeProvider theme={theme}>
          <App theme="dark" ref={(navigator) => {setNavigator(navigator)} } />
        </ThemeProvider>
      </LangProvider>
    </AuthProvider>
  )
}