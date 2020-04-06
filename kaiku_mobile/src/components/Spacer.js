import React from 'react'
import { View } from 'react-native'

const Spacer = ({ children, margin }) => {
  return (
    <View style={{margin: margin}}>
      { children }
    </View>
  )
}

Spacer.defaultProps = {
  margin: 16
}

export default Spacer