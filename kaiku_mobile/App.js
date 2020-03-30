import React from 'react'
import {  createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Provider } from './src/context/AuthContext'
import { setNavigator } from './src/navigationRef'
import { ThemeProvider } from 'react-native-elements'

import IndexScreen from './src/screens/IndexScreen'
import ChatScreen from './src/screens/ChatScreen'
import GroupScreen from './src/screens/GroupScreen'
import SigninScreen from './src/screens/SigninScreen'

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    home: createStackNavigator({
      Index: IndexScreen,
      Chat: ChatScreen
    }),
    group: createStackNavigator({
      Group: GroupScreen,
      Chat: ChatScreen
    })
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
        <App ref={(navigator) => {setNavigator(navigator)} } />
      </ThemeProvider>
    </Provider>
  )
}