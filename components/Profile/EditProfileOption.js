import { StyleSheet, Text, View,SafeAreaView,   StatusBar,TouchableOpacity } from 'react-native'
import React from 'react'
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-native';
import { PageHeader2 } from '../AppComponents/PageHeader2'
import { Feather, Ionicons, Octicons, AntDesign } from '@expo/vector-icons';
const EditProfileOption = (props) => {
    const history = useHistory();
    const user = firebase.auth().currentUser;
  const userId = user.uid;

  const profileId = props.match.params.id;
  console.log(profileId)
    const goBack = () => {
        history.goBack()
      };
    
      const goToProfile = () => {
       
      };
      const goToEditProfile = () => {
        history.push(`/editProfile/${userId}`,{userName:user.userName});
      };
      const editIcon = <Feather name='chevron-right' size={24} color='black' />;
     
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E2E2E2', }}>
    <StatusBar barStyle={'dark-content'} backgroundColor="white" />

    <PageHeader2
      placeholder='Chỉnh sửa thông tin'
      onPressNavigation={goBack}
    />
     <View style={{ marginTop:8,backgroundColor: '#ffffff', flexDirection: 'column', borderRadius: 20, width: '100%', justifyContent: 'center', width: '100%' }}>
        <TouchableOpacity  onPress={goToEditProfile}> 
          <View style={styles.clickoption}>
            
            <Text style={{fontSize:14,fontWeight:'400'}}>Thông tin cá nhân</Text>
            <View style={{marginLeft:'62%'}}>
            {editIcon}
            </View>
           
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.clickoption}>
            
            <Text style={{fontSize:14,fontWeight:'400'}}>Ảnh đại diện</Text>
            <View style={{marginLeft:'70%'}}>
            {editIcon}
            </View>
          </View>
        </TouchableOpacity >

        <TouchableOpacity>
          <View style={styles.clickoption}>
          
            <Text style={{fontSize:14,fontWeight:'400'}}>Số điện thoại</Text>
            <View style={{marginLeft:'69%'}}>
            {editIcon}
            </View>
          </View>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default EditProfileOption

const styles = StyleSheet.create({
    userName: { fontWeight: '700', marginRight: 5, marginLeft: 5, fontSize: 17 },
avatarImage: { width: 48, height: 48, borderRadius: 50, marginLeft: 16, justifyContent: 'center', alignSelf: 'center', marginTop: 15 },
clickoption: { flexDirection: 'row', marginTop: 16, marginLeft: 16, marginBottom: 10,marginRight:16,
 }})