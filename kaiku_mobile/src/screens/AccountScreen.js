import React, { useContext } from 'react'
import { Context as LangContext } from '../context/LangContext'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { ListItem, Avatar } from 'react-native-elements'
import Spacer from '../components/Spacer'
import Title from '../components/Title'
import { Context as AuthContext } from '../context/AuthContext'


const showIcon = (iconName) => (
  <Feather name={iconName} style={styles.icon} />
)

const AccountScreen = ({ navigation }) => {
  const { account_title, settings_title, change_name_label, change_password_label, change_lang_label, delete_user_label, help_label } = useContext(LangContext).state.lang
  const { loggedUser } = useContext(AuthContext).state
  const placeholder = require('../image/placeholder-profile.png')

  return (
    <SafeAreaView style={styles.container}>
      <Title title={account_title} />
      <ListItem
        title={`${loggedUser.name}`}
        subtitle={`@${loggedUser.username}`}
        leftAvatar={<Avatar rounded size="large" source={ placeholder } />}
        containerStyle={{backgroundColor: '#0000'}}
        titleStyle={{color: 'white'}}
        subtitleStyle={{color: '#fffa'}} />

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={() => navigation.navigate('nameForm')}>
          <ListItem
            title={change_name_label}
            containerStyle={{backgroundColor: '#45566b'}}
            titleStyle={{color: 'white'}}
            subtitleStyle={{color: '#fffa'}}
            bottomDivider
            chevron />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('passwordForm')}>
          <ListItem
            title={change_password_label}
            containerStyle={{backgroundColor: '#45566b'}}
            titleStyle={{color: 'white'}}
            subtitleStyle={{color: '#fffa'}}
            chevron />
        </TouchableOpacity>
        
        <Text style={styles.title}>{settings_title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('language')}>
          <ListItem
            title={change_lang_label}
            containerStyle={{backgroundColor: '#45566b'}}
            titleStyle={{color: 'white'}}
            subtitleStyle={{color: '#fffa'}}
            bottomDivider
            chevron />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('help')}>
          <ListItem
            title={help_label}
            containerStyle={{backgroundColor: '#45566b'}}
            titleStyle={{color: 'white'}}
            subtitleStyle={{color: '#fffa'}}
            chevron />
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity>
          <ListItem
            title={delete_user_label}
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