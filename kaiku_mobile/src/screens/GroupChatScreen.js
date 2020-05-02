import React, {useContext} from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { Context as AuthContext } from '../context/AuthContext'
import { Feather } from '@expo/vector-icons'
import OutMessage from '../components/OutMessage'
import InMessage from '../components/InMessage'
import ChatHeader from '../components/ChatHeader'

const GroupChatScreen = ({ route, navigation }) => {
  const { loggedUser, allUsers } = useContext(AuthContext).state
  const item = navigation.getParam('item')

  const findSenderName = (sender_id) => {
    return allUsers.find(u => (u.user_id === sender_id)).username
  }

  const renderMessage = (message) => {
    return (
      (message.user_id === loggedUser.user_id) ? <InMessage message={message} senderName={findSenderName(message.user_id)}/> : <OutMessage message={message} />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader name={item.chatName} />
      <Image source={require('../image/kaiku-bg.png')} style={styles.backgroundImage} />
      <FlatList keyExtractor={(e) => e.id} data={item.messages} renderItem={({ item }) => renderMessage(item)}
        style={styles.messageContainer} />

      <KeyboardAvoidingView behavior={'padding'} >
        <View style={{ flexDirection: 'row', margin: 4, alignSelf: 'flex-end' }}>
          <TextInput style={styles.input} />
          <TouchableOpacity>
            <Feather name="send" style={styles.sendBtn} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

GroupChatScreen.navigationOptions = ({ navigation }) => {
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
    position: "absolute",
    top: -5,
    resizeMode: "repeat",
    overflow: 'visible',
    backfaceVisibility: 'hidden',
    opacity: 0.02,
    zIndex: -1
  },
})

export default GroupChatScreen
