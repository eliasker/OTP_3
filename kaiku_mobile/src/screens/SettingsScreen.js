import React from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'


const showIcon = (iconName) => (
  <Feather name={iconName} style={styles.icon} />
)

const SettingsScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </SafeAreaView>
  )
}

SettingsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Feather name='menu' style={styles.menu} />
    </TouchableOpacity>),
    title: 'Settings',
    headerStyle: {
      backgroundColor: '#2d3f54',
    },
    headerTintColor: '#fffc',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3f56',
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  menu: {
    fontSize: 24,
    marginLeft: 12,
    color: '#fffa'
  },
})

export default SettingsScreen