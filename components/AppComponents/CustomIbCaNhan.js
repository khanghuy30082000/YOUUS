import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-native';
import firebase from 'firebase/compat/app';
import { useFirestoreDocument } from '../hooks';
// import { useHistory } from 'react-router-native';

import { Avatar, ListItem } from 'react-native-elements'


const CustomIbCaNhan = () => {

  const history = useHistory();
  const gotoChats = () => {
    history.push("/chat");
  };
  // const user = firebase.auth().currentUser;
  // const userId = user.uid;
  // const db = firebase.firestore();
  // const getCurrentLoggedUser = useFirestoreDocument(
  //   firebase.firestore().collection('accounts').doc(userId),
  //   [userId]
  // );

  // if (!getCurrentLoggedUser) {
  //   return null;
  // }
  return (
    <View>
      <TouchableOpacity onPress={gotoChats}>
        <ListItem
          bottomDivider>
          <Avatar
            rounded
            source={{ uri: "https://znews-photo.zingcdn.me/w660/Uploaded/wobvjuz/2022_07_20/jack_ngoi_sao_co_don_full.jpg", }}>
          </Avatar>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700' }}>
              Jack
            </ListItem.Title>
            <ListItem.Subtitle>
              Jack: Mai đi hát Karaoke với tui không
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
      <TouchableOpacity  onPress={gotoChats}>
        <ListItem
          bottomDivider>
          <Avatar
            rounded
            source={{ uri: "https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/9/8/-1631110907237612602136.jpg", }}>
          </Avatar>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700' }}>
              Linh Ngọc Đàm
            </ListItem.Title>
            <ListItem.Subtitle>
              Ngọc Đàm: Tui thích Thành Thắng
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>

      <TouchableOpacity  onPress={gotoChats}>
        <ListItem
          bottomDivider>
          <Avatar
            rounded
            source={{ uri: "https://cdnmedia.tinmoi.vn/upload/camnhung/2022/09/09/tran-thanh-bat-luc-roi-vao-tinh-canh-chi-muon-khoc-hau-duoc-minh-oan-vu-ba-phuong-hang-1662712822-3.jpg", }}>
          </Avatar>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700' }}>
              Trấn Thành
            </ListItem.Title>
            <ListItem.Subtitle>
              Trấn Thành: Tui thấy Thắng đẹp trai vl
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>

      <TouchableOpacity  onPress={gotoChats}>
        <ListItem
          bottomDivider>
          <Avatar
            rounded
            source={{ uri: "https://image.thanhnien.vn/w1024/Uploaded/2022/jhvabun/2020_12_30/photo-1-16092554908561278237856_gfat.jpg", }}>
          </Avatar>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700' }}>
              Sơn Tùng M-TP
            </ListItem.Title>
            <ListItem.Subtitle>
              M-TP: Mai đi nhảy đầm không em?
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </View>
  )
}

export default CustomIbCaNhan

const styles = StyleSheet.create({})