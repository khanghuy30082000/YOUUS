import { StyleSheet, Text,  View, Image, KeyboardAvoidingView, ScrollView, TextInput, Animated } from 'react-native'
import React, { useEffect, useState ,useRef} from 'react'

import { useHistory } from 'react-router-native';
import { StatusBar, TouchableOpacity } from 'react-native';
import { Easing } from 'react-native';
import { PageHeaderLogin } from '../AppComponents/PageHeaderLogin';
import * as Animatable from 'react-native-animatable'
const Donerestpassword = () => {

  const history = useHistory();

  const backToLogin = () => {
    history.push(`/login`);
  };
  const goToSignUp = () => {
    history.push(`/signup`);
  };
   const topMotion = useRef(new Animated.Value(1440)).current;

 useEffect(()=>{
  setTimeout(()=>{
    Animated.timing(
      topMotion,
      {
        toValue:300,
        duration:1000,
        useNativeDriver:false,
       easing:Easing.circle
      }
    ).start();
  },3000)
  
 },[]);
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
          
           marginBottom:topMotion,
          flex: 0.71,
          elevation:30,shadowRadius:30,
          backgroundColor: '#ffffff',
          // flexDirection:'column',
          position: 'absolute',
          top: 200,
          width: '100%',
          height: 650,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }} animation='fadeInUpBig' duration={2000}  >
          
          <KeyboardAvoidingView>
            <ScrollView>
              

              <View style={{
                marginTop:60,
                alignSelf: 'center',
                height: 130,
                width: 130,
                marginBottom: 33,

              }}>
                <Image

                  source={require('../Images/group7.png')}
                />
              </View>

              <View style={{marginBottom:20,}}>
             <Text style={{fontSize:24,lineHeight:36,textAlign:'center',fontStyle:'normal',color:'#0176E4',padding:10,fontWeight:'bold'}}>
             Kiểm tra Email của bạn
             </Text>
             <Text style={{fontSize:14,lineHeight:18,textAlign:'center',fontStyle:'normal',backgroundColor:'#ffffff',padding:5,fontWeight:'bold'}}>
             Chúng tôi đã gửi yêu cầu khôi phục mật khẩu vào hòm thư email đăng ký của bạn. Hãy kiểm tra và đặt lại mật khẩu mới.
             </Text>
                
              </View>
              <View>
              <TouchableOpacity  onPress={backToLogin}>
            <View style={{height: 56, width: 280, borderRadius: 30, backgroundColor:'#0176E4', alignSelf:"center", justifyContent:'center'}}>
              <Text style={{fontWeight:"bold", color:"white", textAlign:'center', fontSize: 16}} >
                Xác nhận
              </Text>
            </View>
          </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Animatable.View>


      </View>
    </View>
  )
}

export default  Donerestpassword

const styles = StyleSheet.create({})