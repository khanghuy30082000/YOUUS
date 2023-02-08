import { StyleSheet, Text, View,SafeAreaView,Image } from 'react-native'
import React from 'react'
import { PageHeader2 } from '../AppComponents/PageHeader2'
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';

const VideoInPost = () => {
    const history = useHistory();
    const goBack = () => {
        history.goBack()
      };
    
  return (
    <SafeAreaView style={{backgroundColor:'#ffffff',height:'100%'}}>
      <PageHeader2
      placeholder='Video đã đăng tải'
      onPressNavigation={goBack}
    />
  <View style={{ justifyContent: 'center', alignSelf: 'center',width:'70%',height:'80%' }}>
  {/* <RNImage source={Avatar} style={styles.requestHeaderText} /> */}
  <Image style={styles.requestHeaderText} source={require('../../assets/toaster.gif')}></Image>
    <Text style={{justifyContent: 'center', alignSelf: 'center',fontWeight:'bold',fontSize:15}}>Danh sách video trống</Text>
  </View>

    </SafeAreaView>
  )
}

export default VideoInPost

const styles = StyleSheet.create({
    postHeader:{
        width:'100%'
        ,height:'100%',
        
    },
    requestHeaderText:{
        width:'100%',justifyContent:'center',alignItems:'center',height:'50%',
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