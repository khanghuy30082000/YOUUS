import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert } from 'react-native'

import React, { useState } from 'react';
import Avatar from '../Images/avatar.png';
import { Image as RNImage } from 'react-native';
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-native';
import { Image } from 'react-native-expo-image-cache';
import { Feather, Ionicons, Octicons, AntDesign } from '@expo/vector-icons';
import { Footer } from '../Wall/Footer';
import { PageHeaders } from '../AppComponents/PageHeaders'
import { useFirestoreDocument } from '../hooks';
import OptionProfile from '../AppComponents/OptionProfile';
import * as Animatable from 'react-native-animatable'
const CaNhan = (props) => {
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const profileUid = user.uid;
  console.log(profileUid);
  const db = firebase.firestore();

  // const getUserProfileInfo = useFirestoreDocument(
  //   db.collection('accounts').doc(profileUid),
  //   [profileUid]
  // );
  const goBack = () => {
    history.push(`/dashboard`)
  };
  const handleLogOut = (event) => {
    history.push(`/login`);
    if (user.uid === null) {
      history.push(`/`);
    }
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Đăng xuất thành công');
        // history.push(`/`);
      
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const goToProfile = () => {
    history.push(`/profile/${profileUid}`);
  };
  const goToSecurityScreen = () => {
    history.push(`/SecurityScreen`);
  };
  const goToPrivatePermission = () => {
    history.push(`/PrivatePermissions`);
  };
  const goToWall = () => {
    history.push(`/dashboard`);

  };
  // if (!getUserProfileInfo) {
  //   return null;
  // }
  const goToEditProfileOption = () => {
    history.push(`/EditprofileOption`);

  };
  const showConfirmDialog = () => {
    return Alert.alert(
      "Bạn có chắc chắn",
      "Đăng xuất khỏi tài khoản của bạn",
      [
        {
          text: "Hủy",
        }, {
          text: "Có",
          onPress: () => {
            handleLogOut()
          },
        },
      ]
    );
  };

  const editIcon = <Feather name='edit-2' size={24} color='black' />;
  const lockIcon = <Feather name='lock' size={24} color='black' />;
  const pocketIcon = <Feather name='pocket' size={24} color='black' />;
  const logoutIcon = <Feather name='log-out' size={24} color='red' />;
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#E2E2E2', }}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />

      <PageHeaders
        placeholder='Cá Nhân'
        onPressNavigation={goBack}
      />
<Animatable.View animation='bounceInRight' duration={3000}>
<OptionProfile />
</Animatable.View>
      


      <View style={{ backgroundColor: '#ffffff', flexDirection: 'column', borderRadius: 12, width: '100%', justifyContent: 'center', width: '100%' }}>
        <TouchableOpacity onPress={goToEditProfileOption}>
          <View style={styles.clickoption}>
            {editIcon}
            <Text>   Chỉnh sửa thông tin</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToPrivatePermission}>
          <View style={styles.clickoption}>
            {lockIcon}
            <Text>   Quyền riêng tư</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity  onPress={goToSecurityScreen}>
          <View style={styles.clickoption}>
            {pocketIcon}
            <Text>   Bảo mật</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showConfirmDialog()}>
          <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20, marginBottom: 30, }}>
            {logoutIcon}
            <Text style={{ color: 'red' }}>   Đăng xuất</Text>
          </View>
        </TouchableOpacity>


      </View>
      <View style={{ bottom: 0, position: 'absolute', flex: 1, alignSelf: 'center', width: '100%', justifyContent: 'center', }} ><Footer /></View>
    </SafeAreaView>

  )
}

export default CaNhan

const styles = StyleSheet.create({
  userName: { fontWeight: '700', marginRight: 5, marginLeft: 5, fontSize: 17 },
  avatarImage: { width: 48, height: 48, borderRadius: 50, marginLeft: 16, justifyContent: 'center', alignSelf: 'center', marginTop: 15 },
  clickoption: { flexDirection: 'row', marginTop: 20, marginLeft: 20, marginBottom: 10, }
})
