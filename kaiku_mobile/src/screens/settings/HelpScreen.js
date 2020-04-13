import React, { useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Context as LangContext } from '../../context/LangContext'
import Title from '../../components/Title'

const HelpScreen = () => {
  const { state } = useContext(LangContext)
  
  return (
    <View style={styles.container}>
      <Title title={state.lang.help_label} />
      <ScrollView>
      <Text style={styles.title}>{state.lang.faq_label}</Text>
      {state.lang.faq.map((qa) => (
        <View key={qa.q} style={{padding: 16,}}>
          <Text style={{color: '#fff', fontSize: 16}}>{qa.q}</Text>
          <Text style={{color: '#fffa', fontSize: 14}}>{qa.a}</Text>
        </View>
      ))}
      <Text style={styles.title}>{state.lang.contact_label}</Text>
      <View style={{padding: 16,}}>
        <Text style={{color: '#fff', fontSize: 16}}>{state.lang.contact_mail}</Text>
        <Text style={{color: '#fff', fontSize: 16}}>{state.lang.contact_phone}</Text>
      </View>
      </ScrollView>
      
    </View>
  )
}

HelpScreen.navigationOptions = ({ navigation }) => {
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
    backgroundColor: '#45566b',
  },
  title: {
    color: 'white',
    fontSize: 20,
    margin: 16,
    marginBottom: 0,
  }
})

export default HelpScreen