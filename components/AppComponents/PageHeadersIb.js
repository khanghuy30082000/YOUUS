import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useHistory } from 'react-router-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

function PageHeadersIb({ placeholder, navigation }) {
  const history = useHistory();

  const gotoAddChat = () => {
    history.push("/addChat");
  };
  const gotoChats = () => {
    history.push("/chats");
  };

  return (

    <SafeAreaView>
      <View style={styles.viewHeader}>
        <TouchableOpacity onPress={gotoChats} style={styles.postHeader}>
          <Feather name='chevron-left' size={24} color='black' />
          {/* <Text style={{fontSize:16}}>Quay lại</Text> */}
        </TouchableOpacity>
        <View style={{
          width:"80%",
          alignItems:'centers',
        }}>
          <Text style={{
            alignSelf:'center',
            color:"#0176E4",
            fontSize: 18,
            fontWeight:'bold',
          }}>
          Tin nhắn
        </Text>
        </View>
        
      </View>
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  viewHeader:{
    flexDirection:'row',
    alignItems:'center',
    height:40
  },
  postHeader:{
    flexDirection:'row',
    alignSelf:'center',
    paddingStart: 20,
  },
  textInput:{
    height:"80%",
    width: "85%",
    paddingStart: 10,
    borderRadius: 20,
    paddingHorizontal:10,
    backgroundColor:'gray'
  }
});

export { PageHeadersIb };
