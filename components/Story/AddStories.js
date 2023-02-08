import React, { useState } from 'react';
import {
  Video,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,StatusBar,ScrollView, CameraRoll 
} from 'react-native';
import { Image as RNImage } from 'react-native';
import { Feather, FontAwesome, Ionicons,MaterialIcons,SimpleLineIcons,AntDesign } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-native';
import { useFirestoreDocument } from '../hooks';

import { TagFriendsModal } from '../Friends/TagFriendsModal';
import { TaggedFriend } from '../Friends/TaggedFriend';
import { UploadPostPicture } from '../AppComponents/UploadPostPicture';
import * as ImagePicker from "expo-image-picker";
import { Image } from 'react-native-expo-image-cache';
import Avatar from '../Images/avatar.png';
import BottomSheet from "react-native-easy-bottomsheet";
import { doc, updateDoc, deleteField } from "firebase/firestore";
const AddStories = (props) => {
  const [post, setPost] = useState('');
  const [feeling, setFeeling] = useState('');
  const [uploadPictureOpen, setUploadPictureOpen] = useState('');
  const [tagFriend, setTagFriend] = useState('');
  const [isstory, setisstory] = useState(false);
  const history = useHistory();

  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();

  const [isVisible, setVisible] = useState(true);
  const [image, setImage] = useState('');
  const [downloadd, setdownloadURL] = useState('');
  const openUploadPostPicture = () => {
    setUploadPictureOpen(!uploadPictureOpen);
  };


  const handleStory = (inputText) => {
    setisstory(true);
    setisstory(inputText);
  };
  const handleCamera = () => {
    setVisible(false);
    openCamera()
  };

  //camera open and gallery
  const openCamera = async () => {
     
    // const permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();
     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
     const permissionResult2 = await ImagePicker.getCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Bạn đã từ chối cho phép ứng dụng này truy cập vào máy ảnh của bạn1!");
      return;
    }
   
    if (permissionResult2.granted === false) {
      alert("Bạn đã từ chối cho phép ứng dụng ");
      return;
    }

    let result = await ImagePicker.launchCameraAsync();
    
    if (!result.cancelled) {
      setImage(result.uri);
      const URL = uploadImage(result.uri);
      setdownloadURL(URL);
      console.log(URL);
      setVisible(false);
    }
    console.log(result.uri);
  }
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
allowsEditing: true,
    aspect: [3, 4],
    quality: 1,
  

  });

  if (!result.cancelled) {
    setImage(result.uri);
    const URL = uploadImage(result.uri);
    setdownloadURL(URL);
    setVisible(false);
 
  }
  console.log(result.uri);
};

// upload ảnh
const uploadImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref().child(`storiesPictures/${userId}/${Math.random() * 100}`);
  await ref.put(blob);
  return ref.getDownloadURL();
};


const getCurrentLoggedUser = useFirestoreDocument(
  firebase.firestore().collection('accounts').doc(userId),
  [userId]
);

if (!getCurrentLoggedUser) {
  return null;
}

const addPostToWall = () => {
 
  db.collection('stories').add({

    story: post?post:'',
    userId: userId,
    created: firebase.firestore.Timestamp.fromDate(new Date()),
    isWith: tagFriend,
    postPicture: image? (downloadd._W._W) :(''),
  }); 

  history.push(`/dashboard`);
};

