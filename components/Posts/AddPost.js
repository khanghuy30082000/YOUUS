import React, { useState } from 'react';
import {
  Video,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView, StatusBar, ScrollView, CameraRoll
} from 'react-native';
import { Image as RNImage } from 'react-native';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-native';
import { useFirestoreDocument } from '../hooks';
import { CustomModal } from '../Posts/CustomModal';
import { CustomModal2 } from '../Posts/CustomModal2';
import { Feelings } from '../Posts/Feelings';
import { TagFriendsModal } from '../Friends/TagFriendsModal';
import { TaggedFriend } from '../Friends/TaggedFriend';
import { UploadPostPicture } from '../AppComponents/UploadPostPicture';
import * as ImagePicker from "expo-image-picker";
import { Image } from 'react-native-expo-image-cache';
import Avatar from '../Images/avatar.png';
import BottomSheet from "react-native-easy-bottomsheet";
function AddPost(props) {
  const [post, setPost] = useState('');
  const [feeling, setFeeling] = useState('');
  const [uploadPictureOpen, setUploadPictureOpen] = useState('');
  const [tagFriend, setTagFriend] = useState('');

  const history = useHistory();

  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();

  const [isVisible, setVisible] = useState(false);
  const [image, setImage] = useState('');
  const [downloadd, setdownloadURL] = useState('');

  const openUploadPostPicture = () => {
    setUploadPictureOpen(!uploadPictureOpen);
  };


  const handlePost = (inputText) => {
    setPost(inputText);
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

    }
    console.log(result.uri);
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,


    });

    if (!result.cancelled) {
      setImage(result.uri);
      const URL = uploadImage(result.uri);
      setdownloadURL(URL);


    }
    console.log(result.uri);
  };

  // upload ảnh
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(`postPictures/${userId}/${Math.random() * 100}`);
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

    db.collection('posts').add({

      post: post ? post : '',
      userId: userId,
      created: firebase.firestore.Timestamp.fromDate(new Date()),
      feeling: feeling,
      isWith: tagFriend,
      usersWhoLiked: "",
      
      // postPicture: image ? (downloadd._W._W) : (''),
    });

    history.push(`/dashboard`);
  };

  const backToWall = () => {

    history.push(`/dashboard`);

  };

  const feelingplaceholder = (
    <View style={styles.toolsSection}>
      <Feather name='smile' size={25} color='#0176E4' />
      <Text style={styles.toolText}>Trạng thái</Text>
    </View>
  );

  const tagFriendsPlaceholder = (
    <View style={styles.toolsSection}>
      <Feather name='tag' size={25} color='#0176E4' />
      <Text style={styles.toolText}>Gắn thẻ</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <BottomSheet
        bottomSheetTitle={""}
        bottomSheetIconColor="#0A2463"
        bottomSheetStyle={{
          backgroundColor: "white",
          maxHeight: "65%",
          minHeight: "30%",
        }}
        bottomSheetTitleStyle={{color: '#0A2463',fontSize:20,}}
        setBottomSheetVisible={setVisible}
        bottomSheetVisible={isVisible}
      >
        <ScrollView>
          <TouchableOpacity onPress={openCamera}>
          <View style={{width:300,borderRadius:30,shadowRadius:10,justifyContent:'center',alignSelf:'center',backgroundColor:'#0176E4',marginTop:20,}}>
          <Text style={{margin:15,justifyContent:'center',alignSelf:'center',fontSize:20,color:'#ffffff'}}>Camera</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
          <View style={{width:300,borderRadius:30,shadowRadius:10,justifyContent:'center',alignSelf:'center',backgroundColor:'#0176E4',marginTop:20,}}>
          <Text style={{margin:15,justifyContent:'center',alignSelf:'center',fontSize:20,color:'#ffffff'}}>Thư viện</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {
          setVisible(false);
        }}>
<View style={{marginBottom:20,width:300,borderRadius:30,shadowRadius:10,justifyContent:'center',alignSelf:'center',backgroundColor:'#C5292A',marginTop:20,}}>
          <Text style={{margin:15,justifyContent:'center',alignSelf:'center',fontSize:20,color:'#ffffff'}}>Hủy</Text>
          </View>
          </TouchableOpacity>
        </ScrollView>
      </BottomSheet>
    <View style={styles.header}>
      <TouchableOpacity onPress={backToWall}>
        <Ionicons name='chevron-back' size={24} color='black' />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Tạo bài viết</Text>
      <TouchableOpacity onPress={addPostToWall}>
        <Ionicons name='send' size={24} color='#0176E4' />
      </TouchableOpacity>
    </View >
    <View style={styles.user}>
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
        <Feelings selectedFeeling={feeling} selectedFeeling1={feeling} />

        {tagFriend ? (
          <TaggedFriend friendId={tagFriend} userId={userId} />
        ) : null}
      </View>
      </View>

      <TextInput
        style={styles.textInput}
        name='post'
        placeholder='Bạn đang nghĩ gì?'
        placeholderTextColor='#7F7F7F'
        inputText={post}
        onChangeText={handlePost}
      />
      <View style={styles.toolsContainer}>
        <TouchableOpacity onPress={() => {
          setVisible(true);
        }} style={styles.toolsSection}>
        <Feather name='camera' size={24} color='#0176E4' />
        <Text style={styles.toolText}>Hình ảnh</Text>
      </TouchableOpacity>
      {uploadPictureOpen ? <UploadPostPicture /> : null}
      <TouchableOpacity style={styles.toolsSection}>
      <CustomModal
        placeholder={feelingplaceholder}
        addAFeeling={(emoji) => setFeeling(emoji)}
      />
      
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolsSection}>
        <TagFriendsModal
          placeholder={tagFriendsPlaceholder}
          userId={userId}
          handleTagFriend={(friend) => setTagFriend(friend)}
        />
      </TouchableOpacity>
    </View>
    <View style={{ height: 600, width: '100%' }} >
      <ImageBackground
        source={image ? { uri: image } : ''}

          style={styles.postImg}
        />

      </View>
    </SafeAreaView>
  );
}

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
    width: '96%',
    maxHeight: 480,
    height: 400,
    resizeMode: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 15,
    shadowRadius: 20,

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
    color: 'black',
    fontSize: 14,
    marginHorizontal: 16,
    marginTop: 10,
  },
  toolsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: "100%",
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  toolsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    height: 30,
    width: 115,
    backgroundColor: '#E9E9E9',
    borderRadius: 40,
    justifyContent: 'center',
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
});
export { AddPost };