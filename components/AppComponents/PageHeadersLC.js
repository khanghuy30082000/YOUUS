import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/compat/app';
import { AntDesign, FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
import { Avatar, ListItem } from 'react-native-elements';
import {  db } from '../../App';

function PageHeadersLC(props,{ id, chatName, enterChat }) {
  console.log("heder : ", props)
  const chatIDName = props.chatName;
  const [chatMessages, setChatMessages] = useState([]);
  const history = useHistory();

  const getChatIDName = useFirestoreDocument(
    db.collection('chatgroup').doc(chatIDName),
    [chatIDName]
  );

  useEffect(() => {
    const unsubscribe = db.collection('chatgroup').doc(id).collection('messages')
      .orderBy('timestamp', 'desc').onSnapshot((snapshot) => setChatMessages(snapshot.docs.map((doc) => doc.data())));
    return unsubscribe;

  })

  const gotoBack = () => {
    history.goBack();
  };

  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const getCurrentLoggedUser = useFirestoreDocument(
    firebase.firestore().collection('accounts').doc(userId),
    [userId]
  );

  if (!getCurrentLoggedUser) {
    return null;
  }


  return (
    <View style={styles.postHeader}>
      <Feather
        onPress={gotoBack}
        name='chevron-left'
        size={25}
        color='black'
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%', height: "60%", paddingStart:10 }}>
        <Avatar
          rounded
          source={{
            uri:
              chatMessages?.[0]?.photoURL ||
              "https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/305270856_205199545193738_6698237243765174340_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yySQsElUN7UAX_6CoQA&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT_wfesZo2jTdL-r6mltKxm1wNVdgahx3Lu8N5aOLWO8Pw&oe=632CCB66",
          }}>
        </Avatar>
        <View style={{marginStart:5, width:"85%"}}>
          <Text style={styles.requestHeaderText}>{getChatIDName.params.chatName}</Text>
        <Text style={{paddingStart: 10,}}>333 Thành Viên</Text>
        </View>
        
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal:'5%' }}>
        <TouchableOpacity style={{ paddingEnd: 20, }}>
          <Ionicons name="call" size={24} color="#0176E4" />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingEnd: 20, }}>
          <FontAwesome name='video-camera' size={24} color="#0176E4" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name='dots-three-vertical' size={24} color="#0176E4" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  postHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    height: 70,
    backgroundColor:'white'
  },
  requestHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingStart: 10,
    color:'#0176E4',
  },
});

export { PageHeadersLC };