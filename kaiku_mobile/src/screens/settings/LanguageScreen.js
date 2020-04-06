import React, { useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Context as LangContext } from '../../context/LangContext'
import { ListItem } from 'react-native-elements'

const LanguageScreen = () => {
  const { getLangMeta, setLang, state } = useContext(LangContext)
  const langMeta = getLangMeta()
  
  const langItem = (item) => (
    <TouchableOpacity onPress={ () => setLang(item.id) }>
      <ListItem
        title={item.name}
        subtitle={item.alt_name}
        containerStyle={{backgroundColor: '#45566b'}}
        titleStyle={{color: 'white'}}
        subtitleStyle={{color: '#fffa'}}
        bottomDivider
        chevron />
    </TouchableOpacity>
  )
  
  return (
    <View style={styles.container}>
      <Text style={styles.title} >{state.lang.change_lang_label}</Text>
      <FlatList keyExtractor={(item) => item.identifier} data={langMeta} renderItem={({ item }) => langItem(item)} />
    </View>
  )
}

LanguageScreen.navigationOptions = ({ navigation }) => {
  return {
    title: null,
    headerStyle: {
      backgroundColor: '#45566b',
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    // alignItems: 'flex-start',
    backgroundColor: '#45566b',
  },
  title: {
    color: 'white',
    fontSize: 20,
    margin: 16
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

export default LanguageScreen