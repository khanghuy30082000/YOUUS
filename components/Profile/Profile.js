import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView, StatusBar, Dimensions
} from 'react-native';
import { Image as RNImage } from 'react-native';
import firebase from 'firebase/compat/app';
import { useFirestoreCollection, useFirestoreDocument } from '../hooks';
import Wave from '../Images/wave.jpg';
import { useHistory } from 'react-router-native';
import { Feather, Ionicons, Octicons, AntDesign } from '@expo/vector-icons';
import { Wall2 } from '../Wall/Wall2';
import { UploadImageModal } from '../AppComponents/UploadImageModal';
import { Footer } from '../Wall/Footer';
import { ProfileButtons } from './ProfileButtons';
import { ProfileInfo } from './ProfileInfo';
import Avatar from '../Images/avatar.png';
import { auth } from '../../App';
import { UploadCoverPicture } from '../AppComponents/UploadCoverPicture';
import { Image } from 'react-native-expo-image-cache';
import * as ImagePicker from 'expo-image-picker';

function Profile(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [coverIsOpen, setCoverisOpen] = useState(false);
  const history = useHistory();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  console.log("yasuo", profileId)
  const profileId = props.match.params.id;
  const db = firebase.firestore();
  

  const openUpload = () => {
    setIsOpen(!isOpen);
  };

  const getUser = useFirestoreDocument(
    firebase.firestore().collection('accounts').doc(userId),
    [userId]
);

  const openCoverPictureUpload = () => {
    setCoverisOpen(!coverIsOpen);
  };

  const getUserProfileInfo = useFirestoreDocument(
    db.collection('accounts').doc(profileId),
    [profileId]
    
  );
  console.log('alo', getUserProfileInfo)
  // fetch friends of the logged in user
  const fetchFriends = useFirestoreCollection(
    db.collection('accounts').doc(userId).collection('friends'),
    []
  );
  const fetchFriends2 = useFirestoreCollection(
    db.collection('accounts').doc(profileId).collection('friends'),
    []
  );
  const fetchPosts = useFirestoreCollection(
    db.collection('posts').where("userId", "==",profileId),
    []
  );
  const getFriendIds = fetchFriends.map((friend) => {
    if (friend.data.isFriend === true || friend.data.requestAccepted === true) {
      return friend.id;
    }
  });
  const getFriendIds2 = fetchFriends2.map((friend) => {
    if (friend.data.isFriend === true || friend.data.requestAccepted === true) {
      return friend.id;
    }
  });
  // const getPost = fetchPosts.map((posts) => {
  //   if (friend.data.isFriend === true || friend.data.requestAccepted === true) {
  //     return friend.id;
  //   }
  // });
  const getPendingFriendIds = fetchFriends.map((friend) => {
    if (
      friend.data.isFriend === false ||
      friend.data.requestAccepted === false
    ) {
      return friend.id;
    }
  });

  const checkIfFriends = getFriendIds.includes(profileId);

  const checkIfRequestPending = getPendingFriendIds.includes(profileId);

  if (!getUserProfileInfo) {
    return null;
  }

  const backToDashboard = () => {
    history.push(`/dashboard`);
  };

  const goBack = () => {
    history.goBack();
  };

  const gotoaddPost = () => {
    history.push('/addPost')
  }
  const gotoopenImage = () => {
    history.push('/OpenImage',{avatar:getUserProfileInfo.data.profilePicture})
  }
  const gotoopenImageCover = () => {
    history.push('/OpenImageCover',{cover:getUserProfileInfo.data.coverPicture})
  }
  const gotomess = () => {
    history.push("/chatone", { userName: getUserProfileInfo.data.userName, uid: getUserProfileInfo.data.uid, avatar: getUserProfileInfo.data.profilePicture })
  }
  const gotodeleteFriendRequest = () => {
    history.push('/deleteFriendRequest')
  }

  const goToShowInfoProfile = () => {
    history.push(`/showinfoprofile`);
  };
  const goToEditProfile = () => {
    history.push(`/editProfile/${userId}`);
  };
  const goToVideoInPost = () => {
    history.push(`/VideoInPost`);
  };
  const goToImageInPost = () => {
    history.push(`/ImageInPost`,{Id:getUserProfileInfo.data.uid});
  };

  const goToFriends = () => {
    history.push(`/friends/${userId}`);
  };

  const handleFriendRequest = () => {
    db.collection('accounts')
      .doc(userId)
      .collection('friends')
      .doc(profileId)
      .set({
        isFriend: false,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        userName: getUserProfileInfo.data.userName,
        email: getUserProfileInfo.data.email,
        uid: getUserProfileInfo.data.uid,
        profilePicture: getUserProfileInfo.data.profilePicture
      });
    db.collection('accounts')
      .doc(profileId)
      .collection('friends')
      .doc(userId)
      .set({
        requestAccepted: false,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        userName: getUserProfileInfo.data.userName,
        email: getUserProfileInfo.data.email,
        uid: getUserProfileInfo.data.uid,
        profilePicture: getUserProfileInfo.data.profilePicture
      });
    db.collection('accounts')
      .doc(profileId)
      .collection('friendsNotifications')
      .doc(userId)
      .set({
        friends: userId,
        isFriend: false,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        markedAsRead: false,
        userName: getUserProfileInfo.data.userName,
        email: getUserProfileInfo.data.email,
        uid: getUserProfileInfo.data.uid
      });
  };

  if (!fetchFriends) {
    return null;
  }

  const pendingIcon = <Feather name='clock' size={24} color='black' />;
  const aboutIcon = <Feather name='user' size={24} color='black' />;
  const editProfileIcon = <Feather name='edit' size={24} color='black' />;
  const myFriendsIcon = <Feather name='users' size={24} color='black' />;
  const friendsIcon = <Feather name='check' size={24} color='black' />;
  const addFriendIcon = <Feather name='user-plus' size={24} color='black' />;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const downloadURL = await uploadImage(result.uri);
      db.collection('accounts').doc(profileId).update({
        profilePicture: downloadURL,
      });
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(`profilePictures/${profileId}`);
    var ref2 = firebase.storage().ref().child(`profilePictures/${profileId}/${Math.random() * 100}`);
    await ref.put(blob);
    await ref2.put(blob);
    return ref.getDownloadURL();
  };

  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      const downloadURL = await uploadImage1(result.uri);
      db.collection('accounts').doc(profileId).update({
        coverPicture: downloadURL,
      });
    }
  };

  const uploadImage1 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(`coverPictures/${profileId}`);
    var ref2 = firebase.storage().ref().child(`coverPictures/${profileId}/${Math.random() * 100}`);
    await ref.put(blob);
    await ref2.put(blob);
    return ref.getDownloadURL();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      {/* <StatusBar style='dark' /> */}
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <View style={{
        height: 40,
        width: "100%",
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: '#ffffff'
      }}>

        <TouchableOpacity onPress={goBack}>
          <Ionicons name='chevron-back' size={24} color='black' />
        </TouchableOpacity>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#0176E4'
        }}>{getUserProfileInfo.data.userName}</Text>
        {
          profileId !== userId ? (<TouchableOpacity onPress={goToShowInfoProfile}>
            <Octicons name='kebab-horizontal' size={18} color='black' />
          </TouchableOpacity>) : (<TouchableOpacity onPress={goToEditProfile}>
            <Octicons name='pencil' size={24} color='#0176E4' />
          </TouchableOpacity>)
        }


      </View>
      <ScrollView>
        <View style={{
        }}>
          <TouchableOpacity onPress={gotoopenImageCover}>
            {getUserProfileInfo.data.coverPicture ? (
              <Image
                uri={getUserProfileInfo.data.coverPicture}
                style={styles.coverImage}
              />
            ) : (
              <RNImage source={Wave} style={styles.coverImage} />
            )}
            {profileId !== userId ? null : (
              <View style={styles.cameraIconCover}>
                <TouchableOpacity onPress={pickImage1}>
                  <Feather name='camera' size={18} color='#0176E4' />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          <View style={{
            backgroundColor: 'white',
            height: 110,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 20,
            top: -95,

            flexDirection: 'row',
            shadowOpacity: 0.3
          }}>


            <TouchableOpacity onPress={gotoopenImage} style={styles.profileImageSection}>
              {getUserProfileInfo.data.profilePicture ? (
                <Image
                  uri={getUserProfileInfo.data.profilePicture}
                  style={styles.profileImage}
                />
              ) : (
                <RNImage source={Avatar} style={styles.profileImage} />
              )}

              {profileId !== userId ? null : (
                <View style={styles.camAVT}>
                  {/* <TouchableOpacity onPress={pickImage}> */}
                  <TouchableOpacity onPress={pickImage}>
                    {/* {isOpen ? <UploadImageModal profileId={profileId} /> : null} */}
                    <Feather name='camera' size={18} color='#0176E4' />
                  </TouchableOpacity>
                </View>
              )}

            </TouchableOpacity>
            <View style={{
              alignSelf: 'center', marginStart: 26,
            }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#0176E4' }}>{getUserProfileInfo.data.userName}</Text>
              <View style={{ height: 20, width: 250, marginVertical: 2, }}>
                <Text style={{ fontSize: 15, color: 'black', width: '100%' }}>
                 {getUserProfileInfo.data.bio}
                </Text>
              </View>
              <View style={styles.viewFriend}>
                <TouchableOpacity style={styles.viewItemFr} onPress={goToFriends}>
                  <Text style={styles.txtNumber}>
                    {getFriendIds2.length}
                  </Text>
                  <Text style={styles.text}>
                    Bạn bè
                  </Text>
                </TouchableOpacity>
                <View style={styles.viewItemFr}>
                  <Text style={styles.txtNumber}>
                    {fetchPosts.length}
                  </Text>
                  <Text style={styles.text}>
                    Bài viết
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{
          height: 40,
          width: "85%",
          justifyContent: 'space-between',
          alignSelf: 'center',
          top: -80,
          flexDirection: 'row'
        }}>
          {checkIfFriends ? (
             <TouchableOpacity style={styles.viewItemTao} onPress={gotomess}>
             <Feather name='message-circle' size={28} color='#0176E4' />
             <Text style={styles.txtTao}>
               Nhắn tin
             </Text>
           </TouchableOpacity>):checkIfRequestPending ? ( <TouchableOpacity style={styles.viewItemTao} onPress={gotodeleteFriendRequest}>
             <AntDesign name='deleteuser' size={34} color='#0176E4' />
             <Text style={styles.txtTao}>
               Hủy 
             </Text>
           </TouchableOpacity>):
          profileId === userId ?( <TouchableOpacity style={styles.viewItemTao} onPress={gotoaddPost}>
          <Ionicons name='md-add-circle-outline' size={34} color='#0176E4' />
          <Text style={styles.txtTao}>
            Bài viết
          </Text>
        </TouchableOpacity>):(<TouchableOpacity style={styles.viewItemTao} onPress={handleFriendRequest}>
          <Ionicons name='person-add-outline' size={34} color='#0176E4' />
          <Text style={styles.txtTao}>
            Kết bạn
          </Text>
        </TouchableOpacity>)}
         
          <TouchableOpacity onPress={goToImageInPost} style={styles.viewItemTao}>
            <Feather name='image' size={24} color='#0176E4' />
            <Text style={styles.txtTao}>
              Ảnh
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToVideoInPost} style={styles.viewItemTao}>
            <Ionicons name='film-outline' size={24} color='#0176E4' />
            <Text style={styles.txtTao}>
              Video
            </Text>
          </TouchableOpacity>
        </View>




        

        {/* <ProfileInfo
          location={getUserProfileInfo.data.location}
          birthday={getUserProfileInfo.data.birthday}
        /> */}
        <View style={{
          top: -70,
        }}>
          <Wall2 profileId={profileId} />
        </View>
      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 223
  },
  profileImageSection: {
    marginStart: 16,
  },

  profileImage: {
    borderRadius: 36,
    width: 72,
    height: 72,
    borderWidth: 2,
    borderColor: 'blue',
    marginTop: 20
  },
  cameraIconCover: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    width: 40,
    height: 40,
    top: -210,
    right: '-88%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  camAVT: {
    backgroundColor: '#E2E2E2',
    borderRadius: 15,
    width: 30,
    height: 30,
    right: -50,
    top: -29,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraIconContainer: {
    bottom: 60,
    left: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 50,
    width: 55,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 50,
  },
  profileOptions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editProfileButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    padding: 10,
    borderRadius: 10,
    width: 150,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  addFriendButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6CA9D6',
    padding: 10,
    borderRadius: 10,
    width: 150,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  editProfilePlaceholder: { marginLeft: 10, fontSize: 18 },
  viewFriend: {
    flexDirection: 'row'
  },
  viewItemFr: {
    flexDirection: 'row',
    marginEnd: 20,
    alignItems: 'center'
  },
  txtNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0176E4',
    marginEnd: 5
  },
  text: {
    fontSize: 16,
  },
  viewItemTao: {
    backgroundColor: 'white',
    height: 40,
    width: 110,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowOpacity: 0.1,
    justifyContent: 'center',
    marginStart: 1,
    marginEnd: 1,
  },
  txtTao: {
    marginStart: 5,
    fontSize: 16,
    fontWeight: '500'
  }
});
export { Profile };