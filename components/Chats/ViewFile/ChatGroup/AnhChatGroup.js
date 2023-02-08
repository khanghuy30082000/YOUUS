import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useHistory } from 'react-router-native';
import { StyleSheet } from 'react-native';
import { AntDesign, Feather, Ionicons, Entypo, FontAwesome, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons"
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'
import { useFirestoreCollection, useFirestoreDocument } from '../../../hooks';
import { TouchableOpacity } from 'react-native';
import { auth, db } from '../../../../App';

const trang = "white";
const Xanh = "#0176E4";
const Do = 'red';
const Vang = 'yellow';
const XanhLa = 'green';
const Xam = '#BFBFBF';

const AnhChatGroup = (props) => {

  const [img, setImg] = useState(null)
  const ChatID = props.location.state.idchat
  console.log('id Chat Image', ChatID)
  const history = useHistory();
  const gotoBack = () => {
    history.goBack();
  };

  const getUsers = async () => {
    const querySanp = await firebase.firestore().collection("chatgroup").doc(ChatID).collection("messages")
    .orderBy("downloadURL", "desc").get()
    const allFr = querySanp.docs.map(docSnap => docSnap.data())
    setImg(allFr)
    console.log('img', allFr)
  }
  useEffect(() => {
    getUsers()
  }, [])

  const link = () => {
    history.push('/LinkChatGruop', {ChatID : ChatID})
}

  const RenderCard = ({ item }) => {

    return (
      item.downloadURL ? (
        <TouchableOpacity style={{
          flex: 1/3
        }}>
          <Image style={{ flex: 1, aspectRatio: 1/1, }} source={{ uri: item.downloadURL }} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: trang, flex: 1 }}>
      {/* <StatusBar style='dark' /> */}
      <View style={styles.viewHeader}>
        <Feather
          onPress={gotoBack}
          name='chevron-left'
          size={25}
          color='black'
          style={{ marginStart: 5, flex: 0.5 }}
        />
        <Text style={styles.textHeader}>Ảnh, file & link</Text>
      </View>
      <View style={styles.viewTab}>
        <TouchableOpacity style={{ height: "100%", width: 130, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: Xanh }}>
          <Text style={styles.txtTab}>Ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: "100%", width: 130, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.tab}>File</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: "100%", width: 130, justifyContent: 'center', alignItems: 'center' }} onPress={link}>
          <Text style={styles.tab}>Link</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={img}
        numColumns={3}
        // horizontal={false}
        renderItem={({ item }) => { return <RenderCard item={item} /> }}
        keyExtractor={(item) => item.email}
        style={{ flex: 0.8 }} />
    </SafeAreaView>
  )
}

export default AnhChatGroup

const styles = StyleSheet.create({
  viewHeader: {
    backgroundColor: trang,
    height: 44,
    width: "100%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textHeader: {
    color: '#0176E4',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  txtTab: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Xanh
  },
  tab: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Xam
  },
  viewTab: {
    height: 50,
    width: "100%",
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  }
})


