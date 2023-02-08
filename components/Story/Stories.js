import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert ,Dimensions,TextInput, SafeAreaView,StatusBar} from 'react-native';
import { Image as RNImage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image, Video } from 'react-native-expo-image-cache';
import { useHistory } from 'react-router-native';
import moment from 'moment';

import { useFirestoreDocument, useFirestoreCollection } from '../hooks';
import firebase from 'firebase/compat/app';
import Avatar from '../Images/avatar.png';
import { Feather, AntDesign, FontAwesome, MaterialIcons, SimpleLineIcons,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import { TaggedFriend } from '../Friends/TaggedFriend';
import { doc, updateDoc, deleteField } from "firebase/firestore";
import BottomSheet from "react-native-easy-bottomsheet";
 import Svg, { Path,Rect,G,Defs ,ClipPath,fill} from "react-native-svg";
 import EmojiSelector, { Categories } from "react-native-emoji-selector";
const Stories = (story, isWith, storyId) => {
  const [comment, setComment] = useState('');
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();
  const history = useHistory();
  const [isVisible, setVisible] = useState(false);
  const [isVisible1, setVisible1] = useState(false);
  const [comment2, setComment2] = useState([]);
  const goToProfile = (id) => {
    history.push(`/profile/${id}`);
  };
  const backToDashboard = () => {
    history.push(`/dashboard`);
  };
  const goToTaggedUserProfile = (isWith) => {
    history.push(`/profile/${isWith}`);
  };

  const fetchUser = useFirestoreDocument(
    db.collection('accounts').doc(userId),
    []
  );
  const fetchMyUser = useFirestoreDocument(
    db.collection('accounts').doc(userId),
    []
  );

  const fetchComments = useFirestoreCollection(
    db.collection('stories/' + storyId + '/comments'),
    []
  );
  const butonCancel = () =>{
    setVisible(false);
  }
  const handleCommentInput = (inputText) => {
    setComment(inputText);
  };
  const addCommentToPost = () => {
    db.collection('stories')
      .doc(storyId)
      .collection('comments')
      .add({
        postComment: comment,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        user: userId,
        
      });
   
  };
  const showConfirmDialog = () => {
    return Alert.alert(
      "Bạn có chắc chắn",
      "Muốn xoá bài viết này không?",
      [
        {
          text: "Hủy",
        }, {
          text: "Có",
          onPress: () => {
            deleteLikesToDb(userId)
          },
          
        },
      ]
    );
  };

  // db.collection("posts").ddoc(post.id).collection('comments').get().subscribe(doc=>{
  //   console.log(doc.count)

  //   })
  // console.log(db.collection('posts').doc(post.id).collection('comments').get().size);
  console.log(db.collection('stories').doc(story.id));

  const numberOfComments = fetchComments.length;
  const addLikesToDb = () => {

    if ((story.usersWhoLiked || []).find((user) => user === userId) === undefined) {
      db.collection('stories')
        .doc(storyId)
        .update({
          usersWhoLiked: firebase.firestore.FieldValue.arrayUnion(userId),
        });

      db.collection('accounts')
        .doc(story.userId)
        .collection('likesNotifications')
        .add({
          created: firebase.firestore.Timestamp.fromDate(new Date()),
          userId: userId,
          story: storyId,
          markAsRead: false,
        });
    } else {


      const docRef = doc(db, "stories", storyId);
      const data = {
        'usersWhoLiked': firebase.firestore.FieldValue.arrayRemove(userId)
      };
      updateDoc(docRef, data)
        .then(() => {
          console.log("Code Field has been deleted successfully");
        })
        .catch(() => {
          console.log(error);
        })
    }
  }

  const deleteLikesToDb = () => {
    db.collection('stories')
      .doc(storyId)
      .delete({
        usersWhoLiked: firebase.firestore.FieldValue.arrayUnion(userId),
      });
    db.collection('accounts')
      .doc(story.userId)
      .collection('likesNotifications')
      .add({
        created: firebase.firestore.Timestamp.fromDate(new Date()),
      userId: userId,
        story: storyId,
        markAsRead: false,
      });
  };
  //lấy id người post bài


  const openPost = (storyId) => {
    history.push(`/post/${storyId}`);
  };

  const openSingleMedia = () => {
    history.push(`/media`);
  };
  if (!fetchUser) {
    return null;
  }
  if (!fetchMyUser) {
    return null;
  }


  if (!fetchComments) {
    return null;
  }
  return (
    <SafeAreaView style={{backgroundColor:'black',height:'100%',width:'100%'}}>
        <StatusBar  barStyle={'light-content'} backgroundColor="black" />
        <View>
           <Image 
                uri='https://firebasestorage.googleapis.com/v0/b/fir-moi-2114b.appspot.com/o/storiesPictures%2F7rch2uUQkYgnxrTBSkAlCGsqS5x1%2F64.62356818248992?alt=media&token=1d84e1db-1486-453d-a471-343e4151b71f'
                style={styles.postImage}
              />
           </View>  
        <View style={{height:3,width:'95%',borderWidth:1,backgroundColor:'gray',position:'absolute',top:18,marginLeft:8 ,marginBottom:8 }}>
       
        </View> 
        <View style={styles.userHeader}>
          {fetchUser.data.profilePicture ? (
            <TouchableOpacity onPress={() => goToProfile(story.userId)} >
              <Image borderRadius={66}
                uri={fetchUser.data.profilePicture}
                style={styles.avatarImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => goToProfile(story.userId)} >
              <RNImage borderRadius={66} source={Avatar} style={styles.avatarImage} /></TouchableOpacity>
          )}
  
                  <Text style={styles.userName}>{fetchUser.data.userName} </Text>
                  <Text style={{ position:'absolute',color:'#ffffff',
  fontSize: 14,marginLeft:150,}}>14 giờ </Text>
   <View style={{position:'absolute',color:'#ffffff',fontSize: 14,marginLeft:'80%',}}>
   <TouchableOpacity>
              <Ionicons name='ellipsis-horizontal' size={20} color='#FFFFFF' /></TouchableOpacity>
            </View>
            <View style={{position:'absolute',color:'#ffffff',fontSize: 14,marginLeft:'90%',}}>
            <TouchableOpacity onPress={backToDashboard}>
              <Ionicons name='close' size={20} color='#FFFFFF' /></TouchableOpacity>
            </View>

            </View>
            <View>

            </View>
            <View style={{height:40,width:'70%',flexDirection:'row', marginTop:48,position:'absolute',bottom:10,
                  backgroundColor: '#7F7F7F', marginLeft: 16, marginRight: 16, borderRadius: 35, borderTopLeftRadius: 35, borderTopRightRadius: 35,marginBottom: 24,  shadowRadius: 13,}}>
            <TextInput
            style={styles.textInput}
            textContentType='emailAddress'
            name='email'
            placeholder='Bình luận vào khoảnh khắc  '
            placeholderTextColor='#ffffff'
          
            required
            backgroundColor='#EDEDF2'
          />
          
            </View>
            <View style={{position:'absolute',color:'#ffffff',fontSize: 14,marginLeft:'78%',bottom:40}}>
              <TouchableOpacity>
              <Ionicons name='md-heart-outline' size={28} color='#FFFFFF' /></TouchableOpacity>
            </View>
            <View style={{position:'absolute',color:'#ffffff',fontSize: 14,marginLeft:'90%',bottom:42}}>
            <TouchableOpacity>
              <Ionicons name='ios-send-sharp' size={25} color='#FFFFFF' /></TouchableOpacity>
            </View>
    </SafeAreaView>
  )
}

export default Stories

const styles = StyleSheet.create({ textInput: {
   position:'absolute',bottom:10,
  marginLeft:20,
  backgroundColor:'#7F7F7F',
  width:'75%',marginTop:16,
  justifyContent:'center',

  fontSize: 14,color:'#ffffff'
},
userHeader: {
  position:'absolute',marginTop:24,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
 width:'100%',
 marginLeft:10,
},
postImage: {
  
  height:'100%',
  width:'100%',
  flexDirection:'column',
  resizeMode: 'contain',
  marginTop:4,
   
},
detailsContainer: {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 8,top:-5
},
userfeelings: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
userName: {
  fontWeight: 'bold',position:'absolute',color:'#ffffff',
  fontSize: 14,
  marginLeft:60,
},
isWithContainer: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
},
isWith: {
  fontSize: 14
},
isWithUserName: { marginLeft: 5, fontSize: 14, fontWeight: 'bold',fontFamily:'Roboto' },
avatarImage: { width: 48, height: 48, borderRadius: 66,shadowRadius:6 },


date: { color: '#A8A39F',fontSize:12, },
post: {
  marginTop:8,
  fontSize: 14,
  marginBottom: 4,
 marginLeft:11,
  paddingVertical:4
  
},
emojis: { fontSize: 14 },

reactionData: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '#A2D8EB',
  padding: 10,
  top: -20,
},
reactionSection: {
 
  flexDirection: 'row',
  alignSelf: 'center',
  
  alignItems: 'center',
  width: 50,

},
option: {
  backgroundColor:'red',
  

},
heart: { color: 'grey', fontSize: 30 },
heartClicked: { color: 'red', fontSize: 28 },
reactionText: {
  color: '#0176E4',
  fontSize: 16,
  marginStart: 10,
},
reactionTextPi: {
  color: '#FF6196',
  fontSize: 16,
  marginStart: 10,
},

reactionContainer: {
  display: 'flex',
  flexDirection: 'row',
  marginTop:0,left:-10,
},
viewOption:{
  height: 52,
  width: "100%",
  flexDirection: 'row',
  alignItems: 'center',
  paddingStart: 16,
},
txtBlue:{
  fontSize: 16,
  paddingStart: 8,
  color:'#0176E4'
},
txtRed:{
  fontSize: 16,
  paddingStart: 8,
  color: 'red'
}})