import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,StatusBar, SafeAreaView } from 'react-native';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/compat/app';
import { PageHeaders } from '../AppComponents/PageHeaders';
import { useHistory } from 'react-router-native';
import { Friend } from './Friend';

function FriendsList(props) {
  const history = useHistory();
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const fetchFriends = useFirestoreCollection(
    db.collection('accounts').doc(userId).collection('friends'),
    []
  );

  const goToFriendProfile = (friendId) => {
    history.push(`/profile/${friendId}`);
  };

  const backToUserProfile = () => {
    history.push(`/profile/${userId}`);
  };

  return (
    <SafeAreaView style={styles.friendsContainer}>
      <StatusBar
     backgroundColor="#ffffff"
    barStyle={'dark-content'}
   
   />
      <PageHeaders
        placeholder='Quay lại'
        onPressNavigation={backToUserProfile}
      />
      <View style={{backgroundColor:'#ffffff',borderTopLeftRadius:20,borderTopRightRadius:20,height:'100%',marginTop:8,}}>
      <Text style={styles.friendsTitle}>Bạn bè</Text>
      {fetchFriends.map((friend) => {
        const friendId = friend.id;
        if (
          friend.data.requestAccepted === true ||
          friend.data.isFriend === true
        )
          return (
            <TouchableOpacity
              onPress={() => goToFriendProfile(friendId)}
              key={friend.id}
            >
              <Friend
                key={friend.id}
                friendId={friend.id}
                friendsSince={friend.data.friendsSince}
              />
            </TouchableOpacity>
          );
      })}</View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  friendsContainer: {height:'100%',},
  friendsTitle: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export { FriendsList };
