import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import { useFirestoreDocument } from '../hooks';

function TaggedFriend({ friendId }) {
  const db = firebase.firestore();

  const fetchFriendInfo = useFirestoreDocument(
    db.collection('accounts').doc(friendId),
    []
  );

  if (!fetchFriendInfo) {
    return null;
  }

  if (friendId === undefined) {
    return null;
  }

  return (
    <View style={styles.friendSection}>
      <Text style={styles.isWith}>cùng</Text>
      <Text style={styles.friend}> {fetchFriendInfo.data.userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  friendSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  isWith: {
    fontSize: 14,
  },
  friend: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export { TaggedFriend };