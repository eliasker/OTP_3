import React from 'react'
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements'

const Title = ({ title, backgroundColor }) => {
  return (
    <View style={{flexDirection: "row", backgroundColor: backgroundColor}}>
      <Divider style={{ backgroundColor: '#fffa', flex: 1, alignSelf: 'center' }} />
      <Text style={{fontSize: 20, color: 'white', paddingHorizontal: 16, paddingTop: 8}}>{title}</Text>
      <Divider style={{ backgroundColor: '#fffa', flex: 8, alignSelf: 'center' }} />
    </View>
  )
}

Title.defaultProps = {
  title: 'default',
  backgroundColor: '#0000'
}

export default Title