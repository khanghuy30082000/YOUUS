import { StyleSheet, Text, View ,Image as RNImage,SafeAreaView} from 'react-native'
import React from 'react'
import { Image } from 'react-native-expo-image-cache';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import { PageheaderBlack } from './PageheaderBlack';
import Avatar from '../Images/avatar.png';
const OpenImage = (props,avatar) => {
  const history = useHistory();
  const backToDashboard = () => {
    history.goBack();
  };
    const placeholder2 = props.location.state.avatar|| "https://firebasestorage.googleapis.com/v0/b/fbilogisticggm.appspot.com/o/avatar.png?alt=media&token=5778fd9d-686e-4d9c-8de2-8c0aaa38f3a7";
   console.log(props);
  return (
    <SafeAreaView style={styles.postHeader}>
      <PageheaderBlack
      
        placeholder=''
        onPressNavigation={backToDashboard}
      />
    <View style={{ justifyContent: 'center', alignSelf: 'center',width:'100%',height:'90%' }}>
    {/* <RNImage source={Avatar} style={styles.requestHeaderText} /> */}
    <Image style={styles.requestHeaderText}uri={placeholder2}></Image>
    </View>
  </SafeAreaView>
  )
}

export default OpenImage

const styles = StyleSheet.create({
    postHeader:{
        width:'100%'
        ,height:'100%',
        backgroundColor:'black',
    },
    requestHeaderText:{
        width:'100%',justifyContent:'center',alignItems:'center',height:'65%',backgroundColor:'black',
    },
    postHeaderq: {

      backgroundColor: '#ffffff',
      elevation: 20,
      shadowColor: 15,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      padding: 12,
    
    }
})