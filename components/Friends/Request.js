import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/compat/app';
import Avatar from '../Images/avatar.png';
import { Image } from 'react-native-expo-image-cache';
import { Image as RNImage } from 'react-native';
import { auth } from '../../App';

function Request({ friendId, userId }) {

  const getUser = useFirestoreDocument(
    firebase.firestore().collection('accounts').doc(user.uid),
    [uid]
);
console.log('name', getUser)
  const history = useHistory();
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  const fetchUserInfo = useFirestoreDocument(
    db.collection('accounts').doc(friendId),
    []
  );

  if (!fetchUserInfo) {
    return null;
  }

  const confirmFriendRequest = (friendId) => {
    db.collection('accounts')
      .doc(friendId)
      .collection('friends')
      .doc(userId)
      .update({
        isFriend: true,
        friendsSince: firebase.firestore.Timestamp.fromDate(new Date()),
        userName: getUser.data.userName,
        email: auth.currentUser.email,
        uid: user.uid
      });
    db.collection('accounts')
      .doc(userId)
      .collection('friends')
      .doc(friendId)
      .update({
        requestAccepted: true,
        friendsSince: firebase.firestore.Timestamp.fromDate(new Date()),
        userName: auth.data.userName,
        email: auth.currentUser.email,
        uid: friendId
      });
    db.collection('accounts')
      .doc(friendId)
      .collection('friendsNotifications')
      .doc(userId)
      .set({
        friends: userId,
        isFriend: true,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        markedAsRead: false,
        userName: getUser.data.userName,
        email: auth.currentUser.email,
        uid: user.uid
      });
    history.push(`/dashboard`);
  };

  return (
    <View style={styles.requests} key={friendId}>
      <View style={styles.profileInfoContainer}>
        {fetchUserInfo.data.profilePicture ? (
          <Image
            uri={fetchUserInfo.data.profilePicture}
            style={styles.avatarImage}
            
          />
        ) : (
          <RNImage source={Avatar} style={styles.avatarImage} />
        )}
        <Text style={styles.userName}>{fetchUserInfo.data.userName}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => confirmFriendRequest(friendId)}>
          <View style={styles.friendRequestButton}>
            <Text style={styles.buttonPlaceholder}>Xác nhận</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.removeButton}>
            <Text style={styles.buttonPlaceholder}>Xóa</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  requests: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    justifyContent:'center',
    marginLeft: 20,
    marginRight:20,
    elevation:6,
   backgroundColor:'#f8ffff',
    borderRadius:15,shadowRadius:15,
  },
  profileInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatarImage: {
    marginLeft: 20,
    marginRight: 10,
    width: 40,
    height: 40,
    marginTop:10,
    borderRadius: 50,
  },
  userName: { fontSize: 18, fontWeight: 'bold',marginTop:10, },
  buttons: { display: 'flex', flexDirection: 'row',marginHorizontal:70, },
  friendRequestButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0176E4',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    shadowRadius:10,elevation:-5,
    marginTop: 10,
  },
  removeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    shadowRadius:10,elevation:-5,
    marginTop: 10,
    marginLeft: 20,
  },
  buttonPlaceholder: { fontSize: 16 ,color:'#ffffff'},
  friendSection: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export { Request };
