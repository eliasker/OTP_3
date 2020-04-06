import React, { useState, useContext } from 'react'
import { StyleSheet, View, Image, KeyboardAvoidingView, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { Feather } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as LangContext } from '../context/LangContext'
import Spacer from '../components/Spacer'
import LanguageLink from '../components/LanguageLink'


const showIcon = (iconName) => (
  <Feather name={iconName} style={styles.icon} />
)

const SigninScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { logIn, state } = useContext(AuthContext)

  const langMeta = useContext(LangContext).getLangMeta()
  const { log_in, password_label, username_label } = useContext(LangContext).state.lang
  //console.log(langMeta);

  const handleLogIn = () => {
    logIn({username, password})
  }

  const showLanguages = () => langMeta.map(l => <LanguageLink id={l.id} lang={langMeta[l.id]} />)

  return (
      <View style={styles.container}>
      <Image style={styles.banner} source={require('../image/banner.png')} />

      <KeyboardAvoidingView behavior='padding'>
        <Spacer>
          <Input label={username_label} inputStyle={{color: 'white'}}
            value={username} onChangeText={setUsername} leftIcon={showIcon('user')}/>
        </Spacer>
        <Spacer>
          <Input secureTextEntry label={password_label} inputStyle={{color: 'white'}}
            value={password} onChangeText={setPassword} leftIcon={showIcon('lock')}/>
        </Spacer>

        {state.errorText ? <Text style={styles.error}>{state.errorText}</Text>: null}

        <Spacer>
          <Button title={log_in} type='outline' raised={true} style={{margin: 50}} onPress={handleLogIn} />
        </Spacer>
        <View style={{flexDirection: "row", justifyContent: 'center'}}>
          {showLanguages()}
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: '#2d3f56',
    justifyContent: 'center'
  },
  banner: {
    width: 300,
    alignSelf: 'center',
    marginBottom: 20
  },
  text: {
    color: '#fff'
  },
  icon: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8
  },
  error: {
    color: 'red',
    marginLeft: 16
  }
})

export default SigninScreen