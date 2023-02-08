import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-native';
import firebase from 'firebase/compat/app';
import { useFirestoreDocument } from '../hooks';
import { db } from '../../App';

import { Avatar, ListItem } from 'react-native-elements'

const CustomListItem = ({ id, chatName, enterChat, props, avt }) => {

  const [chatMessages, setChatMessages] = useState([]);
    // console.log("id chat gr", id)

  useEffect(() => {
      const unsubscribe = db.collection('chatgroup').doc(id).collection('messages')
          .orderBy('timestamp', 'desc').onSnapshot((snapshot) => setChatMessages(snapshot.docs.map((doc) => doc.data())));
      return unsubscribe;
  })
  const getUserGroup = useFirestoreDocument(
    db.collection('chatgroup').doc(id),
    [id]
  );
  const getUsers = useFirestoreDocument(
    db.collection('accounts').doc(firebase.auth().currentUser.uid),
    [id]
  );
  // console.log('user ne', getUsers)
//   console.log('lay user', getUserGroup)
  if (!getUserGroup) {
    return null;
  }
  

  return (
    <ListItem
        // key={id}
        onPress={() => enterChat(id, chatName)}
        key={id}
        bottomDivider>
        <Avatar
            rounded
            source={{
                uri: getUserGroup.data.avt || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
            }}
        />
        <ListItem.Content>
            <ListItem.Title
                style={{ fontWeight: "800" }}>{getUserGroup.data.chatName}
            </ListItem.Title>
            <ListItem.Subtitle
                numberOfLines={1} ellipsizeMode="tail">
                 {chatMessages?.[0]?.userName} : {chatMessages?.[0]?.message}
            </ListItem.Subtitle>    
        </ListItem.Content>


    </ListItem>
)
}

export default CustomListItem

const styles = StyleSheet.create({})