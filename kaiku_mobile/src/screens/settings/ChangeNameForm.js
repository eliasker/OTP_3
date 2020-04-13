import React, { useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Context as LangContext } from '../../context/LangContext'
import { Input } from 'react-native-elements'
import { Feather } from '@expo/vector-icons'
import Title from '../../components/Title'
import Spacer from '../../components/Spacer'

const ChangeNameForm = () => {
  const { state } = useContext(LangContext)

  return (
    <View style={styles.container}>
      <Title title={state.lang.change_name_title} />
      <Text style={{color: '#fffa', fontSize: 14, padding: 8}}>{state.lang.name_desc}</Text>
      <Spacer>
        <Input label={state.lang.name_label} inputStyle={{color: 'white'}} labelStyle={{color: 'white'}}
          value={0} onChangeText={console.log} leftIcon={() => <Feather name='user' size={20} style={{paddingRight: 4, color: 'white'}}/>}/>
      </Spacer>
      <Spacer>
        <Input label={state.lang.username_label} labelStyle={{color: 'white'}} inputStyle={{color: 'white'}} 
          value={0} onChangeText={console.log} leftIcon={() => <Text style={{paddingRight: 8, color: 'white'}}>@</Text>}/>
      </Spacer>
      <TouchableOpacity>
        <Text style={styles.button}>{state.lang.save_button}</Text>
      </TouchableOpacity>
    </View>
  )
}

ChangeNameForm.navigationOptions = ({ navigation }) => {
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
  },
  button: {
    color: 'white',
    alignSelf: "flex-end",
    fontSize: 20,
    margin: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 0,
    backgroundColor: '#fff3',
    borderRadius: 4,
  }
})

export default ChangeNameForm