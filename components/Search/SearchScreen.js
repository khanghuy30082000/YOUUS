import React, { useState } from 'react';
import {
  Video,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  FlatList, StatusBar
} from 'react-native';
import { PageHeaders } from '../AppComponents/PageHeaders';
import { useFirestoreCollection } from '../hooks';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/auth';
import { useHistory } from 'react-router-native';
import { query, QuerySnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { FAB } from 'react-native-paper'
import { Avatar, ListItem } from 'react-native-elements'
import SearchChatItemCaNhan from '../AppComponents/SearchChatItemCaNhan';
function SearchScreen(props, { route }) {
  const history = useHistory();
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  //    const yid = props.localtion.state.id;
  // console.log(user.uid);
  const [searchResults, setSearchResults] = useState([]);
  const [Item, setItem] = useState([]);
  // const addFriends = useFirestoreCollection(
  //   db.collection('accounts').get(),
  //   []
  // );
  const backToDashboard = () => {
    history.push(`/dashboard`);
  };
  const [users, setUsers] = useState(null)
  const getUsers = async () => {
    const querySanp = await firebase.firestore().collection('accounts').where('uid', '!=', user.uid).get()
    const allusers = querySanp.docs.map(docSnap => docSnap.data())
    setUsers(allusers)

  }

  useEffect(() => {
    getUsers()
  }, [])


  const getUserIdOfSearch = searchResults.map((data) => {
    return data.objectID;

  });




  const RenderCard = ({ item }) => {
    const openProfile = (getUserIdOfSearch) => {
      history.push(`/profile/${item.uid}`);
      // {profilePicture:item.profilePicture, userName:item.userName, uid: item.uid}
      //history.push(`/profile/0aJQOif45yQirpbWxQi8Mctc3sG3`);
      // history.push(`/profile/${item.uid}`);
      console.log(item.uid);
    };
    return (
      <TouchableOpacity onPress={() => openProfile(getUserIdOfSearch)}>

        <ListItem >

          <Avatar
            rounded
            source={{
              uri: item.profilePicture || "https://gamek.mediacdn.vn/133514250583805952/2021/9/26/photo-1-1632639337166965564522.jpg"
            }}

          />
          <ListItem.Content>
            <ListItem.Title
              style={{ fontWeight: "800" }}>{item.userName}
            </ListItem.Title>
            <ListItem.Subtitle>
              {item.email}
            </ListItem.Subtitle>
          </ListItem.Content>
          <View style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: '#0176E4', width: 88, height: 27, borderRadius: 10, paddingVertical: 4 }}>
            <Text style={{ color: '#ffffff', alignSelf: 'center' }}>Kết bạn</Text>
          </View>

        </ListItem>

      </TouchableOpacity>
    )


  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <PageHeaders
        placeholder='Tìm kiếm'
        onPressNavigation={backToDashboard}
      />
      <View style={{backgroundColor:'#ffffff',marginTop:4,borderTopLeftRadius:15,borderTopRightRadius:15,shadowRadius:20,}}>
      <SearchChatItemCaNhan />
      <Text style={{marginLeft:10,marginTop:10,color:'#0176E4',fontSize:17}}>
        Gợi ý kết bạn
      </Text>
      </View>
      
 
      <View style={{flex:1,width:'100%',backgroundColor:'#ffffff'}} >
      <FlatList 
        data={users}
        renderItem={({item}) => {return <RenderCard item={item}/> }}
        keyExtractor={(item)=>item.uid} 
      style={{ flex: 0.8 }}/>
      
            
        </View>
        
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  img: { width: 60, height: 60, borderRadius: 30, backgroundColor: "green" },
  text: {
    fontSize: 18,
    marginLeft: 15,
  },
  mycard: {
    flexDirection: "row",
    margin: 3,
    padding: 4,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "white"
  },
});
export default SearchScreen