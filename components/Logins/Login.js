import React, { useState } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity, TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-native';
import { PageHeaderLogin } from '../AppComponents/PageHeaderLogin';
import * as Animatable from 'react-native-animatable'
function Login(props) {
  const history = useHistory();
  const [getEmail, setGetEmail] = useState('');
  const [getPassword, setGetPassword] = useState('');
  const [passwordVisialbe, setpasswordVisialbe] = useState(true);
  const handleEmail = (inputText) => {
    setGetEmail(inputText);
  };

  const handlePassword = (inputText) => {
    setGetPassword(inputText);
  };

  const goToSignUp = () => {
    history.push(`/signup`);
  };
  const goToLogin = () => {
    history.push(`/login`);
  };

  const goToResetpassword = () => {
    history.push(`/resetpassword`);
  };
  const handleLogin = (event) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(getEmail, getPassword)
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor:'white'}} >

      <StatusBar
        backgroundColor="#ffffff"
        barStyle={'dark-content'}

      />
      <PageHeaderLogin placeholder='Đăng nhập' placeholder2='Đăng kí'
        onPressNavigation={goToLogin} onPressNavigationDK={goToSignUp} >

      </PageHeaderLogin>

      <Animatable.View style={styles.mainContainer} animation='slideInLeft' duration={100}>
        <View style={{ justifyContent: 'center', alignItems: 'center', top: 24, marginBottom: 32 }}>
          <Image

            source={require('../Images/logoyouus.png')}
          />
        </View>
        <View style={styles.logInContainer}>
          <View style={{
            height: 56, width: '90%', flexDirection: 'row', marginTop: 48,
            backgroundColor: '#EDEDF2', marginLeft: 16, marginRight: 16, borderRadius: 35, borderTopLeftRadius: 35, borderTopRightRadius: 35, marginBottom: 24, shadowRadius: 13,
          }}>
            <Feather style={{ alignItems: 'center', justifyContent: 'center', left: 15, justifyContent: 'center', marginTop: 15 }} name='user' size={25} color='black'>

            </Feather>
            <TextInput
              style={styles.textInput}
              textContentType='emailAddress'
              name='email'
              placeholder='Email'
              placeholderTextColor='black'
              inputText={getEmail}
              onChangeText={handleEmail}
              required
              backgroundColor='#EDEDF2'
            />
          </View>

          <View style={{
            height: 56, width: '90%', flexDirection: 'row',
            backgroundColor: '#EDEDF2', marginLeft: 16, marginRight: 16, borderRadius: 35, borderTopLeftRadius: 35, borderTopRightRadius: 35, marginBottom: 24, shadowRadius: 5,
          }}>
            <Feather style={{ alignItems: 'center', justifyContent: 'center', left: 15, justifyContent: 'center', marginTop: 15 }} name='lock' size={25} color='black'>

            </Feather>

            <TextInput
              style={styles.textInput}
              textContentType='password'
              name='password'
              placeholder='Mật khẩu'
              placeholderTextColor='black'
              inputText={getPassword}
              onChangeText={handlePassword}
              secureTextEntry={passwordVisialbe}
              required
              backgroundColor='#EDEDF2'
            >

            </TextInput>

            <Feather style={{ alignItems: 'center', justifyContent: 'center', marginTop: 18 }} name={passwordVisialbe ? 'eye-off' : 'eye'} size={25} color='black'
              onPress={() => setpasswordVisialbe(!passwordVisialbe)}
            ></Feather>
          </View>
          <View style={{ flexDirection: 'row-reverse', marginBottom: 24 }}>
            <TouchableOpacity onPress={goToResetpassword}>
              <Text style={styles.password}>Quên mật khẩu?</Text></TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleLogin}>
            <View style={{ height: 56, width: 280, backgroundColor: '#0176E4', borderRadius: 20, justifyContent: 'center', alignSelf: 'center', shadowRadius: 10, }}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#ffffff', fontSize: 20 }} >
                Đăng nhập
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text style={{ fontSize: 14, marginRight: 9, }}>Chưa có tài khoản?</Text>
            <TouchableOpacity onPress={goToSignUp}>

              <Text style={styles.signUp}>ĐĂNG KÝ</Text>
            </TouchableOpacity >

          </View>
        </View>




      </Animatable.View>

    </SafeAreaView>

  );
}
const styles = StyleSheet.create({

  mainContainer: { backgroundColor: '#E2E2E2', height: '100%' },

  logInContainer: {


    flexDirection: 'column',
    // marginTop: 50,
    flex: 0.71,
    elevation: 30, shadowRadius: 30,
    backgroundColor: '#ffffff',
    // flexDirection:'column',
    position: 'absolute',
    top: 160,
    width: '100%',
    height: 750,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  textInput: {

    marginLeft: 20,
    backgroundColor: '#EDEDF2',
    width: '75%', marginTop: 12,
    justifyContent: 'center',
    paddingBottom: 10,
    fontSize: 16,
  },
  logInButton: {
    marginBottom: 40,
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logIn: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 10,
  },
  signUpContainer: {
    marginTop: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',


  },
  signUp: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#0176E4'
  },
  password: {

    marginRight: 25,
    color: '#0176E4',
    textDecorationLine: 'none',
    // fontWeight: 'bold',
    fontSize: 17,
  },
});

export { Login };
