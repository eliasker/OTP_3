import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native'
import { Image, ListItem } from 'react-native-elements'

const data = [
  {
    username: 'mirka-kissa',
    name: 'mirka'
  },
  {
    username: 'mirka-koira',
    name: 'koira'
  },
  {
    username: 'mirka-lehmä',
    name: 'lehmä'
  },
  {
    username: 'mirka-kukko',
    name: 'kukko'
  },
  {
    username: 'mirka-omena',
    name: 'omena'
  },
  {
    username: 'mirka-asd',
    name: 'mirka'
  },
  {
    username: 'mirka-123',
    name: 'koira'
  },
  {
    username: 'mirka-23',
    name: 'lehmä'
  },
  {
    username: 'mirka-3',
    name: 'kukko'
  },
  {
    username: 'mirka-1',
    name: 'omena'
  }
]

const IndexScreen = ({ navigation }) => {
  const image = require('../image/placeholder-profile.png')
  const groupPlaceholder = require('../image/kaikuthumb.png')

  const renderUser = (item) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
      <ListItem
        title={item.name}
        subtitle={item.username}
        leftAvatar={{ source: image }}
        containerStyle={{backgroundColor: '#45566b'}}
        titleStyle={{color: 'white'}}
        subtitleStyle={{color: '#fffa'}}
        bottomDivider
        chevron
      />
    </TouchableOpacity> 
  )

  const renderGroup = (item) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={{backgroundColor: '#3d4f64'}}>
      <ListItem
        leftAvatar={{ source: groupPlaceholder }}
        containerStyle={{backgroundColor: '#3d4f64', paddingLeft: 12, paddingRight: 0, paddingBottom: 0}}
        contentContainerStyle={{padding: 0, margin: 0}}
        titleStyle={{color: 'white'}}
        subtitleStyle={{color: '#fffa'}}
      />
      <Text style={{paddingBottom: 16, alignSelf: 'center', paddingHorizontal: 8, backgroundColor: '#3d4f64', color: '#fffa'}}>{item.username}</Text>
    </TouchableOpacity> 
  )
  
  return (
    <View style={styles.container}>
      <FlatList keyExtractor={(item) => item.username} data={data} renderItem={({ item }) => renderGroup(item)}
        horizontal={true} showsHorizontalScrollIndicator={false} style={styles.rowList}/>
      <FlatList keyExtractor={(item) => item.username} data={data} renderItem={({ item }) => renderUser(item)} />
    </View>
  )
}

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
    <TouchableOpacity onPress={() => console.log('Drawer menu')}>
      <Feather name='menu' style={styles.menu} />
    </TouchableOpacity>),
    title: 'Kaiku',
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
    borderColor: '#0005',
    backgroundColor: '#3d4f64',
    borderBottomWidth: 1
  }
})

export default IndexScreen