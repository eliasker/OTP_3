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
import SettingsScreen from './src/screens/SettingsScreen';
import AccountScreen from './src/screens/AccountScreen';
import CustomDrawer from './src/components/CustomDrawer';


const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
  }),
  mainFlow: createDrawerNavigator({
    Home: createStackNavigator({
      Index: IndexScreen,
      Chat: ChatScreen,
      
    }),
    Account: createStackNavigator({
      account: AccountScreen,
    }),
    Settings: createStackNavigator({
      settings: SettingsScreen, 
    }),
    Logout: LogoutHandler,
  }, {
    drawerBackgroundColor: '#1d2f44',
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
    <Provider>
      <ThemeProvider theme={theme}>
        <App theme="dark" ref={(navigator) => {setNavigator(navigator)} } />
      </ThemeProvider>
    </Provider>
  )
}