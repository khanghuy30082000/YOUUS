import { StyleSheet, Text,  View, Image, KeyboardAvoidingView, ScrollView, TextInput, Animated } from 'react-native'
import React, { useEffect, useState ,useRef} from 'react'

import { useHistory } from 'react-router-native';
import { StatusBar, TouchableOpacity } from 'react-native';
import { Easing } from 'react-native';
import { PageHeaderLogin } from '../AppComponents/PageHeaderLogin';
import * as Animatable from 'react-native-animatable'
const CongratulaterRegister = () => {

  const history = useHistory();

  const backToLogin = () => {
    history.push(`/dashboard`);
  };
  const goToSignUp = () => {
    history.push(`/signup`);
  };
  

 
  return (

    <View style={{ flex: 1, backgroundColor: '#E2E2E2', }}>
     <StatusBar
     backgroundColor="#ffffff"
     barStyle={'dark-content'}
   
   />
  
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Animatable.View style={{ justifyContent: 'center', alignItems: 'center', top: 48 ,backgroundColor:'#E2E2E2'}} animation='bounceIn' duration={2000}>
          <Image

            source={require('../Images/logoyouus.png')}
          />
        </Animatable.View>

        < Animatable.View style={{
          
        
          flex: 0.71,
          elevation:30,shadowRadius:30,
          backgroundColor: '#ffffff',
          // flexDirection:'column',
          position: 'absolute',
          top: 180,
          width: '100%',
          height: 1000,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }} animation='fadeInUpBig' duration={2000}  >
          
          <KeyboardAvoidingView>
            <ScrollView>
              

              <View style={{
                top:48,
                alignSelf: 'center',
                alignItems:'center',
                height: 130,
                width: 130,
                

              }}>
                <Image

                  source={require('../../assets/done.png')}
                />
              </View>

              <View style={{marginBottom:24,marginTop:-10}}>
             <Text style={{fontSize:24,lineHeight:36,textAlign:'center',fontStyle:'normal',color:'#0176E4',padding:10,fontWeight:'bold'}}>
             Cám ơn bạn đã đăng ký!
             </Text>
             <Text style={{fontSize:14,lineHeight:18,textAlign:'center',fontStyle:'normal',backgroundColor:'#ffffff',padding:5,fontWeight:'bold',width:'80%',alignSelf:'center'}}>
             Bạn đã đăng ký thành công.
Bấm nút để khám phá các tính năng ngay thôi.
             </Text>
                
              </View>
              <View>
                <TouchableOpacity onPress={backToLogin}>
                <Text style={{ backgroundColor: '#0176E4', height: 56, width: 280, textAlignVertical: 'center', alignSelf: 'center', textAlign: 'center', shadowRadius: 5, borderRadius: 20, color: '#ffffff', fontSize: 20, elevation: 6 }} >
                Khám phá ngay!
                </Text></TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Animatable.View>


      </View>
    </View>
  )
}

export default  CongratulaterRegister

