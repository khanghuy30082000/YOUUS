import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { AntDesign, Feather, Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import { useHistory } from 'react-router-native';

const CallChatOne = (props) => {
  const yasuo = props.location.state.avatar || linkImage
  const history = useHistory();
  const gotoBack = () => {
    history.goBack();
  };
  const done = () => {
    history.goBack();
  };
  const callVideo = () => {
    history.push('/CallVideoOne', { userName: props.location.state.userName, uid: props.location.state.uid, avatar: yasuo });
};
  
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#00B44C', '#0176E4']} style={{
        flex: 1
      }}>
        <StatusBar style='light' />
        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name='chevron-down' size={32} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.viewImage}>
          <Image
            style={styles.image}
            source={{ uri: props.location.state.avatar }} />

          <Text style={styles.textYouCall}>Bạn đang gọi</Text>
          <Text style={styles.textName}> {props.location.state.userName} </Text>
        </View>

        <View style={{
          flex: 0.2,
        }}>
          <View style={styles.viewBottom}>
            <TouchableOpacity style={{
              height: 48,
              width: 48,
              backgroundColor: 'red',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={done}
            >
              <MaterialCommunityIcons name='phone-remove' size={28} color='white' />
            </TouchableOpacity>
            <TouchableOpacity style={{
              height: 48,
              width: 48,
              backgroundColor: '#0176E4',
              borderRadius: 30,
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }} onPress={callVideo}>
              <Feather name='video-off' size={28} color='white' />

            </TouchableOpacity>
            <TouchableOpacity style={{
              height: 48,
              width: 48,
              backgroundColor: '#0176E4',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MaterialIcons name='volume-up' size={28} color='white' />
            </TouchableOpacity>

          </View>

        </View>
      </LinearGradient>
    </View>
  )
}

export default CallChatOne

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'white'
  },
  header: {
    height: 30, width: "100%", marginStart: 16, marginTop: 30, flex: 0.1
  },
  viewImage: {
    flex: 0.7,
    height: 201,
    width: "70%",
    alignSelf: 'center',
    alignItems: 'center'
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: '#0176E4'
  },
  textYouCall: { color: 'white', fontSize: 14, marginTop: 16 },
  textName: { color: 'white', fontSize: 18, marginTop: 8, fontWeight: 'bold' },
  viewBottom: {
    height: 80,
    width: "50%",
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 90,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }

})