import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { navigate } from '../navigationRef';

const ChatHeader = ({ name, navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={{ padding: 12 }} onPress={() => navigate('Index')} >
        <Feather name='arrow-left' size={26} style={{ color: '#fffa' }} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{name}</Text>
      <TouchableOpacity style={{ padding: 12, alignSelf: "stretch" }}>
        <Feather name='more-vertical' size={26} style={{ color: '#fffa' }} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    backgroundColor: '#2d3f54',
    paddingTop: Platform.OS === 'android' ? 25: 0,
    flexDirection: "row"
  },
  headerText: {
    paddingVertical: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default ChatHeader