const backToWall = () => {
  
  history.push(`/dashboard`);
 
};


  return (
    <SafeAreaView style={styles.mainContainer}>
    <StatusBar  barStyle={'dark-content'} backgroundColor="white" />
    <BottomSheet
     bottomSheetTitle={""}
     bottomSheetIconColor="#0A2463"
     bottomSheetStyle={{
       backgroundColor: "white",
       maxHeight: "65%",
       minHeight: "30%",
     }}
     bottomSheetTitleStyle={{color: '#0A2463'}}
     setBottomSheetVisible={setVisible}
     bottomSheetVisible={isVisible}
   >
     <ScrollView>
       <TouchableOpacity onPress={openCamera}>
       <View style={{width:280,borderRadius:20,shadowRadius:10,justifyContent:'center',alignSelf:'center',backgroundColor:'#0176E4',marginTop:15,}}>
       <Text style={{margin:10,justifyContent:'center',alignSelf:'center',fontSize:20,color:'#ffffff'}}>Camera</Text>
       </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={pickImage}>
       <View style={{width:280,borderRadius:20,shadowRadius:10,justifyContent:'center',alignSelf:'center',backgroundColor:'#0176E4',marginTop:15,}}>
       <Text style={{margin:10,justifyContent:'center',alignSelf:'center',fontSize:20,color:'#ffffff'}}>Thư viện</Text>
       </View>
       </TouchableOpacity>
       <TouchableOpacity  onPress={() => {
       setVisible(false);
     }}>
<View style={{marginBottom:20,width:280,borderRadius:20,shadowRadius:10,justifyContent:'center',alignSelf:'center',backgroundColor:'#C5292A',marginTop:15,}}>
       <Text style={{margin:10,justifyContent:'center',alignSelf:'center',fontSize:20,color:'#ffffff'}}>Hủy</Text>
       </View>
       </TouchableOpacity>
     </ScrollView>
   </BottomSheet>
 <View style={styles.header}>
   <TouchableOpacity onPress={backToWall}>
     <Ionicons name='chevron-back' size={24} color='black' />
   </TouchableOpacity >
   <TouchableOpacity onPress={()=>setVisible(true)}>
   <Text style={styles.headerTitle}>Tạo khoảnh khắc</Text>
   </TouchableOpacity>
  
   <TouchableOpacity onPress={addPostToWall}>
     <Ionicons name='send' size={24} color='#0176E4' />
   </TouchableOpacity>
 </View >
 {/* <View style={styles.user}>
   {
     getCurrentLoggedUser.data.profilePicture ? (
       <Image
         uri={getCurrentLoggedUser.data.profilePicture}
         style={styles.profileImage}
       />
     )
       :
       (
         <RNImage source={Avatar} style={styles.profileImage} />
       )}
   <View style={styles.userNameContainer}>
     <Text style={styles.userName}>
       {getCurrentLoggedUser.data.userName} 
     </Text>
    

    
   </View>
 </View> */}
 <TextInput
   style={styles.textInput}
   name='post'
   placeholder='Bạn đang nghĩ gì?'
   placeholderTextColor='#7F7F7F'
   inputText={post}
   onChangeText={handleStory}></TextInput>
 

 {/* <View style={styles.toolsContainer}>
   <TouchableOpacity onPress={() => {
       setVisible(true);
     }} style={styles.toolsSection}>
     <Feather name='camera' size={24} color='#0176E4' />
     <Text style={styles.toolText}>Hình ảnh</Text>
   </TouchableOpacity>
   {uploadPictureOpen ? <UploadPostPicture /> : null}
  
 </View> */}
 <View style={{  width: '100%',borderTopLeftRadius:20,borderTopRightRadius:20,height:'100%',position:'absolute',backgroundColor:'black'}} >
   <ImageBackground
     source={image ? { uri: image } : ''}

     style={styles.postImg}
   />
   <View style={{ flexDirection: 'row',position:'absolute',
    justifyContent: 'space-between',
    height: 40,
    width: "100%",
    alignItems: 'center',
    paddingHorizontal: 20,}}>
   <TouchableOpacity onPress={backToWall}>
     <Ionicons name='chevron-back' size={28} color='#ffffff' />
   </TouchableOpacity >
   </View>
 <View style={{flexDirection: 'row',position:'absolute',
    height: 42,
    width: 150,
   alignSelf:'center',
    alignItems: 'center',marginTop:20,
    justifyContent:'center',bottom:30}}>
 <TouchableOpacity onPress={addPostToWall}>
     <Text style={{backgroundColor:'#0176E4',fontSize:18,color:'#ffffff',paddingHorizontal:40,borderRadius:10,paddingVertical:10,}}>
      Đăng
     </Text>
   </TouchableOpacity>
 </View>
 <View style={{ flexDirection: 'row',position:'absolute',
    justifyContent: 'space-between',
    height: 40,
    width: "100%",
    alignItems: 'center',marginTop:20,
    marginLeft: '70%',}}>
   <TouchableOpacity onPress={backToWall}>
     <Feather name='crop' size={28} color='#ffffff' />
     <Text style={{fontSize:16,color:'#ffffff',paddingHorizontal:30,top:-25}} >Cắt ảnh</Text>
   </TouchableOpacity >
   </View>
   <View style={{ flexDirection: 'row',position:'absolute',
    justifyContent: 'space-between',
    height: 40,
    width: "100%",
    alignItems: 'center',marginTop:70,
    marginLeft: '70%',}}>
   <TouchableOpacity onPress={handleStory}>
     <MaterialIcons name='text-fields' size={28} color='#ffffff' />
     <Text style={{fontSize:16,color:'#ffffff',paddingHorizontal:30,top:-25}} >Văn bản</Text>
   </TouchableOpacity >
   </View>
   <View style={{ flexDirection: 'row',position:'absolute',
    justifyContent: 'space-between',
    height: 40,
    width: "100%",
    alignItems: 'center',marginTop:120,
    marginLeft: '70%',}}>
   <TouchableOpacity onPress={backToWall}>
     <Ionicons name='ios-musical-notes-outline' size={24} color='#ffffff' />
     <Text style={{fontSize:16,color:'#ffffff',paddingHorizontal:30,top:-25}} >Âm thanh</Text>
   </TouchableOpacity >
   </View>
   <View style={{ flexDirection: 'row',position:'absolute',
    justifyContent: 'space-between',
    height: 40,
    width: "100%",
    alignItems: 'center',marginTop:170,
    marginLeft: '70%',}}>
   <TouchableOpacity onPress={backToWall}>
     <MaterialIcons name='auto-awesome' size={24} color='#ffffff' />
     <Text style={{fontSize:16,color:'#ffffff',paddingHorizontal:30,top:-25}} >Hiệu ứng</Text>
   </TouchableOpacity >
   </View>
   <View style={{ flexDirection: 'row',position:'absolute',
    justifyContent: 'space-between',
    height: 40,
    width: "100%",
    alignItems: 'center',marginTop:220,
    marginLeft: '70%',}}>
   <TouchableOpacity onPress={backToWall}>
     <SimpleLineIcons name='pencil' size={24} color='#ffffff' />
     <Text style={{fontSize:16,color:'#ffffff',paddingHorizontal:30,top:-25}} >Vẽ</Text>
   </TouchableOpacity >
   </View>
   <View style={{ flexDirection: 'row',position:'absolute',
    justifyContent: 'space-between',
    height: 40,
    width: "100%",
    alignItems: 'center',marginTop:270,
    marginLeft: '70%',}}>
   <TouchableOpacity onPress={backToWall}>
     <AntDesign name='tago' size={24} color='#ffffff' />
     <Text style={{fontSize:16,color:'#ffffff',paddingHorizontal:30,top:-25}} >Gắn thẻ</Text>
   </TouchableOpacity >
   </View>
 </View>
</SafeAreaView>
  )
}

