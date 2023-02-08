import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView, StatusBar, ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import { useFirestoreDocument } from '../hooks';
import { useHistory } from 'react-router-native';
import { Image } from 'react-native-expo-image-cache';
import { PageHeaderEditProfile } from '../AppComponents/PageHeaderEditProfile';
import { Avatar, RadioButton } from 'react-native-paper';
import BottomSheet from "react-native-easy-bottomsheet";
 import DatePicker,{getToday,getFormatedDate} from 'react-native-modern-datepicker';
function EditProfile(props) {
  const history = useHistory();

  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const db = firebase.firestore();

  console.log(getCurrentLoggedUser);
  const [updateUsername, setUpdateUsername] = useState('Người dùng Youus');
  const [updateBio, setUpdateBio] = useState('');
  const [updateBirthday, setUpdateBirthday] = useState('');
  const [updateLocation, setUpdateLocation] = useState('');
  const [checked, setChecked] = React.useState('Nam');
  const [Donee, setDone] = useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [checkon, setCheckon] = useState(true);
  const [isVisible, setVisible] = useState(false);
  getToday();


  const [selectedDate, setSelectedDate] = useState('');

  const handleBirthdayUpdate = (inputText) => {
    setUpdateBirthday(inputText);
    setDone(true);
    setUpdateUsername(getCurrentLoggedUser.data.userName);
  };

  const handleLocationUpdate = (inputText) => {
    setUpdateLocation(inputText);
    setDone(true);
    setUpdateUsername(getCurrentLoggedUser.data.userName);
  };
  const handleusernameUpdate = (inputText) => {

    setUpdateUsername(inputText);
    setDone(true);
  };

  const handleBioUpdate = (inputText) => {
    setUpdateBio(inputText);
    setDone(true);
    setUpdateUsername(getCurrentLoggedUser.data.userName);
  };
  const handleSexUpdate = (checked) => {
    setChecked(checked);

    setDone(true);
    setUpdateUsername(getCurrentLoggedUser.data.userName);
  };

  const getCurrentLoggedUser = useFirestoreDocument(
    firebase.firestore().collection('accounts').doc(userId),
    [userId]
  );

  if (!getCurrentLoggedUser) {
    return null;
  }
  const backToProfile = () => {
    history.push(`/profile/${userId}`);
  };
  const gotoBack = () => {
    history.goBack()
  };

  const handleSaveChanges = () => {
    db.collection('accounts').doc(userId).update({

      birthday: updateBirthday,
      location: updateLocation,
      userName: updateUsername,
      bio: updateBio,
      sex: checked,
    });
    history.push(`/profile/${userId}`);
  };



  const editIcon = <Feather style={{ borderBottomColor: '#7F7F7F', borderBottomWidth: 0.5, alignSelf: 'flex-end', paddingVertical: 5 }} name='edit-3' size={20} color='#7F7F7F' />;
  return (

    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />


      <View style={styles.header}>
        <TouchableOpacity onPress={gotoBack}>
          <Text style={styles.headerTitle}>Hủy</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={Donee === true ? (false) : (true)} onPress={handleSaveChanges}>
          <Text style={{ fontWeight: '700', fontSize: 20, color: Donee === true ? ('#0176E4') : ('#7F7F7F') }}>Xong</Text>
        </TouchableOpacity>
      </View>
      {isVisible && (<>
        <BottomSheet
          bottomSheetTitle={""}
          bottomSheetIconColor="#0A2463"
          bottomSheetStyle={{
            backgroundColor: "white",
            maxHeight: "65%",
            minHeight: "60%",
          }}
          bottomSheetTitleStyle={{ color: '#0A2463', fontSize: 20, }}
          setBottomSheetVisible={setVisible}
          bottomSheetVisible={isVisible}
        >

          <View style={{ height: 500, backgroundColor: 'red' }}>
            {
              checkon && (<><DatePicker style={{ flex: 1, width: '100%', justifyContent: 'center', alignSelf: 'center' }}

                options={{

                  mainColor: '#0176E4',
                  textSecondaryColor: '#0176E4',
                  borderColor: 'rgba(122, 146, 165, 0.1)',
                }}

                current={getToday.setUpdateBirthday}
                mode="calendar"
                minuteInterval={30}


                onSelectedChange={date => setUpdateBirthday(date)}
              /></>)
            }
          </View>

        </BottomSheet>
      </>)}
      <View style={styles.profileContainer}>
        {/* <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Ảnh đại diện:</Text>
          <Image
            uri={getCurrentLoggedUser.data.profilePicture}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Ảnh bìa:</Text>
          <Image
            uri={getCurrentLoggedUser.data.profilePicture}
            style={styles.profilePicture}
          />
        </View> */}
        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Tên người dùng</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.userData}
              textContentType='name'
              name='username'
              placeholderTextColor='#000000'
              onChangeText={handleusernameUpdate}
              inputText={updateUsername}
              defaultValue={getCurrentLoggedUser.data.userName ? (getCurrentLoggedUser.data.userName) : ''}

            />
            {editIcon}
          </View>

        </View>

        <View style={styles.profileSection}>

          <Text style={styles.userPlaceHolder}>Ngày sinh</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput onPressIn={() => setVisible(!isVisible
            )}
              style={styles.userData}
              textContentType='birth'
              name='birth'
              value={updateBirthday}
              placeholderTextColor='#A8A39F'
              onChangeText={handleBirthdayUpdate}
              inputText={updateBirthday}
              defaultValue={getCurrentLoggedUser.data.birthday ? (getCurrentLoggedUser.data.birthday) : ''}
            />
            {editIcon}



          </View>

        </View>



        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Nơi ở</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.userData}
              name='location'
              defaultValue={getCurrentLoggedUser.data.location ? (getCurrentLoggedUser.data.location) : ''}
              placeholderTextColor='#000000'
              onChangeText={handleLocationUpdate}
              inputText={updateLocation}

            />
            {editIcon}
          </View>

        </View>
        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Giới thiệu</Text  >
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.userData}
              textContentType='emailAddress'
              name='birthday'
              defaultValue={getCurrentLoggedUser.data.bio ? (getCurrentLoggedUser.data.bio) : ''}
              placeholderTextColor='#000000'
              onChangeText={handleBioUpdate}
              inputText={updateBio}

            />
            {editIcon}
          </View>

        </View>
        <View style={styles.profileSection}>
          <Text style={styles.userPlaceHolder}>Giới Tính</Text  >
          <View style={{ flexDirection: 'row', alignContent: 'flex-start', width: '100%', alignItems: 'center' }}>

            <RadioButton
              value="Nam"

              color='#0176E4'
              status={checked === 'Nam' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Nam')}
            />
            <Text> Nam      </Text>

            <RadioButton
              value="Nữ"

              color='#0176E4'
              status={checked === 'Nữ' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Nữ')}
            />
            <Text style={{ justifyContent: 'center' }}> Nữ      </Text>
            <RadioButton
              value="Khác"
              color='#FF6196'
              status={checked === 'Khác' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Khác')}
            />
            <Text> Khác        </Text>
          </View>

        </View>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { width: '100%', backgroundColor: '#E2E2E2', height: '100%', },
  header: {
    backgroundColor: '#ffffff',
    elevation: 20,
    shadowColor: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: { fontWeight: '700', fontSize: 20 },

  postButton: { fontWeight: '700', fontSize: 20, color: '#0176E4' },
  profilePicture: { width: 100, height: 100, },
  userName: { fontSize: 18, fontWeight: 'bold' },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 8, backgroundColor: '#ffffff', flexDirection: 'column', borderRadius: 20, width: '100%', justifyContent: 'center', width: '100%'
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 343,
    height: 53,
    marginHorizontal: 16,
    marginVertical: 10,
    justifyContent: 'center'
  }, container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPlaceHolder: { fontSize: 20, fontWeight: '700', fontStyle: 'normal', fontSize: 14, alignSelf: 'stretch', flexGrow: 0, color: '#2B2B2B', marginBottom: 8, },
  userData: { marginLeft: 0, fontSize: 14, borderBottomColor: '#7F7F7F', borderBottomWidth: 0.5, padding: 2, width: '94%' },
});

export { EditProfile };
