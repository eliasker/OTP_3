import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const OutMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message.message}</Text>
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
})

export default OutMessage