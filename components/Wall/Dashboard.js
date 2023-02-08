import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { DashboardHeader } from './DashboardHeader';
import { Image as RNImage } from 'react-native';
import { useFirestoreDocument } from '../hooks';
import { Wall } from './Wall';
import firebase from 'firebase/compat/app';
import { Footer } from './Footer';
import Avatar from '../Images/avatar.png';
import { useHistory } from 'react-router-native';
import { Image } from 'react-native-expo-image-cache';
import { Feather, AntDesign, EvilIcons, Entypo } from '@expo/vector-icons';
import ListStory from '../Story/ListStory';
import Svg, { Path } from "react-native-svg"
const bgColor = "#E9E9E9";
const blueColor = "#0176E4"
function Dashboard(props) {
  const user = firebase.auth().currentUser;
  const profileId = user.uid;
  const profileUid = user.uid;
  const db = firebase.firestore();
  const history = useHistory();

  const fetchAccounts = useFirestoreDocument(
    db.collection('accounts').doc(profileId),
    [profileId]
  );

  if (!fetchAccounts) {
    return null;
  }

  const goToAddPost = () => {
    history.push(`/addPost`);
  };
  const goToAddStories = () => {
    history.push(`/AddStories`);
  };
  const goToStories = () => {
    history.push(`/stories`);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#E2E2E2',height:'100%',width:'100%' }}>
    <StatusBar  barStyle={'dark-content'} backgroundColor="#E2E2E2" />
    <ScrollView >
      <DashboardHeader />
      <View style={styles.mainSection}>
        <TouchableOpacity onPress={goToAddPost}
          style={{
            height: 48,
            width: "100%",
            marginTop: 8,
            flexDirection: "row"
          }}>
          {
            fetchAccounts.data.profilePicture ? (
              <Image
                uri={fetchAccounts.data.profilePicture || "https://gamek.mediacdn.vn/133514250583805952/2021/9/26/photo-1-1632639337166965564522.jpg"} 
                style={styles.avatarImage}
              />
            ) : (
              <RNImage source={Avatar} style={styles.avatarImage} />
            )}
          <Text style={styles.postText}>Hôm nay của bạn như thế nào?</Text>
        </TouchableOpacity>
        <View style={styles.bgStatus}>
          <TouchableOpacity onPress={goToAddPost} style={styles.bgItem}>
            <Feather
              name='smile'
              size={22}
              color={blueColor}
              style={styles.icon}
            />
            <Text style={styles.txtPost}>
              Trạng thái
            </Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={goToAddPost} style={styles.bgItem}>
            <Feather
              name='image'
              size={22}
              color={blueColor}
              style={styles.icon}
            />
            <Text style={styles.txtPost}>
              Hình ảnh
            </Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={goToAddPost}style={styles.bgItem}>
            <Feather
              name='tag'
              size={22}
              color={blueColor}
              style={styles.icon}
            />
            <Text style={styles.txtPost}>
              Gắn thẻ
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        height: 178,
        width: "100%",
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 20,
        paddingStart: 18,
      }}>
        <Text style={{
          marginTop: 8,
          fontWeight: 'bold',
          fontSize: 16,
        }}>
          Khoảnh khắc
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={goToStories}>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 140, width: 88, marginTop: 25 }}>
              {
                fetchAccounts.data.profilePicture ? (
                  <Image
                    uri={fetchAccounts.data.profilePicture || "https://gamek.mediacdn.vn/133514250583805952/2021/9/26/photo-1-1632639337166965564522.jpg"}
                    style={{
                      borderWidth: 2,
                      borderColor: '#6CA9D6',
                      borderRadius: 12,
                      height: "100%",
                      width: "100%"
                    }}
                  />
                )
                  :
                  (
                    <RNImage source={Avatar} style={{
                      borderWidth: 2,
                      borderColor: '#6CA9D6',
                      borderRadius: 12,
                      height: "100%",
                      width: "100%"
                    }} />

                  )}
              <TouchableOpacity onPress={goToAddStories} style={{
                top: -50,
                alignItems: "center"
              }}>
                <View style={{
                  height: 28,
                  width: 28,
                  borderRadius: 14,
                  backgroundColor: blueColor,
                  justifyContent: 'center',
                  alignSelf: 'center'
                }}>
                  <Entypo
                    name='camera'
                    size={18}
                    color="white"
                    style={{
                      alignSelf: 'center'
                    }}
                  />

                </View>
                <Text style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 12,
                }}>
                  Tạo mới
                </Text>
              </TouchableOpacity>
            </View>

          </TouchableOpacity>
          <View style={{flexDirection:"row"}}> 
             
              <ListStory profileId={profileId}/>
            
            </View>
        </ScrollView>

      </View>
      <Wall profileId={profileId} />
    </ScrollView>
    
    <View style={{ bottom: 0, position: 'absolute', flex: 1, alignSelf: 'center', width: '100%', justifyContent: 'center', }} ><Footer /></View>
    
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
foter: {

  flex: 1,
  position: 'absolute',
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',


}, carduser: {
  borderWidth: 1,
  borderColor: '#f8ffff',
  left: 22,
  marginStart: 15,
  bottom: 10,
  backgroundColor: '#6CA9D6',
  width: 35,
  height: 35,
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 18,

},
iconText: { color: 'black', alignItems: 'center', fontWeight: 'bold' },
mainSection: {
  display:'flex',
  position:'relative',
  height: 108,
  borderRadius: 20,
  backgroundColor: '#FFFFFF',marginBottom:3
},
postText: {
  color: '#A8A39F',
  fontSize: 14,
  borderRadius: 20,
  borderColor: 'black',
  alignSelf: 'center'
},
avatarImage: {
  width: 48,
  height: 48,
  borderRadius: 50,
  marginRight: 10,
  marginStart: 16,
},
icon: {
  marginStart: 0,
  marginEnd: 4,
  alignSelf: 'center'
},
bgItem: {
  height: "100%",
  width: 107,
  backgroundColor: '#E9E9E9',
  flexDirection: 'row',
  borderRadius: 20,
  alignSelf:'center',
  alignItems: 'center',
  marginLeft:4,
  justifyContent: 'center'
},
bgStatus: {

  height: 32,
  marginTop: 8,
  flexDirection: 'row',
  marginHorizontal: 20,marginLeft:12,
  justifyContent: 'flex-start'
},
txtPost: {
  fontSize: 14,
  fontWeight: "500"

}
});

export { Dashboard };
