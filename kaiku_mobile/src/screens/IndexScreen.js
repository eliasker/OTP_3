import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native'
import { Image, ListItem, Icon, Divider } from 'react-native-elements'
import Title from '../components/Title'

const groupData = [
  { name: 'Global' },
  { name: 'Dev team' },
  { name: 'Front group' },
  { name: 'Back group' },
  { name: 'Project ideas' },
  { name: 'Fun post' }
]

const userData = [
  {
    username: 'mirka-kissa',
    name: 'Mirka'
  },
  {
    username: 'johtaja_make',
    name: 'Make CEO'
  },
  {
    username: 'varaj-crisu',
    name: 'Crisu CO'
  },
  {
    username: 'jannica-hr',
    name: 'Janscu HR'
  },
  {
    username: 'senior-miro',
    name: 'SrDev. Miro'
  },
  {
    username: 'aaro-jr',
    name: 'JrDev. Aaro'
  },
  {
    username: 'designer-ancelika',
    name: 'GraSu Ancelika'
  },
  {
    username: 'mattiMeikalainen',
    name: 'Matti Asiakaspalvelu'
  }
]



const IndexScreen = ({ navigation }) => {
  const image = require('../image/placeholder-profile.png')
  const groupPlaceholder = require('../image/kaikuthumb.png')

  const renderUser = (item) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { item })}>
      <ListItem
        title={item.name}
        subtitle={item.username}
        leftAvatar={{ source: image }}
        containerStyle={{ backgroundColor: '#45566b' }}
        titleStyle={{ color: 'white' }}
        subtitleStyle={{ color: '#fffa' }}
        bottomDivider
        chevron
      />
    </TouchableOpacity>
  )

  const renderGroup = (item) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { item })} style={{ backgroundColor: '#3d4f64' }}>
      <ListItem
        leftAvatar={{ source: groupPlaceholder }}
        containerStyle={{ backgroundColor: '#3d4f64', paddingLeft: 12, paddingRight: 0, paddingBottom: 0, alignSelf: 'center' }}
        contentContainerStyle={{ display: 'none' }}
        titleStyle={{ color: 'white' }}
        subtitleStyle={{ color: '#fffa' }}
      />
      <Text style={{ paddingBottom: 30, alignSelf: 'center', paddingHorizontal: 8, backgroundColor: '#3d4f64', color: '#fffa' }}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Title title="Groups" backgroundColor='#3d4f64' />
      <FlatList keyExtractor={(item) => item.name} data={groupData} renderItem={({ item }) => renderGroup(item)}
        horizontal={true} showsHorizontalScrollIndicator={false} style={styles.rowList} />
      <Title title="Users" backgroundColor='#45566b' />
      <FlatList keyExtractor={(item) => item.name} data={userData} renderItem={({ item }) => renderUser(item)} />
    </View>
  )
}

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Feather name='menu' style={styles.menu} />
      </TouchableOpacity>),
    title: 'Kaiku',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerStyle: {
      backgroundColor: '#3d4f64',
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d3f54',
    flex: 1
  },
  row: {
    marginHorizontal: 2,
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderBottomColor: '#5d6f84',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 24,
    color: 'white'
  },
  icon: {
    fontSize: 40,
    color: 'red',
    paddingRight: 15
  },
  textLight: {
    fontSize: 20,
    color: 'white'
  },
  menu: {
    fontSize: 24,
    marginLeft: 12,
    color: '#fffa'
  },
  rowList: {
    paddingBottom: 8,
    borderColor: '#6664',
    backgroundColor: '#3d4f64',
    borderBottomWidth: 1
  }
})

export default IndexScreen