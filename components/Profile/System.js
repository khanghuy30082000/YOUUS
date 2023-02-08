import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-native';

const System = (profileId) => {
    const history = useHistory();

    const handleLogOut = (event) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('successfully logged out');
          history.push(`/`);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const goToProfile = () => {
        history.push(`/profile/${profileId}`);
      };
      const goToWall = () => {
        history.push(`/dashboard`);
        
      };
  return (
    <View style={{flex:1,justifyContent:'center',alignContent:'center',marginLeft:20}}>
        <TouchableOpacity onPress={goToWall }>
        <View style={styles.iconContainer}>
          <Feather name='user' size={20} color='black' />
          <Text style={styles.iconText}>Cá Nhân</Text>
        </View>
      </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut}>
        <View style={styles.iconContainer}>
          <Feather name='log-out' size={25} color='white' />
          <Text style={styles.iconText}>Log out</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default System

const styles = StyleSheet.create({
    footerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        bottom: 0,
        borderBottomWidth: 3,
        borderBottomColor: '#c9ccd1',
        backgroundColor: '#fefefc',
        width: '100%',
      },
})