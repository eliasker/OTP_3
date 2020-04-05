import React from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { ListItem, Avatar } from 'react-native-elements'


const showIcon = (iconName) => (
  <Feather name={iconName} style={styles.icon} />
)

const AccountScreen = () => {
  const placeholder = require('../image/placeholder-profile.png')

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <ListItem
        title="Mirka"
        subtitle="mirka-kissa"
        leftAvatar={<Avatar rounded size="large" source={ placeholder } />}
        containerStyle={{backgroundColor: '#0000'}}
        titleStyle={{color: 'white'}}
        subtitleStyle={{color: '#fffa'}} />

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity>
          <ListItem
            title="Change name"
            containerStyle={{backgroundColor: '#45566b'}}
            titleStyle={{color: 'white'}}
            subtitleStyle={{color: '#fffa'}}
            bottomDivider
            chevron />
        </TouchableOpacity>
        <TouchableOpacity>
          <ListItem
            title="Change password"
            containerStyle={{backgroundColor: '#45566b'}}
            titleStyle={{color: 'white'}}
            subtitleStyle={{color: '#fffa'}}
            chevron />
        </TouchableOpacity>
        
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity>
          <ListItem
            title="Language"
            containerStyle={{backgroundColor: '#45566b'}}
            titleStyle={{color: 'white'}}
            subtitleStyle={{color: '#fffa'}}
            bottomDivider
            chevron />
        </TouchableOpacity>
        <TouchableOpacity>
          <ListItem
            title="Delete user"
            containerStyle={{backgroundColor: '#45566b'}}
            titleStyle={{color: 'white'}}
            subtitleStyle={{color: '#fffa'}}
            chevron />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

AccountScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Feather name='menu' style={styles.menu} />
    </TouchableOpacity>),
    title: null,
    headerStyle: {
      backgroundColor: '#2d3f54',
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
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
  title: {
    fontSize: 20,
    color: 'white',
    margin: 16,
  },
  menu: {
    fontSize: 24,
    marginLeft: 12,
    color: '#fffa'
  },
  scrollView: {
    
  },
})

export default AccountScreen