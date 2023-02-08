import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert ,Dimensions,TextInput, SafeAreaView} from 'react-native';
import { Image as RNImage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image, Video } from 'react-native-expo-image-cache';
import { useHistory } from 'react-router-native';
import moment from 'moment';
import { Feelings } from './Feelings';
import { useFirestoreDocument, useFirestoreCollection } from '../hooks';
import firebase from 'firebase/compat/app';
import Avatar from '../Images/avatar.png';
import { Feather, AntDesign, FontAwesome, MaterialIcons, SimpleLineIcons,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import { TaggedFriend } from '../Friends/TaggedFriend';
import { doc, updateDoc, deleteField } from "firebase/firestore";
import BottomSheet from "react-native-easy-bottomsheet";
 import Svg, { Path,Rect,G,Defs ,ClipPath,fill} from "react-native-svg";

const PostImage = (post, isWith, postId) => {
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
  
    const goToTaggedUserProfile = (isWith) => {
      history.push(`/profile/${isWith}`);
    };
  
    const fetchUser = useFirestoreDocument(
      db.collection('accounts').doc(post.userId),
      []
    );
    const fetchMyUser = useFirestoreDocument(
      db.collection('accounts').doc(userId),
      []
    );
    const openPost = (postId) => {
        history.push(`/post/${postId}`);
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
    <SafeAreaView>
      <View>
       
       
       {post.post ? (<Text style={styles.post}>{post.post}</Text>):(<Text style={{marginBottom:0}}></Text>)} 
        <View >
          {post.postPicture && (
            <TouchableOpacity onPress={() => openPost(postId)} >
              <Image 
                uri={post.postPicture}
                style={styles.postImage}
              />
            </TouchableOpacity>
          )}
        </View>
     
                
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
   
    marginLeft:20,
    backgroundColor:'#E9E9E9',
    width:'75%',marginTop:12,
    justifyContent:'center',
    paddingBottom: 10,
    fontSize: 14,color:'#7F7F7F'
  },
  userHeader: {
    
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
   width:'100%',
   marginLeft:10,
  },
  postImage: {
   
    height:(Dimensions.get('window').width),
    width:'110%',
    flexDirection:'column',
    resizeMode: 'contain',
    maxHeight: 480,
    marginTop:4,left:-10,
    top: -10,
     
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 8,top:-5
  },
  userfeelings: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2B2B2B',
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
    marginTop:0,
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
  }
});

export default PostImage
