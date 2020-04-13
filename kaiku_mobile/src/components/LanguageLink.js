import React, { useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Context as LangContext } from '../context/LangContext'

const Spacer = ({ lang }) => {
  const { setLang } = useContext(LangContext)

  return (
    <TouchableOpacity style={styles.spacer} onPress={() => setLang(lang.id)}>
      <Text style={styles.langLink} >{lang.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  spacer: {
    margin: 8
  },
  langLink: {
    color: 'white',
    fontSize: 16
  }
})

export default Spacer