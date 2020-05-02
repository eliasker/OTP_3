import React, { useContext } from 'react'
import { SafeAreaView, Image } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const CustomDrawer = (props) => {
  const placeholder = require('../image/placeholder-profile.png')
  const { loggedUser } = useContext(AuthContext).state

  return (
    <SafeAreaView style={{flex: 1}} >
      <Image source={require('../../assets/icon.png')} style={{height: 100, width: 100, alignSelf: 'center', marginVertical: 69}}/>
      <ListItem
        title={loggedUser.name}
        subtitle={`@${loggedUser.username}`}
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