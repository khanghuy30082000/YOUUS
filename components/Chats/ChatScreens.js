import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Image, StatusBar } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Footer } from '../Wall/Footer';
import TabCaNhan from './TabCaNhan';

import { PageHeadersIb } from '../AppComponents/PageHeadersIb';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'
import SearchChatItemCaNhan from '../AppComponents/SearchChatItemCaNhan';
import { Avatar, ListItem } from 'react-native-elements'
import CustomIbCaNhan from '../../components/AppComponents/CustomIbCaNhan'
import { useFirestoreCollection, useFirestoreDocument } from '../hooks';

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const ChatScreens = (props) => {
  const [img, setImg] = useState(null)
  const [users, setUsers] = useState(null)
  // const [users, setUsers] = useState(null)
  const [nickname, setNickName] = useState(null)
  const user = firebase.auth().currentUser;
  const docid = uid > user.uid ? user.uid + "" + uid : uid + "" + user.uid
  const uid = user.uid
  // console.log('_________________________________________________________')
  // console.log('docid', docid)
  // console.log('uid', uid)
  // console.log('user.uid', user.uid)
  // console.log('________________  _________________________________________')
  const db = firebase.firestore();

  const getUsers = async () => {
    const querySanp = await firebase.firestore().collection("accounts").doc(uid).collection('friends').get()
    const allFr = querySanp.docs.map(docSnap => docSnap.data())
    setUsers(allFr)
  }
  useEffect(() => {
    getUsers()
  }, [])
  // const getNickname = async () => {
  //   const querySanp = await firebase.firestore().collection("nickname").doc(docid).get()
  //   const allNickname = querySanp.docs.map(docSnap => docSnap.data())
  //   setNickName(allNickname)
  //   console.log('allNickname', allNickname)
  // }
  // useEffect(() => {
  //   getNickname()
  // }, [])



  // console.log('allNickname', allNickname)

  // const anh = useFirestoreDocument(
  //   db.collection('accounts').doc(user.uid),
  //   [uid]
  // );
  // console.log('lay ra thoi', anh)

  const getImg = async () => {
    const querySanp = await firebase.firestore().collection('accounts').where('uid', '!=', user.uid).get()
    const allImg = querySanp.docs.map(docSnap => docSnap.data())
    setImg(allImg)
    // console.log('_________________________________________________________')
    // console.log('img', allImg)
  }
  useEffect(() => {
    getImg()
  }, [])

  const history = useHistory();
  const gotoTabNhom = () => {
    history.push(`/TabNhom`);
  };
  const goBack = () => {
    history.goBack();
  };


  const RenderCard = ({ item }) => {
    const gotoChatOne = () => {
      history.push("/chatone", { userName: item?.nickname || item?.userName, uid: item.uid, avatar: item?.profilePicture, bia: item?.coverPicture, email: item?.email });
    };
    // const docid = item.uid > user.uid ? user.uid + "" + uid : item.uid + "-" + user.uid
    // console.log('docid', docid)

    return (
      <TouchableOpacity onPress={gotoChatOne}>

        <ListItem>
          <Avatar
            rounded
            source={{
              uri: item.profilePicture || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
            }}
          />
          <ListItem.Content>
          {
            item.nickname ? (
              <ListItem.Title
              style={{ fontWeight: "800" }}>{item.nickname}
            </ListItem.Title>
            ) : (
              <ListItem.Title
              style={{ fontWeight: "800" }}>{item.userName}
            </ListItem.Title>
            )
          }
            <ListItem.Subtitle>
              {item.email}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

      </TouchableOpacity>
    )
  }
  const nicknameChat = useFirestoreDocument(
    db.collection('chatrooms').doc(docid).collection('nickname').doc(user.uid),
    []
  );

  if (!nicknameChat) {
    return null;
  }

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor="white" />
      <View style={styles.viewHeader}>
        <TouchableOpacity style={{ width: "5%", marginStart: 16 }} onPress={goBack}>
          <Feather name='chevron-left' size={24} color='black' />
        </TouchableOpacity>
        <View style={{
          width: "85%",
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 18, color: '#0176E4', fontWeight: 'bold' }}>Tin nhắn</Text>
        </View>
      </View>
      <View style={{
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row'
      }}>
        <TouchableOpacity style={{
          height: 50,
          width: "50%",
          alignItems: 'center',
          justifyContent: "center",
          borderBottomWidth: 1.5,
          borderBottomColor: "#0176E4"
        }}>
          <Text style={{
            fontSize: 16,
            color: '#0176E4',
            fontWeight: 'bold'
          }}>
            Cá nhân
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          height: 50,
          width: "50%",
          alignItems: 'center',
          justifyContent: "center",
        }} onPress={gotoTabNhom}>
          <Text style={{
            fontSize: 16,
            color: 'black',
            fontWeight: 'bold'
          }}>
            Nhóm
          </Text>
        </TouchableOpacity>
      </View>
      <SearchChatItemCaNhan />
      <FlatList
        data={users}
        renderItem={({ item }) => { return <RenderCard item={item} /> }}
        keyExtractor={(item) => item.email}
        style={{ flex: 0.8 }} />

      <View style={{ bottom: 0, position: 'absolute', flex: 1, alignSelf: 'center', width: '100%', justifyContent: 'center', }} ><Footer /></View>
    </SafeAreaView>

  )
}
export default ChatScreens

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: 'white',
  },
  postHeader: {
    paddingStart: 20,
  },
  viewHeader: {
    height: 40,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
})