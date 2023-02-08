import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import firebase from 'firebase/compat/app';
import { useFirestoreCollection, useFirestoreDocument } from '../hooks';
import { useHistory } from 'react-router-native';
import { Post } from '../Story/Stories';
import Story from './Story';
const ListStory = ({ profileId }) => {
   
    
    const db = firebase.firestore();
    const history = useHistory();
    const user = firebase.auth().currentUser;
    const users = user.uid;
    const fetchPosts = useFirestoreCollection(
     
      db.collection('stories').orderBy('created', 'desc'),
      [],
     
    );
    const fetchPostsw = useFirestoreCollection(
      db.collection('stories').where("userId", "==",users),
      [],
     
     
    );
  
    const fetchAccounts = useFirestoreCollection(db.collection('accounts'), []);
  
    const getUserProfileInfo = useFirestoreDocument(
      db.collection('accounts').doc(profileId),
      []
    );
  
    const getUsersFriends = useFirestoreCollection(
      db.collection('accounts').doc(profileId).collection('friends'),
      []
    );
  
    const getFriendIds = getUsersFriends.map((friend) => {
      if (friend.data.isFriend === true || friend.data.requestAccepted === true) {
        return friend.id;
      }
    });
  
    if (!getUserProfileInfo) {
      return null;
    }
  
    if (!fetchAccounts) {
      return null;
    }
  
    if (!getFriendIds) {
      return null;
    }
    return (
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 140, width: 88, marginTop: 13, marginStart: 6,}}>
            <Image
                source={{
                    uri: "https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                }}
                style={{
                    height: "100%",
                    width: "100%",
                    borderWidth: 2,
                    borderColor: '#6CA9D6',
                    borderRadius: 12,
                }}
            />
            <View style={{
                top:- 20,
                height: 20,
                width:"90%"
            }}>
               <Text style={{
                color:'white',
                fontWeight:'bold',
                fontSize:12,
                textAlign:'center'
               }}>
              { profileId}
            </Text> 
            </View>
             <View style={styles.postContainer}>
      {fetchPosts.map((story) => {
        if (
          profileId === story.data.userId ||
          getFriendIds.includes(story.data.userId)
        ) {
          return (
            <View key={story.id} style={styles.postSection}>
              {/* <Story
                story={story.data}
                storyId={story.id}
                isWith={story.data.isWith}
               
              /> */}
            </View>
          );
        }
      }
      )}
    </View>
            
        </TouchableOpacity>
    )
}

export default ListStory

const styles = StyleSheet.create({})