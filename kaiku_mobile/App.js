import React from 'react'
import {  createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Provider } from './src/context/AuthContext'
import { setNavigator } from './src/navigationRef'
import { ThemeProvider } from 'react-native-elements'

import IndexScreen from './src/screens/IndexScreen'
import ChatScreen from './src/screens/ChatScreen'
import SigninScreen from './src/screens/SigninScreen'
import LoadingScreen from './src/screens/LoadingScreen'
import LogoutHandler from './src/components/LogoutHandler'

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
  }),
  mainFlow: createDrawerNavigator({
    Home: createStackNavigator({
      Index: IndexScreen,
      Chat: ChatScreen
    }),
    Logout: LogoutHandler,
  }, {
    drawerBackgroundColor: '#1d2f44'
  })
})

const App = createAppContainer(switchNavigator)

const theme = {
  colors: {
    primary: '#4d5f76',
    secondary: 'green',
    grey0: 'yellow',
    grey1: 'red',
    grey2: 'blue',
    grey3: 'white',
    grey4: 'white',
    grey5: 'white',
    greyOutline: 'white',
    searchBg: 'white',
    platform: {
      android: {
        primary: 'white',
        secondary: 'white',
        success: 'white',
        error: 'white',
        warning: 'white',
      },
      ios: {
        primary: 'white',
        secondary: 'white',
        success: 'white',
        error: 'white',
        warning: 'white',
      },
    }
  }
}

export default () => {
  return(
    <Provider>
      <ThemeProvider theme={theme}>
        <App theme="dark" ref={(navigator) => {setNavigator(navigator)} } />
      </ThemeProvider>
    </Provider>
  )
}