import React from 'react'
import { SafeAreaView, Image } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar } from 'react-native-elements';

const CustomDrawer = (props) => {
  const placeholder = require('../image/placeholder-profile.png')

  return (
    <SafeAreaView style={{flex: 1}} >
      <Image source={require('../../assets/icon.png')} style={{height: 100, width: 100, alignSelf: 'center', marginVertical: 69}}/>
      <ListItem
        title="Mirka"
        subtitle="@mirka-kissa"
        leftAvatar={<Avatar rounded size="medium" source={ placeholder } />}
        containerStyle={{backgroundColor: '#0000'}}
        titleStyle={{color: 'white'}}
        subtitleStyle={{color: '#fffa'}} />
      <ScrollView>
        <DrawerItems { ...props }/>
      </ScrollView>
    </SafeAreaView>
  ) 
}

export default CustomDrawer