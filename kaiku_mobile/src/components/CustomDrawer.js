import React from 'react'
import { SafeAreaView, Image } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { ScrollView } from 'react-native-gesture-handler';

const CustomDrawer = (props) => {
  //console.log(props);
  
  return (
    <SafeAreaView style={{flex: 1}} >
      <Image source={require('../image/kaikuthumb.png')} style={{height: 100, width: 100, alignSelf: 'center', marginVertical: 100}}/>
      <ScrollView>
        <DrawerItems { ...props }/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomDrawer