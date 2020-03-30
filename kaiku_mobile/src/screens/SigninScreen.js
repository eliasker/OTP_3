import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import { Feather } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'
import Spacer from '../components/Spacer'


const showIcon = (iconName) => (
  <Feather name={iconName} style={styles.icon} />
)

const SigninScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { logIn, state, trySignIn } = useContext(AuthContext)

  useEffect(() => {
    trySignIn()
  }, [])

  const handleLogIn = () => {
    logIn({username, password})
  }

  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={require('../image/banner.png')} />
      <Spacer>
        <Input label="Username" inputStyle={{color: 'white'}}
          value={username} onChangeText={setUsername} leftIcon={showIcon('user')}/>
      </Spacer>
      <Spacer>
        <Input secureTextEntry label="Password" inputStyle={{color: 'white'}}
          value={password} onChangeText={setPassword} leftIcon={showIcon('lock')}/>
      </Spacer>

      {state.errorText ? <Text style={styles.error}>{state.errorText}</Text>: null}

      <Spacer>
        <Button title="Sign in" type='outline' raised={true} style={{margin: 50}} onPress={handleLogIn} />
      </Spacer>
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
    paddingBottom: 150,
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