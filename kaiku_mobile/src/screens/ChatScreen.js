import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import OutMessage from '../components/OutMessage'
import InMessage from '../components/InMessage'
import ChatHeader from '../components/ChatHeader'

const data = [
  {
    id: "1",
    message: 'Moi'
  },
  {
    id: "2",
    message: 'Moikka'
  },
  {
    id: "3",
    message: 'Morjesta'
  },
  {
    id: "4",
    message: 'Moiii'
  },
  {
    id: "5",
    message: 'Morjens'
  }
]

const ChatScreen = () => {
  
  const renderMessage = (message) => {
    return (
      (message.message.includes('orj')) ? <InMessage message={message} />: <OutMessage message={message} />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader name='Marko' />
      <Image source={require('../image/kaiku-bg.png')} style={styles.backgroundImage} />
      <FlatList keyExtractor={(e) => e.id} data={data} renderItem={({ item }) => renderMessage(item)}
        style={styles.messageContainer}/>

      <KeyboardAvoidingView behavior={'padding'} >
        <View style={{flexDirection: 'row', margin: 4, alignSelf: 'flex-end'}}>
          <TextInput style={styles.input} />
          <TouchableOpacity>
            <Feather name="send" style={styles.sendBtn} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

ChatScreen.navigationOptions = ({ navigation }) => {
  return {
    headerShown: false
    // headerRight: () => (
    // <TouchableOpacity onPress={() => console.log('Drawer menu')}>
    //   <Feather name='more-vertical' style={styles.menu} />
    // </TouchableOpacity>),
    // title: 'Mirka',
    // headerStyle: {
    //   backgroundColor: '#2d3f54',
    // },
    // headerTintColor: '#fffc',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4d5f74',
  },
  messageContainer: {
    flex: 1
  },
  input: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: 'white',
    borderColor: '#0003',
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 5,
  },
  sendBtn: {
    backgroundColor: '#1d2f44',
    color: 'white',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    fontSize: 28,
    padding: 8,
  },
  menu: {
    fontSize: 24,
    marginLeft: 12,
    paddingHorizontal: 8,
    color: '#fffa'
  },
  backgroundImage: {
    position:"absolute",
    top: -5,
    resizeMode: "repeat",
    overflow : 'visible',
    backfaceVisibility: 'hidden',
    opacity: 0.02,
    zIndex: -1
  },
})

export default ChatScreen
