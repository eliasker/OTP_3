import React, { useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import OutMessage from '../components/OutMessage'
import InMessage from '../components/InMessage'
import ChatHeader from '../components/ChatHeader'

const d = [
  {
    id: "1",
    message: 'Moi',
    type: 'out'
  },
  {
    id: "2",
    message: 'Miten menee',
    type: 'out'
  },
  {
    id: "3",
    message: 'Moi hyvin sulla',
    type: 'in'
  },
  {
    id: "4",
    message: 'hyvin',
    type: 'out'
  },
  {
    id: "5",
    message: 'ok',
    type: 'in'
  }
]

const ChatScreen = ({ navigation }) => {
  const [data, setData] = useState(d)
  const [message, setMessage] = useState('')
  const cahtObj = navigation.getParam('item')
  
  const renderMessage = (m) => {
    return (
      (m.type.includes('in')) ? <InMessage message={m} name={cahtObj.name} />: <OutMessage message={m} />
    )
  }

  const send = () => {
    setData(data.concat({message, type: 'out'}))
    setMessage('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader name={cahtObj.name} />
      <Image source={require('../image/kaiku-bg.png')} style={styles.backgroundImage} />
      <FlatList keyExtractor={(e) => e.id} data={data} renderItem={({ item }) => renderMessage(item)}
        style={styles.messageContainer}/>

      <KeyboardAvoidingView behavior={'padding'} >
        <View style={{flexDirection: 'row', margin: 4, alignSelf: 'flex-end'}}>
          <TextInput style={styles.input} value={message} onChangeText={v => setMessage(v)} onSubmitEditing={() => send()}/>
          <TouchableOpacity onPress={() => send()}>
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
