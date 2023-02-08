import { SafeAreaView, StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import { Footer } from '../Wall/Footer'

import { Feather, Ionicons, Octicons,AntDesign } from '@expo/vector-icons';
import SingleMedia from './SingleMedia';

const Media = () => {  const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
  return (
    <SafeAreaView
      style={{
        width: windowWidth,
        height: windowHeight,
       
        position: 'relative',
        backgroundColor: 'black',
      }}> 
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 10,
        }}>
           <Feather name="chevron-left" style={{fontSize: 25, color: 'white',opacity:0.8}} />
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white',left:20,opacity:0.8}}>
          YOU
        </Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white',right:40 ,opacity:0.8}}>
          US
        </Text>
        <Feather name="camera" style={{fontSize: 25, color: 'white',opacity:0.8}} />
      </View>
      
   <SingleMedia/>
   <View style={{ bottom: 0, position: 'absolute', flex: 1, alignSelf: 'center', width: '100%', justifyContent: 'center', }} ><Footer /></View>
    </SafeAreaView>
  )
}

export default Media

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
   } })