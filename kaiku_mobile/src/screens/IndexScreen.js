import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Context } from '../context/BlogContext'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

const IndexScreen = ({ navigation }) => {
  const { state, add } = useContext(Context)
  
  const singlePost = (user) => (
    <TouchableOpacity onPress={() => navigation.navigate('Single', { user })}>
      <View style={styles.row} >
        <TouchableOpacity onPress={() => deleteBlog(user.id)}>
          <Feather name='circle' style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.flex1}>
          <Text style={styles.text} >{user.name}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <View>
      <FlatList keyExtractor={(item) => item.username} data={state} renderItem={({ item }) => singlePost(item)} />
    </View>
  )
}

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Feather name='menu' style={styles.menu} />
    </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 25,
    paddingVertical: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 24,
    //borderColor: 'black', //for testing
    //borderWidth: 1,
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
    color: 'grey'
  }
})

export default IndexScreen