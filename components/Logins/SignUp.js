import React, { useState } from 'react';
import {
  StatusBar,
  Image,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'
import { useHistory } from 'react-router-native';
import * as Animatable from 'react-native-animatable'

import { PageHeaderSignup } from '../AppComponents/PageHeaderSignup';

function SignUp(props) {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [getPassword, setGetPassword] = useState('');
  const [passwordVisialbe, setpasswordVisialbe] = useState(true);
  const user = firebase.auth().currentUser;
  const userId = firebase.auth.uid;
  const db = firebase.firestore();
  const backToLogin = () => {
    history.goBack();
  };
  const [email1, setEmail1] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ value: '', type: '' })
  function emailValidator(email1) {
    const re = /\S+@\S+\.\S+/
    if (!email1) return "Email không được trống"
    if (!re.test(email1)) return 'Ooops! Chúng tôi cần 1 email hợp lệ'
    return ''
  }
  const sendEmailWithPassword = async (email1) => {
    try {
      await firebase.auth().sendSignInLinkToEmail(email)
      return {}
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email1.value)
    if (emailError) {
      setEmail1({ ...email1, error: emailError })
      return
    }
    setLoading(true)
    const response = await sendEmailWithPassword(email1.value)
    if (response.error) {
      setToast({ type: 'error', message: response.error })
      Alert.alert("Không có email này!")
    } else {
      setToast({
        type: 'success',
        message: 'Email đã được gửi thành công.',
      })
      console.log('Vui lòng kiểm tra hòm thư của bạn để đổi mật khẩu!');
      history.push(`/verify`);
    }

    setLoading(false)

  }
  const registerUserName = (inputText) => {
    setUserName(inputText);
  };

  const registerEmail = (inputText) => {
    setEmail(inputText);
  };
  const handlePassword2 = (inputText2) => {
    setGetPassword(inputText2);
  };
  const registerPassword = (inputText) => {
    setPassword(inputText);
  };
  const registerPosition = (inputText) => {
    setPosition(inputText);
  };

  const goToLogin = () => {
    history.push(`/login`);
  };

  const goToSignUp = () => {
    history.push(`/signup`);
  };

  const handleRegisterSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        firebase
          .firestore()
          .collection('accounts')
          .doc(firebase.auth().currentUser.uid)
          .set({
            userName: userName,
            email: email,
            password: password,
            uid: firebase.auth().currentUser.uid,
            nickName: '',
          })
      )
      .then(() => {
        sendResetPasswordEmail();
        history.push(`/dashboard`);
      })
      .catch((error) => {
        console.log('error when signing up', error);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
      <StatusBar
        backgroundColor="#ffffff"
        barStyle={'dark-content'}

      />

      <PageHeaderSignup placeholder='Đăng nhập' placeholder2='Đăng kí'
        onPressNavigationDN={goToLogin} onPressNavigationDK={goToSignUp} >

      </PageHeaderSignup>
      <Animatable.View style={styles.mainContainer} animation='lightSpeedIn' duration={300}>
        <View style={{ justifyContent: 'center', alignItems: 'center', top: 24, marginBottom: 32 }}>
          <Image

            source={require('../Images/logoyouus.png')}
          />
        </View>
        <View style={styles.logInContainer} >
          <View style={{
            height: 56, width: '90%', flexDirection: 'row', marginTop: 32,
            backgroundColor: '#EDEDF2', marginLeft: 16, marginRight: 16, borderRadius: 35, borderTopLeftRadius: 35, borderTopRightRadius: 35, marginBottom: 24, shadowRadius: 5,
          }}>
            <Feather style={{ alignItems: 'center', justifyContent: 'center', left: 15, justifyContent: 'center', marginTop: 15 }} name='smile' size={25} color='black'>

            </Feather>
            <TextInput
              style={styles.textInput}
              textContentType='name'
              name='name'
              placeholder='Họ và tên'
              placeholderTextColor='black'
              inputText={userName}
              onChangeText={registerUserName}
              required
            />
          </View>
          <View style={{
            height: 56, width: '90%', flexDirection: 'row',
            backgroundColor: '#EDEDF2', marginLeft: 16, marginRight: 16, borderRadius: 35, borderTopLeftRadius: 35, borderTopRightRadius: 35, marginBottom: 24, shadowRadius: 5,
          }}>
            <Feather style={{ alignItems: 'center', justifyContent: 'center', left: 15, justifyContent: 'center', marginTop: 15 }} name='user' size={25} color='black'>

            </Feather>
            <TextInput
              style={styles.textInput}
              textContentType='emailAddress'
              name='email'
              value={email}
              onChangeText1={(text) => setEmail1({ value: text, error: '' })}
              error={!!email1.error}
              errorText={email1.error}
              placeholder='Email'
              placeholderTextColor='black'
              inputText={email1.value}
              onChangeText={registerEmail}
              required
            />
          </View>

          <View style={{
            height: 56, width: '90%', flexDirection: 'row',
            backgroundColor: '#EDEDF2', marginLeft: 16, marginRight: 16, borderRadius: 35, borderTopLeftRadius: 35, borderTopRightRadius: 35, marginBottom: 32, shadowRadius: 5,
          }}>
            <Feather style={{ alignItems: 'center', justifyContent: 'center', left: 15, justifyContent: 'center', marginTop: 15 }} name='lock' size={25} color='black'>

            </Feather>
            <TextInput
              style={styles.textInput}
              textContentType='password'
              name='password'
              placeholder='Mật khẩu'
              placeholderTextColor='black'
              inputText={password}
              inputText2={getPassword}
              onChangeText2={handlePassword2}
              secureTextEntry={passwordVisialbe}
              onChangeText={registerPassword}

              required
            />
            <Feather style={{ alignItems: 'center', justifyContent: 'center', marginTop: 18 }} name={passwordVisialbe ? 'eye-off' : 'eye'} size={25} color='black'
              onPress={() => setpasswordVisialbe(!passwordVisialbe)}></Feather>
          </View>
          <TouchableOpacity onPress={handleRegisterSubmit}>
            <View style={{ height: 56, width: 280, backgroundColor: '#0176E4', borderRadius: 20, justifyContent: 'center', alignSelf: 'center', shadowRadius: 10, }}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#ffffff', fontSize: 20 }} >
                Đăng Ký
              </Text>
            </View>
          </TouchableOpacity>
        </View>




      </Animatable.View>

    </SafeAreaView>

  );
}
const styles = StyleSheet.create({

  mainContainer: { backgroundColor: '#E2E2E2', height: '100%' },
  welcomeTitle: {

    fontSize: 50,
    fontWeight: 'bold',
  },
  logInContainer: {
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
  },
  logIn: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 10,
  },
  signUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 40,
    marginTop: 40,
  },
  signUp: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 15,
  },
  password: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export { SignUp };
