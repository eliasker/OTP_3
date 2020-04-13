import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Context as LangContext } from '../../context/LangContext'
import { Input } from 'react-native-elements'
import { Feather } from '@expo/vector-icons'
import Title from '../../components/Title'
import Spacer from '../../components/Spacer'

const ChangePasswordForm = () => {
  const { state } = useContext(LangContext)
  const [ visibility, setVisibility ] = useState(true)

  const visibilityIcon = (i) => {
    return (
      <TouchableOpacity onPress={() => setVisibility(!visibility)}>
        <Feather name='eye' size={20} style={{paddingRight: 4, color: 'white'}}/>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Title title={state.lang.change_password_title} />
      <Text style={{color: '#fffa', fontSize: 14, padding: 8}}>{state.lang.change_password_desc}</Text>
      <Spacer>
        <Input secureTextEntry={visibility} label={state.lang.password_label} inputStyle={{color: 'white'}} labelStyle={{color: 'white'}}
          value={0} onChangeText={console.log} rightIcon={() => visibilityIcon()}/>
      </Spacer>
      <Spacer>
        <Input secureTextEntry={visibility} label={state.lang.repassword_label} labelStyle={{color: 'white'}} inputStyle={{color: 'white'}} 
          value={0} onChangeText={console.log} rightIcon={() => visibilityIcon()}/>
      </Spacer>
      <TouchableOpacity>
        <Text style={styles.button}>{state.lang.save_button}</Text>
      </TouchableOpacity>
    </View>
  )
}

ChangePasswordForm.navigationOptions = ({ navigation }) => {
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

export default ChangePasswordForm