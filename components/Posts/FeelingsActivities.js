import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import { PageHeaderLogin } from '../AppComponents/PageHeaderLogin';
import SearchChatItemCaNhan from '../AppComponents/SearchChatItemCaNhan';
import { CustomModal2 } from './CustomModal2';

function FeelingsActivities({ setModalVisible, modalVisible, addAFeeling }) {
  const history = useHistory();
  const goToback = () => {
    history.push(`/AddPost`);
    
      setModalVisible(!modalVisible);
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
          <Feather  name='chevron-left' size={25} color='black' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trạng thái cảm xúc</Text>
      </View>
      
      <PageHeaderLogin placeholder='Cảm xúc' placeholder2='Hoạt động'
        onPressNavigation={goTofeeling} onPressNavigationDK={goToAcction} >

      </PageHeaderLogin>
      <View style={{backgroundColor:'red',marginBottom:15}}></View>
      <SearchChatItemCaNhan style={{marginTop:15}}></SearchChatItemCaNhan>

      <View style={styles.feelingsTable}>
        <View style={styles.leftColumns}>
          <TouchableOpacity>
            <Text
              style={styles.emojis}
              onPress={() => {
                addAFeeling('is feeling happy &#128578;');
                setModalVisible(!modalVisible);
              }}
            >
              &#128578; Hạnh phúc
            </Text>
          </TouchableOpacity>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling loved &#128525;');
              setModalVisible(!modalVisible);
            }}
          >
            &#128525; Đáng yêu
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling sad &#128532;');
              setModalVisible(!modalVisible);
            }}
          >
            &#128532; Buồn
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling pouting face &#128545;');
              setModalVisible(!modalVisible);
            }}
          >
            &#128545; Tức giận
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling spleep &#128564;');
              setModalVisible(!modalVisible);
            }}
          >
            &#128564; Buồn ngủ
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling sneezing  &#128532;');
              setModalVisible(!modalVisible);
            }}
          >
           &#129319; Bị bệnh
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling with horns &#128520;');
              setModalVisible(!modalVisible);
            }}
          >
            &#128520; Hắc hắc
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling expressionless &#128529;');
              setModalVisible(!modalVisible);
            }}
          >
            	&#128529; Cạn lời
          </Text>
        </View>
        <View style={styles.rightColumns}>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling excited &#129321;');
              setModalVisible(!modalVisible);
            }}
          >
            &#129321; Hưng phấn
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling crazy &#129322;');
              setModalVisible(!modalVisible);
            }}
          >
            &#129322; Điên rồ
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling thoughtful &#129488;');
              setModalVisible(!modalVisible);
            }}
          >
            &#129488; Suy ngẫm
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling fearful &#128552;');
              setModalVisible(!modalVisible);
            }}
          >
           &#128552; Rén
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling money mouth &#129297;');
              setModalVisible(!modalVisible);
            }}
          >
           	&#129297; Ăn tiền
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling drooling &#129316;');
              setModalVisible(!modalVisible);
            }}
          >
            &#129316; Thèm
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling 7tinh &#128557;');
              setModalVisible(!modalVisible);
            }}
          >
           &#128557; Thất tình
          </Text>
          <Text
            style={styles.emojis}
            onPress={() => {
              addAFeeling('is feeling smirking &#128527;');
              setModalVisible(!modalVisible);
            }}
          >
           	&#128527; Xừ
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

export { FeelingsActivities };
