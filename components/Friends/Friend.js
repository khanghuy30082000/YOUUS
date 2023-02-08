import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/compat/app';
import Avatar from '../Images/avatar.png';
import moment from 'moment';
import { useHistory } from 'react-router-native';
import { Image as RNImage } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

function Friend({ friendId, friendsSince }) {
  const db = firebase.firestore();
  const history = useHistory();

  const fetchFriendInfo = useFirestoreDocument(
    db.collection('accounts').doc(friendId),
    []
  );

  if (!fetchFriendInfo) {
    return null;
  }
  const goToProfile = (friendId) => {
    history.push(`/profile/${friendId}`);
  };

  return (
    <SafeAreaView style={styles.friends}>
      {fetchFriendInfo.data.profilePicture ? (
        <TouchableOpacity onPress={() => goToProfile(friendId)}>
          <Image
            uri={fetchFriendInfo.data.profilePicture}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      ) : (
        <RNImage source={Avatar} style={styles.avatarImage} />
      )}
      
      <View style={styles.friendsData}>
      <TouchableOpacity onPress={() => goToProfile(friendId)}>
       <View>
       
       <Text style={styles.userName}>{fetchFriendInfo.data.userName}</Text>
        <Text>
        ( Bạn bè kể từ ngày: {moment(friendsSince.toDate()).format('DD/MM/YYYY')})
        </Text>
        </View>
       </TouchableOpacity>
        
       
       
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  friends: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red',
    marginLeft: 20,
    marginTop: 20,
  },
  avatarImage: { width: 40, height: 40, borderRadius: 50 },

  friendsData: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { Friend };
