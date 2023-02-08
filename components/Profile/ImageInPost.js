import {StyleSheet, View, Text, SafeAreaView, FlatList, Image,TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useHistory } from 'react-router-native';
import { AntDesign, Feather, Ionicons, Entypo, FontAwesome, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons"
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'
import { useFirestoreCollection, useFirestoreDocument } from '../hooks';
import { PageHeader2 } from '../AppComponents/PageHeader2'

const ImageInPost = (props) => {
  const [img, setImg] = useState(null)
 
    const history = useHistory();
    const goBack = () => {
        history.goBack()
      };
     
    
     
      const user = firebase.auth().currentUser;
      const userId = user.uid;
      const profileId= props.location.state.Id;
      const querySanp =  firebase.firestore().collection("posts").where("userId", "==", profileId)
      console.log(querySanp);
      const goToProfile = (profileId) => {
        history.push(`/profile/${profileId}`);
      };
    
      const getUsers = async () => {
        const querySanp = await firebase.firestore().collection("posts").where("userId", "==", profileId).get('postPicture');
        const allFr = querySanp.docs.map(docSnap => docSnap.data())
        setImg(allFr)
        console.log('img', allFr)
      }
      useEffect(() => {
        getUsers()
      }, [])
    
      const RenderCard = ({ item }) => {
    
        return (
          item.postPicture ? (
            <TouchableOpacity onPress={()=>goToProfile(profileId)}  style={{
              flex: 1/3
            }}>
              <Image style={{ flex: 1, aspectRatio: 1/1, }} source={{ uri: item.postPicture }} />
            </TouchableOpacity>
          ) : (
            <View></View>
          )
        )}
  return (
    <SafeAreaView style={{backgroundColor:'#ffffff',height:'100%'}}>
      <PageHeader2
      placeholder='Hình ảnh đã đăng tải'
      onPressNavigation={goBack}
    />
  <View style={{ justifyContent: 'center', alignSelf: 'center',width:'100%',height:'100%' }}>
  {/* <RNImage source={Avatar} style={styles.requestHeaderText} /> */}
    {/* <Text style={{justifyContent: 'center', alignSelf: 'center',fontWeight:'bold',fontSize:15}}>Danh sách hình ảnh trống</Text>
    <Text style={{justifyContent: 'center', alignSelf: 'center',fontWeight:'bold',fontSize:15}}>{profileId}</Text>
    <Text style={{justifyContent: 'center', alignSelf: 'center',fontWeight:'bold',fontSize:15}}>{userId}</Text> */}
    <FlatList
        data={img}
        numColumns={3}
        // horizontal={false}
        renderItem={({ item }) => { return <RenderCard item={item} /> }}
        keyExtractor={(item) => item.email}
        style={{ flex: 0.8 }} />
  </View>

    </SafeAreaView>
  )
}

export default ImageInPost

const styles = StyleSheet.create({})