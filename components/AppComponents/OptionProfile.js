import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useFirestoreDocument } from '../hooks';
import { useHistory } from 'react-router-native';
import firebase from 'firebase/compat/app';
import { Image as RNImage } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import Avatar from '../Images/avatar.png';
import { Feather, Ionicons, Octicons,AntDesign } from '@expo/vector-icons';
const OptionProfile = () => {
    const history = useHistory();
    const user = firebase.auth().currentUser;
   
    const profileUid = user.uid;
  
    console.log(profileUid);
    const db = firebase.firestore();

    const getUserProfileInfo = useFirestoreDocument(
        db.collection('accounts').doc(profileUid),
        [profileUid]
      );
      const goToProfile = () => {
        history.push(`/profile/${profileUid}`);
      };
      const goToWall = () => {
        history.push(`/dashboard`);
        
      };
      if (!getUserProfileInfo) {
          return null;
        }
  return (
    <View style={{backgroundColor:'#ffffff',flexDirection:'row',borderRadius:12,width:'100%',marginVertical:10,justifyContent:'center',}}>

    {getUserProfileInfo.data.profilePicture ? (
        <TouchableOpacity  >
          <Image
            uri={getUserProfileInfo.data.profilePicture}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity  >
          <RNImage source={Avatar} style={styles.avatarImage} /></TouchableOpacity>
      )}
       <View style={{backgroundColor:'#ffffff',flexDirection:'column',width:'80%',marginLeft:8,marginVertical:17}}>
        <View style={{width:'70%'}}>
        <Text style={styles.userName}>{getUserProfileInfo.data.userName}</Text>
        <TouchableOpacity onPress={goToProfile}>
      <Text style={{marginRight: 5,marginLeft:5,fontSize:14,color:'#7F7F7F' }}>Xem trang cá nhân</Text></TouchableOpacity>
        </View>
      
  </View>
      </View>
  )
}

export default OptionProfile

const styles = StyleSheet.create({  userName: { fontWeight: '700', marginRight: 5,marginLeft:5,fontSize:17 },
avatarImage: { width: 48, height: 48, borderRadius: 50,marginLeft:16 ,justifyContent:'center',alignSelf:'center',marginTop:15},
clickoption:{flexDirection:'row',marginTop:20,marginLeft:20,marginBottom:10,}})