export default AddStories

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: 'white', flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    width: "100%",
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  postImg: {
    width: '100%',
    maxHeight: '100%',
    height: '100%',
    resizeMode: 'center',
justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius:20,borderTopRightRadius:20,


  },
  headerTitle: { fontWeight: 'bold', fontSize: 20, color: '#0176E4' },
  postButton: { fontWeight: 'bold', fontSize: 18, color: '#A8A39F' },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%"
  },
  userName: { fontSize: 16, fontWeight: 'bold', marginStart: 10,marginRight:4, },
  profileImage: { width: 40, height: 40, borderRadius: 50 },
  user: {
    flexDirection: 'row',
    marginStart: 16,
    marginTop: 10,
    paddingEnd: 16,
  },
  textInput: {

    flexDirection: 'row',position:'absolute',
    justifyContent: 'space-between',
    backgroundColor:'#ffffff',
    height: 40,
    width: 200,
    alignItems: 'center',marginTop:170,
    marginLeft: '20%',
  },
  toolsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: "100%",
    justifyContent:'space-around',
    paddingHorizontal: 10,
  },
  toolsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    height: 30,
    width: 115,
    backgroundColor:'#E9E9E9',
    borderRadius: 40,
    justifyContent:'center',
  },
  toolText: {
    fontSize: 14,
    marginStart: 5,
  },
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  postText: { color: '#A8A39F', fontSize: 18 },
})