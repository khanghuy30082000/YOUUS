import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,StatusBar, SafeAreaView } from 'react-native';
import { useHistory } from 'react-router-native';
import { PageHeaders } from '../AppComponents/PageHeaders';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/compat/app';
import { Friend } from './Friend';
import { Request } from './Request';
import { Footer } from '../Wall/Footer';

function FriendRequests(props) {
  const history = useHistory();
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  
  const profileUid = firebase.auth().currentUser.uid;
  console.log(profileUid);

  const fetchFriends = useFirestoreCollection(
    db.collection('accounts').doc(userId).collection('friends'),
    []
  );

  const friendRequestsPending = fetchFriends.map((friend) => {
    if (friend.data.requestAccepted === false) {
      return friend.id;
    }
  });

  const friendRequestAccepted = fetchFriends.map((friend) => {
    if (friend.data.requestAccepted === true || friend.data.isFriend === true) {
      return friend;
    }
  });
  
  const backToDashboard = () => {
    history.push(`/dashboard`);
  };

  return (
<SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
<StatusBar
     backgroundColor="#ffffff"
    barStyle={'dark-content'}
   
   />
    <View style={styles.requestContainer}>
      <PageHeaders
        placeholder='Quay lại'
        onPressNavigation={backToDashboard}
      />
      <View>
        <Text style={styles.requestTitle}>Danh sách</Text>
        {friendRequestsPending.map((friendId) => {
          if (friendId !== undefined) {
            return (
              <Request key={friendId} friendId={friendId} userId={userId} />
            );
          }
        })}
        {friendRequestAccepted.map((friend) => {
          if (friend !== undefined) {
            return (
              <Friend
                key={friend.id}
                friendId={friend.id}
                friendsSince={friend.data.created}
              />
            );
          }
        })}
      </View>
      
    </View>
    <View style={{ bottom: 0, position: 'absolute', flex: 1, alignSelf: 'center', width: '100%', justifyContent: 'center', }} ><Footer /></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  requestContainer: {
    flex:1,
    backgroundColor: '#ffffff',
    elevation:20,shadowRadius:15,
  },
  requestTitle: {
    color:'#0176E4',
    marginLeft: 20,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export { FriendRequests };
