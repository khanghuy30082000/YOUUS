import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import firebase from 'firebase/compat/app';
import { useFirestoreCollection } from '../hooks';
import { Feather } from '@expo/vector-icons';
import { Friend } from './Friend';
import { CheckBox } from 'react-native-elements';
import SearchChatItemCaNhan from '../AppComponents/SearchChatItemCaNhan';
import { RadioButton } from 'react-native-paper';

function TagFriendsList({
  setModalVisible,
  modalVisible,
  userId,
  handleTagFriend,
}) {
  const db = firebase.firestore();

  const fetchFriendsToTag = useFirestoreCollection(
    db.collection('accounts').doc(userId).collection('friends'),
    []
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Feather name='chevron-left' size={26} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gắn thẻ</Text>
      </View>
      <SearchChatItemCaNhan></SearchChatItemCaNhan>
      <View style={styles.feelingsTable}>
        {fetchFriendsToTag.map((friend) => {
          const friendId = friend.id;
          return (
            <TouchableOpacity
              onPress={() => {
                handleTagFriend(friendId);
                setModalVisible(!modalVisible);
              }}
            >
            <View style={{display:'flex',flexDirection:'row'}}>
          
            <Friend friendId={friend.id} friendsSince={friend.data.created}  />
            </View>
             
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',

    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    padding: 15,
  },
  headerTitle: { fontWeight: 'bold', fontSize: 20,color:'#0176E4',marginLeft:'35%' },
  feelingsTable: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export { TagFriendsList };
