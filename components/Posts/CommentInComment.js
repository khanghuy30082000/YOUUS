import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFirestoreDocument } from '../hooks';
import firebase from 'firebase/compat/app';
import Avatar from '../Images/avatar.png';
import moment from 'moment';
import { Image } from 'react-native-expo-image-cache';
import { Image as RNImage } from 'react-native';
import { colors } from 'react-native-elements'; 
import { TextInput } from 'react-native-gesture-handler';


const CommentInComment = ({ comment }) => {
    const db = firebase.firestore();
  const [isVisi, setVisi] = useState(false);
  const fetchUser = useFirestoreDocument(
    db.collection('accounts').doc(comment.user),
    []
  );

  if (!fetchUser) {
    return null;
  }
  return (
    <View style={styles.commentContainer}>
    <View key={comment.id} style={styles.commentSection}>
      <View>

      </View>
      {fetchUser.data.profilePicture ? (
        <TouchableOpacity >
          <Image
            uri={fetchUser.data.profilePicture}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      ) : (
        <RNImage source={Avatar} style={styles.avatarImage} />
      )}
      <View>
        <View style={styles.comment}>
          <Text style={styles.userName}>{fetchUser.data.userName}</Text>
          <Text>{comment.postComment}</Text>
        </View>

        <View style={{flexDirection:'row',alignContent:'center'}}>
        <Text style={styles.date}>
          {moment(comment.created.toDate()).format('DD/MM, hh:ss')}
        </Text>
        <TouchableOpacity onPress={()=>{setVisi(!isVisi)}} >
          {isVisi===true ? ( <Text style={styles.date1}>
              Thích
             </Text>):(<Text style={styles.date3}>
         Thích
        </Text>)}
          
           
         </TouchableOpacity>
        <TouchableOpacity >
          <Text style={styles.date3}>
          Trả lời
        </Text>
        </TouchableOpacity>
       
        <Text style={styles.date2}>
         0 lượt thích
        </Text>
        </View>
       
        
      </View>
    </View>
  </View>
  )
}

export default CommentInComment

const styles = StyleSheet.create({
    commentContainer: { backgroundColor: 'white' },
    commentSection: {
      display: 'flex',
      flexDirection: 'row',
      
    },
    avatarImage: {
      marginLeft: 32,
      marginRight: 10,
      width: 32,
      height: 32,
      marginTop:5,
      borderRadius: 50,
    },
  
    comment: {
      backgroundColor: '#F6F6F6',
      marginTop: 4,
      width:250,
      maxWidth: 375,
      maxHeight: 100,padding:5,
      borderRadius: 8,marginBottom:4,
    },
    userName: {
      fontSize:12,
      fontWeight: 'bold',
     
    },
    date: { fontSize: 12, marginTop: 2 ,marginRight:10,  },
    date3 : { fontSize: 12, marginTop: 2 ,marginRight:10, fontWeight: 'bold'  },
    date1 : { fontSize: 12, marginTop: 2 ,marginRight:10, fontWeight: 'bold',color:'blue'  },
    date2: { fontSize: 12, marginTop: 2 ,marginRight:7,marginLeft:30, },
})