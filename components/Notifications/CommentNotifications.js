import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image as RNImage  } from 'react-native';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/compat/app';
import moment from 'moment';
import { useHistory } from 'react-router-native';
import { Image } from 'react-native-expo-image-cache';
import { Feather, AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Avatar from '../Images/avatar.png'
function CommentNotifications({
  friendId,
  placeholder,
  created,
  isRead,
  postId,
  userId,
  commentId,
}) {
  const history = useHistory();
  const db = firebase.firestore();

  const goToPost = () => {
    markAsRead();
    history.push(`/post/${postId}`);
    
  };

  const getFriendInfo = useFirestoreDocument(
    db.collection('accounts').doc(friendId),
    []
  );

  if (!getFriendInfo) {
    return null;
  }

  const markAsRead = () => {
    db.collection('accounts')
      .doc(userId)
      .collection('commentNotifications')
      .doc(commentId)
      .update({
        markedAsRead: true,
      });
  };

  return (
    <View
      style={[
        styles.notificationBody,
        isRead === true ? styles.notificationBodyMarkedAsRead : null,
      ]}
      key={commentId}
    >
      <TouchableOpacity onPress={() => goToPost(postId)}>
      <View style={styles.newNotif}>
          <View>
        {getFriendInfo.data.profilePicture ? (
            <TouchableOpacity  >
              <Image
                uri={getFriendInfo.data.profilePicture}
                style={styles.avatarImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity  >
              <RNImage source={Avatar} style={styles.avatarImage} /></TouchableOpacity>
          )}
          </View>
          <View>
            <View style={{flexDirection:'row',width:'70%'}}>
            <Text style={styles.userName}>{getFriendInfo.data.userName}</Text>
          <Text>{placeholder}</Text>
            </View>
          <View>
          <Text style={styles.date}>
          {moment(created.toDate()).format('DD/MM, hh:ss')}
        </Text>
          </View>
      
        </View>
        <View style={{justifyContent:'center',alignItems:'center',margin:20}}>
        {isRead === true ? null : (
          <TouchableOpacity onPress={markAsRead}>

            <View style={styles.option}>
              <AntDesign name='ellipsis1' size={24} color='black' />
            </View>
          </TouchableOpacity>
        )}
        </View>
        </View>
       
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationBody: {
    display: 'flex',
    flexDirection: 'row',
    width:'100%',
    padding: 16,
    backgroundColor:'while',
  },
  notificationBodyMarkedAsRead: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
  },
  option: {
    alignItems: 'center',
    justifyContent:'center',
   
    marginEnd:5,
  },
  date:{marginLeft:5,marginTop:5,},
  avatarImage: { width: 48, height: 48, borderRadius: 50 },
  newNotif: { display: 'flex', flexDirection: 'row', alignItems: 'center' },

  userName: { fontWeight: 'bold', marginRight: 5,marginLeft:5, },
});

export { CommentNotifications };
