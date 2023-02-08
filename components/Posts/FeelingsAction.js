import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import { PageHeaderSignup } from '../AppComponents/PageHeaderSignup';
import SearchChatItemCaNhan from '../AppComponents/SearchChatItemCaNhan';
import { CustomModal } from '../Posts/CustomModal';
import { CustomModal2 } from '../Posts/CustomModal2';
function FeelingsAction({ setModalVisible, modalVisible, addAFeeling }) {
  const history = useHistory();
  const goToback = () => {
    history.goBack();
  };
  const goTofeeling = () => {
    history.push(`/FeelingsActivities`);
  };
  const goToAcction = () => {
   CustomModal2
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
         <StatusBar  barStyle={'dark-content'} backgroundColor="white" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goToback}>
          <Feather  name='chevron-left' size={26} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trạng thái hành động</Text>
      </View>
      
      <PageHeaderSignup placeholder='Cảm xúc' placeholder2='Hoạt động'
       onPressNavigationDN={goTofeeling} onPressNavigationDK={goToAcction} >

      </PageHeaderSignup>
      <View style={{marginBottom:15}}></View>
      <SearchChatItemCaNhan>

      </SearchChatItemCaNhan>

      <View style={styles.feelingsTable}>
        <View style={styles.leftColumns}>
          <TouchableOpacity>
            <Text
              style={styles.emojis}
              onPress={() => {
                addAFeeling('is Meaning &#127870;');
                setModalVisible(!modalVisible);
              }}
            >
              &#127870; ăn mừng
            </Text>
          </TouchableOpacity>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is CLAPPER BOARD &#127916;');
              setModalVisible(!modalVisible);
            }}
          >
            &#127916; xem phim
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is music &#127925;');
              setModalVisible(!modalVisible);
            }}
          >
            &#127925; nghe nhạc
          </Text>

          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is AIRPLANE DEPARTURE &#128747;');
              setModalVisible(!modalVisible);
            }}
          >
            &#128747; du lịch
          </Text>
      
        </View>
        <View style={styles.rightColumns}>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is nhaunhet &#127866;');
              setModalVisible(!modalVisible);
            }}
          >
            &#127866; nhậu nhẹt
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is BIRTHDAY CAKE &#127874;');
              setModalVisible(!modalVisible);
            }}
          >
           &#127874; sinh nhật
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is OPEN BOOK &#128214;');
              setModalVisible(!modalVisible);
            }}
          >
             &#128214; đọc sách
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is THOUGHT BALLOON &#128173;');
              setModalVisible(!modalVisible);
            }}
          >
           &#128173; nghĩ về
          </Text>
          
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom:10,
    marginLeft:18,
    textShadowRadius:6,
  },
  headerTitle: { fontWeight: 'bold', fontSize: 20,color:'#0176E4',alignItems:'center',alignSelf:'center',marginLeft:'20%'},
  postButton: { fontWeight: 'bold', fontSize: 18, color: '#A8A39F' },
  feelingsTable: {
    marginTop:10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emojis: {
    paddingHorizontal:40,
    padding: 20,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ECE6E0',
  },
});

export { FeelingsAction };
