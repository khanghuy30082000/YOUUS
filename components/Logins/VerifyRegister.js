import { StyleSheet, Text,  View, Image, KeyboardAvoidingView, ScrollView, TextInput, Animated } from 'react-native'
import React, { useEffect, useState ,useRef} from 'react'

import { useHistory } from 'react-router-native';
import { StatusBar, TouchableOpacity } from 'react-native';
import { Easing } from 'react-native';
import { PageHeaderSignup } from '../AppComponents/PageHeaderSignup';
import * as Animatable from 'react-native-animatable'
import { Feather } from '@expo/vector-icons';
const VerifyRegister = (props) => {

  const history = useHistory();

  const backToLogin = () => {
    history.push(`/login`);
  };
  const goToSignUp = () => {
    history.push(`/signup`);
  };
 
console.log(props);
 
  return (

    <View style={{ flex: 1, backgroundColor: '#E2E2E2', }}>
     <StatusBar
     backgroundColor="#ffffff"
     barStyle={'dark-content'}
   
   />
  <PageHeaderSignup placeholder='Đăng nhập' placeholder2='Đăng Kí'
        onPressNavigationDN={backToLogin} onPressNavigationDK={goToSignUp} >

      </PageHeaderSignup>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Animatable.View style={{ justifyContent: 'center', alignItems: 'center', top: 32 ,backgroundColor:'#E2E2E2'}} animation='bounceIn' duration={2000}>
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
          top: 160,
          width: '100%',
          height:1000,
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
               

              }}>
                <Image

                  source={require('../../assets/verify.png')}
                />
              </View>

              <View style={{marginBottom:20,}}>
             <Text style={{fontSize:24,lineHeight:36,textAlign:'center',fontStyle:'normal',color:'#0176E4',padding:10,fontWeight:'bold'}}>
             Xác thực Email
             </Text>
             <Text style={{fontSize:14,lineHeight:18,textAlign:'center',fontStyle:'normal',backgroundColor:'#ffffff',padding:5,fontWeight:'bold',alignSelf:'center',width:'90%'}}>
             Chúng tôi đã gửi tin nhắn vào Email của bạn. Vui lòng kiểm tra và ấn vào link kích hoạt để xác nhận.
             </Text>
             {/* <View style={{flexDirection:'row',marginLeft:20,marginTop:12}}>

             
             <Feather name='mail' size={25} color='black'></Feather>
             <Text style={{fontSize:14,lineHeight:18,textAlign:'center',fontStyle:'normal',backgroundColor:'#ffffff',padding:5,}}>
             
             </Text>
             </View> */}
                
              </View>
              {/* <View>
                <TouchableOpacity onPress={backToLogin}>
                <Text style={{ backgroundColor: '#0176E4', height: 56, width: 280, textAlignVertical: 'center', alignSelf: 'center', textAlign: 'center', shadowRadius: 5, borderRadius: 20, color: '#ffffff', fontSize: 20, elevation: 6 }} >
                Xác nhận
                </Text></TouchableOpacity>
              </View> */}
            </ScrollView>
          </KeyboardAvoidingView>
        </Animatable.View>


      </View>
    </View>
  )
}

export default  VerifyRegister

