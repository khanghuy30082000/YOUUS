import { StyleSheet, Text, View ,Image as RNImage,SafeAreaView} from 'react-native'
import React from 'react'
import { Image } from 'react-native-expo-image-cache';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import { PageheaderBlack } from './PageheaderBlack';
import Avatar from '../Images/avatar.png';
const OpenImage = (props,cover) => {
  const history = useHistory();
  const backToDashboard = () => {
    history.goBack();
  };
    const placeholder3 = props.location.state.cover|| "https://firebasestorage.googleapis.com/v0/b/fbilogisticggm.appspot.com/o/wave.jpg?alt=media&token=39d2caad-221f-4edc-b157-34644ba5c073";
   console.log(props);
  return (
    <SafeAreaView style={styles.postHeader}>
      <PageheaderBlack
      
        placeholder=''
        onPressNavigation={backToDashboard}
      />
    <View style={{ justifyContent: 'center', alignSelf: 'center',width:'100%',height:'90%' }}>
    {/* <RNImage source={Avatar} style={styles.requestHeaderText} /> */}
    <Image style={styles.requestHeaderText}uri={placeholder3}></Image>
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
        width:'100%',justifyContent:'center',alignItems:'center',height:'40%',maxHeight:400,backgroundColor:'black',
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