import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const OutMessage = ({ message, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.senderName}>{name}</Text>
        <Text>{message.message}</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'flex-start',
  },
  message: {
    margin: 8,
    backgroundColor: 'white',
    color: 'black',
    padding: 8,
    fontSize: 16,
    borderRadius: 8,
    borderBottomLeftRadius: 0,    
  },
  senderName: {
    fontWeight: 'bold'
  }
})

export default OutMessage