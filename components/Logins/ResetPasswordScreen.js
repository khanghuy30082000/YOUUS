import { StyleSheet, Text,  View, Image, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, LogBox,StatusBar,TouchableWithoutFeedback,Keyboard } from 'react-native'
import React, { useState } from 'react'
import { PageHeaders } from '../AppComponents/PageHeaders'
import { useHistory } from 'react-router-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';
import Toast from '../AppComponents/Toast';
import * as Animatable from 'react-native-animatable'
const ResetPasswordScreen = () => {
  const history = useHistory();
  const backToLogin = () => {
    history.goBack();
  };
  const [email, setEmail] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ value: '', type: '' })
  function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email không được trống"
    if (!re.test(email)) return 'Ooops! Chúng tôi cần 1 email hợp lệ'
    return ''
  }
  const sendEmailWithPassword = async (email) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
      return {}
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }

  const sendResetPasswordEmail = async () => {
  
      

    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    setLoading(true)
    const response = await sendEmailWithPassword(email.value)
    if (response.error) {
      setToast({ type: 'error', message: response.error })
      Alert.alert("Không có email này!")
    } else {
      setToast({
        type: 'success',
        message: 'Email đã được gửi thành công.',
      })
      console.log('Vui lòng kiểm tra hòm thư của bạn để đổi mật khẩu!');
      history.push(`/doneresetpassword`);
    }
    
    setLoading(false)
   
  }
  return (

    <Animatable.View style={{ flex: 1, backgroundColor: '#E2E2E2', }} animation='slideInLeft' duration={200}>
       <StatusBar
     backgroundColor="#ffffff"
     barStyle={'dark-content'}></StatusBar>
      <PageHeaders placeholder='Quên mật khẩu'
        onPressNavigation={backToLogin}>

      </PageHeaders>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Animatable.View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}animation='bounceIn' duration={200}>
          <Image

            source={require('../Images/logoyouus.png')}
          />
        </Animatable.View>
       
        <View style={{
          flex: 0.71,
          elevation: 30, shadowRadius: 30,
          backgroundColor: '#ffffff',
          // flexDirection:'column',
          position: 'absolute',
          top: 150,
          width: '100%',
          height:1000,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}animation='fadeInUpBig' duration={1500}>
           {/* <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{justifyContent:'center',alignItems:'center',flex:1,width:'100%',position:'absolute'}}
    > */}
          <View style={{ alignItems: 'center', height: 36, width: '100%', marginTop: 32, marginBottom: 12 }}>
            <Text style={{ fontSize: 24, fontStyle: 'normal', color: '#0176E4', textAlign: 'center', fontWeight: 'bold' }}>
              Nhập email đã đăng kí
            </Text>
          </View>

          <View style={{

            alignSelf: 'center',
            height: 130,
            width: 130,
            marginBottom: 24,

          }}>
            <Image

              source={require('../Images/imagequenmk.jpg')}
            />
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flexDirection:'column',flex:1}}>
          
         
          <View style={{
            height: 56, width: '90%', flexDirection: 'row',
            backgroundColor: '#EDEDF2', marginLeft: 16, marginRight: 16, borderRadius: 35, borderTopLeftRadius: 35, borderTopRightRadius: 35, marginBottom: 24, 
          }}>
            <Feather style={{ alignItems: 'center', justifyContent: 'center', left: 15, justifyContent: 'center', marginTop: 15 }} name='mail' size={25} color='black'>

            </Feather>
            <TextInput style={{
              marginLeft: 20, fontSize: 16, width: '100%'
            }}
            placeholder="Nhập email khôi phục"
            placeholderTextColor={"grey"}
            returnKeyType="done"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            
             >
              
            </TextInput>

          </View>

          <TouchableOpacity  onPress={sendResetPasswordEmail}>
            <View style={{height: 56, width: 280, borderRadius: 30, backgroundColor:'#0176E4', alignSelf:"center", justifyContent:'center'}}>
              <Text style={{fontWeight:"bold", color:"white", textAlign:'center', fontSize: 16}} >
                Gửi mã
              </Text>
            </View>
          </TouchableOpacity>
          {/* </KeyboardAvoidingView> */}
         
          </KeyboardAvoidingView>
        </View>
      
        <Toast {...toast} onDismiss={() => setToast({ value: '', type: '' })} />
      
      

      </View>
      
    </Animatable.View>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
  // testdes: {
  //   backgroundColor: '#0176E4', fontWeight: 'bold', height: 56, width: 280, textAlignVertical: 'center',
  //    alignSelf: 'center', textAlign: 'center', shadowRadius: 5, borderRadius: 20, color: '#ffffff', fontSize: 20, elevation: 6
  // }

})