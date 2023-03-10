import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AntDesign, Feather, Ionicons, Entypo, Octicons, SimpleLineIcons } from "@expo/vector-icons"
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements';
import { useHistory } from 'react-router-native';
import * as Animatable from 'react-native-animatable';
import { auth } from '../../../App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'

const InfoGroupChat = (props) => {
  const [userName, setUserName] = useState('');
  const [reports, setReports] = useState('');
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [Item, setItem] = useState([]);
  const history = useHistory();
  const user = firebase.auth().currentUser.uid
  console.log('user', user)
  const uid = props.location.state.uid
  console.log('user.uid', user.uid)
  const [searchResults, setSearchResults] = useState([]);
  const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
  const [checked, setChecked] = useState(true);

  const nickname = () => {
    firebase.firestore().collection('accounts').doc(user).collection("friends")
      .doc(uid)
      .set({
        nickname: userName,
        uid: uid,
        userName: props.location.state.userName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        email: props.location.state.email,
      })
      .then(() => {
        renameDone();
      })
  }

  const registerUserName = (inputText) => {
    setUserName(inputText);
  };

  const goTo = () => {
    setModalVisible2(true)
  };

  const gotofile = () => {
    // history.push('/file')
    delteteChat(true);
  }

  const gotoBack = () => {
    history.goBack();
  };
  const getUserIdOfSearch = searchResults.map((data) => {
    return data.objectID;

  });
  const openProfile = () => {
    history.push(`/profile/${props.location.state.uid}`);
  };
  const clickTat = () => {

  }
  const renameDone = () => {
    setModalVisible2(false)
    showConfirmDialog(true)
    history.push('/chats')
  }
  const openDone = () => {
    setModalVisible(true)
  }
  const gotoAddGr = () => {
    history.push('addChat')
  }
  const search = () => {
    history.push('/searchCaNhan', { uid: props.location.state.uid })
  }
  const fileAnh = () => {
    history.push('/AnhChatOne', { chatID: docid })
  }
  // const fileLink = () => {
  //   history.push('/LinkChatOne', {chatID : docid})
  // }
  const searchCaNhan = () => {
    history.push('/searchCaNhan');
  }
  const showConfirmDialog = () => {
    return Alert.alert(
      "B???n ???? thay ?????i bi???t danh th??nh c??ng",
    );
  };
  const showChan = () => {
    return Alert.alert(
      "B???n c?? ch???c ch???n",
      "Mu???n ch???n ng?????i n??y kh??ng?",
      [
        {
          text: "Hu???",
        }, {
          text: 'C??'
        },
      ]
    );
  };
  const delteteChat = () => {
    firebase.firestore().collection('chatrooms').doc(uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid).collection('messages').doc('sXlNi4mRs77dUd0BY1Jx')
      .delete()
      .then(() => {
        history.push('/chats');
      }
      )
  }


  const toggleSwitch = () => {
    setChecked(!checked);
  };
  const huy = () => {
    setModalVisible1(false)
  }
  const ok = () => {
    setModalVisible1(true)
  };

  const report = () => {
    firebase.firestore().collection('chatrooms').doc(docid).collection('report').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      report: reports,
      emailPeopleReport: auth.currentUser.email,
      nameIsReport: props.location.state.userName,
      emailIsReport: props.location.state.email,
    }).then(() => {
      rpdone();
    })
  };
  const rpdone = () => {
    setReports('')
    setModalVisible3(false)
    Alert.alert(
      'C???m ??n b???n ???? g??p ??',
      'Ch??ng t??i ???? nh???n th??ng tin v?? s??? kh???c ph???c v???n ????? n??y!!!'
    )
  }
  const cancelRp = () => {
    setModalVisible3(false)
}
const gotoReports = () => {
  setModalVisible3(true)
};

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#E2E2E2'
    }}>
      <Modal
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible1(!modalVisible3);
        }}>
        <Animatable.View style={styles.viewModalRp}
          animation="fadeInUpBig" duration={1000}
        >
          <View style={styles.viewHeader1}>
            <TouchableOpacity onPress={cancelRp} style={{
              flex: 0.5, marginStart: 5
            }}>
              <Text style={{
                color: 'red',
                fontSize: 16,
              }}>
                Hu???
              </Text>
            </TouchableOpacity>
            <Text style={styles.textHeader}>C?? v???n ????? g?? v???y?</Text>

          </View>
          <View style={{
            width: "90%",
            alignSelf: 'center',
            marginTop: 5,
          }}>
            <View>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold'
              }}>
                H??y cho ch??ng t??i bi???t chuy???n g?? ??ang x???y ra
              </Text>
            </View>
            <View>
              <Text style={{
                fontSize: 14,
                color: '#7F7F7F',
                marginTop: 2
              }}>
                D???a tr??n ?? ki???n ????ng g??p c???a b???n, ch??ng t??i s??? ph??t hi???n ???????c n???u c?? g?? ???? kh??ng ???n.
              </Text>
            </View>
            <View style={{
              height: 100,
              width: "100%",
              marginTop: 20,
              borderRadius: 30,
            }}>
              <TextInput
                placeholder='Vui l??ng nh???p v???n ????? b???n ??ang g???p ph???i...'
                placeholderTextColor={'black'}
                value={reports}
                onChangeText={(text) => setReports(text)}
                onSubmitEditing={report}
                style={{
                  borderWidth: 1,
                  height: "100%",
                  width: "100%",
                  borderRadius: 30,
                  paddingHorizontal: 16,
                }}
              />
            </View>
          </View>
          <View style={{
          }}>
            <View style={{
              marginTop: 10,
              width: "90%",
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: 10
            }}>
              <Text style={{
                fontSize: 14,
                color: 'red',
                marginTop: 2
              }}>
                N???u b???n th???y ai ???? ??ang g???p nguy hi???m, ?????ng ch???n ch??? m?? h??y b??o ngay cho d???ch v??? kh???n c???p t???i ?????a ph????ng
              </Text>
            </View>
            <TouchableOpacity style={{
              height: 40,
              width: "90%",
              alignSelf: 'center',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#0176E4',
              justifyContent: 'center',
            }} onPress={report}>
              <Text style={{
                color: '#0176E4',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                G???i
              </Text>

            </TouchableOpacity>
          </View>
        </Animatable.View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}>
        <Animatable.View style={styles.viewModalRemove}
          animation="zoomIn" duration={500}
        >
          <View style={{}}>
            <View style={{ marginTop: 20, }}>
              <Text style={{ color: 'black', fontSize: 16, fontWeight: '400', textAlign: 'center', marginHorizontal: 20 }}>
                B???n c?? ?????ng ?? xo?? cu???c tr?? chuy???n n??y kh??ng?
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 20,
            }}>
              <View style={styles.viewButtonXoa} >
                <TouchableOpacity onPress={huy}>
                  <Text style={styles.txtButtonRemove}>Kh??ng</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewButonDone}>
                <TouchableOpacity onPress={delteteChat}>
                  <Text style={styles.txtButtonRename} >?????ng ??</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Animatable.View>
      </Modal>

      <Animatable.View animation="lightSpeedIn" >
        <View style={styles.viewHeader}>
          <Feather
            onPress={gotoBack}
            name='chevron-left'
            size={25}
            color='black'
            style={{ marginStart: 5, flex: 0.5 }}
          />
          <Text style={styles.textHeader}>Tu??? ch???nh Chat</Text>
        </View>
        <ScrollView>
          <View style={styles.viewBg}>
            <Image style={styles.imgBg}
              source={{
                uri: props.location.state.avatar
              }}
            />
          </View>
          <View style={styles.viewInformation}>
            <TouchableOpacity style={styles.viewAvt}>
              <Avatar
                rounded
                size={96}
                source={{
                  uri: props.location.state.avatar
                }}>
              </Avatar>
            </TouchableOpacity>

            <Text style={styles.nameGr}>
              {props.location.state.userName}
            </Text>
            <View style={styles.viewOption}>
              <View style={styles.viewDetailOption}>
                <TouchableOpacity style={styles.viewIcon} onPress={search}>
                  <AntDesign
                    name='search1'
                    size={24}
                    color='white'
                    style={{ alignSelf: 'center', paddingTop: 10 }}
                  />
                </TouchableOpacity>
                <Text style={styles.txtDetailOption}>T??m tin nh???n</Text>

              </View>
              <View style={styles.viewDetailOption}>
                <TouchableOpacity style={styles.viewIcon} onPress={openProfile}>
                  <AntDesign
                    name='user'
                    size={24}
                    color='white'
                    style={{ alignSelf: 'center', paddingTop: 10 }}
                  />
                </TouchableOpacity>
                <Text style={styles.txtDetailOption}>Trang c?? nh??n</Text>

              </View>
              <View style={styles.viewDetailOption}>
                <TouchableOpacity style={styles.viewIcon}>
                  {clickTat ? (
                    <Feather
                      name='bell'
                      size={24}
                      color='white'
                      style={{ alignSelf: 'center', paddingTop: 10 }}
                    />
                  ) : (
                    <Feather
                      name='bell'
                      size={24}
                      color='red'
                      style={{ alignSelf: 'center', paddingTop: 10 }}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.txtDetailOption}>T???t th??ng b??o</Text>
              </View>

            </View>
          </View>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible); animationOutTiming = "300"
            }}>
            <View style={styles.viewModal}
            >
              <View style={{}}>
                <View style={{ marginTop: 20, }} >
                  <Text onPress={setModalVisible} style={{ color: '#0176E4', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                    ?????i ho??n t???t
                  </Text>
                </View>

              </View>
            </View>

          </Modal>
          <Modal
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              setModalVisible2(!modalVisible2);
            }}>
            <Animatable.View style={styles.viewModal}
              animation="zoomIn" duration={500}
            >
              <View style={{}}>
                <View style={{ marginTop: 20, }}>
                  <Text style={{ color: '#0176E4', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                    ?????t bi???t danh
                  </Text>
                </View>
                <View style={{
                  height: 35,
                  width: "80%",
                  backgroundColor: '#E2E2E2',
                  marginTop: 16,
                  borderRadius: 20,
                  alignSelf: 'center'
                }}>
                  <TextInput placeholder={props.location.state.userName}
                    placeholderTextColor={"#7F7F7F"}
                    inputText={userName}
                    onChangeText={registerUserName}
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 16,
                      fontWeight: '600',
                      marginTop: 4,

                    }} />
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingHorizontal: 20,
                }}>
                  <View style={styles.viewButtonRename} >
                    <TouchableOpacity onPress={setModalVisible2}>
                      <Text style={styles.txtButtonRename}>Hu???</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewButonDone}>
                    <TouchableOpacity onPress={nickname}>
                      <Text style={styles.txtButtonRename} >Ho??n t???t</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </Animatable.View>

          </Modal>
          <Animatable.View animation="slideInUp" delay={200}>
            <View style={styles.viewDetail}>
              <TouchableOpacity style={styles.viewRename} onPress={goTo}>
                <SimpleLineIcons
                  name='pencil'
                  size={24}
                  color='black'
                  style={{ alignSelf: 'center', paddingTop: 10 }}
                />
                <Text style={styles.txtDetail}>?????t bi???t danh</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewRename} >
                <Feather
                  name='image'
                  size={24}
                  color='black'
                  style={{ alignSelf: 'center', paddingTop: 10 }}
                />
                <Text style={styles.txtDetail}>?????i ch??? ????? cu???c tr?? chuy???n</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewRename}>
                <Feather
                  name='star'
                  size={24}
                  color='black'
                  style={{ alignSelf: 'center', paddingTop: 10 }}
                />
                <Text style={styles.txtDetail}>????nh d???u l?? b???n th??n</Text>
                <View style={{
                  marginStart: 120,
                  marginTop: 5,
                }}>
                  <Switch
                    value={checked}
                    onValueChange={(toggleSwitch) => setChecked(toggleSwitch)}
                  />
                </View>

              </TouchableOpacity>
              <TouchableOpacity style={styles.viewRename} onPress={fileAnh}>
                <Feather
                  name='image'
                  size={24}
                  color='black'
                  style={{ alignSelf: 'center', paddingTop: 10 }}
                />
                <Text style={styles.txtDetail}>???nh, file, link ???? chia s???</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewRename} onPress={gotoAddGr}>
                <Feather
                  name='users'
                  size={24}
                  color='black'
                  style={{ alignSelf: 'center', paddingTop: 10 }}
                />
                <Text style={styles.txtDetail}>T???o nh??m v???i ng?????i n??y</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewDetailBottom}>
              <TouchableOpacity style={styles.viewRename} onPress={showChan}>
                <Octicons
                  name='x-circle'
                  size={24}
                  color='black'
                  style={{ alignSelf: 'center', paddingTop: 10 }}
                />
                <Text style={styles.txtDetail}>Ch???n tin nh???n</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewRename} onPress={gotoReports}>
                <AntDesign
                  name='warning'
                  size={24}
                  color='red'
                  style={{ alignSelf: 'center', paddingTop: 10 }}
                />
                <Text style={styles.txtDetailRed}>B??o c??o</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewRename} onPress={ok}>
                <Feather
                  name='trash-2'
                  size={24}
                  color='red'
                  style={{ alignSelf: 'center', paddingTop: 10 }}
                />
                <Text style={styles.txtDetailRed}>Xo?? cu???c tr?? chuy???n</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  )
}

export default InfoGroupChat

const styles = StyleSheet.create({
  viewHeader: {
    backgroundColor: 'white',
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
  viewBg: {
    height: 210,
    width: "100%",
    borderRadius: 20,
    backgroundColor: '#C0C0C0'
  },
  imgBg: {
    height: "100%",
    width: '100%',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,

  },
  viewInformation: {
    height: 248,
    width: 309,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    top: -170,
  },
  viewAvt: {
    alignSelf: 'center',
    marginTop: 16
  },
  nameGr: {
    fontSize: 18,
    color: '#0176E4',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  viewOption: {
    height: 80,
    width: "100%",
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewDetailOption: {
    height: 80,
    width: 100,
  },
  viewIcon: {
    height: 44,
    width: 44,
    backgroundColor: '#0176E4',
    alignSelf: 'center',
    marginTop: 7,
    borderRadius: 20,
  },
  txtDetailOption: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center'
  },
  viewDetail: {
    backgroundColor: 'white',
    width: "100%",
    top: -155,
    borderRadius: 20,
    paddingBottom: 10,
  },
  viewRename: {
    height: 50,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 16,
  },
  txtDetail: {
    marginStart: 10,
    fontSize: 16,
    marginTop: 10
  },
  viewDetailBottom: {
    height: 168,
    width: "100%",
    backgroundColor: 'white',
    top: -145,
    borderRadius: 20,
  },
  txtDetailRed: {
    marginStart: 10,
    fontSize: 16,
    color: 'red',
    marginTop: 10
  },
  viewModal: {
    height: 179,
    width: "70%",
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: '80%',
    borderWidth: 1,
  },
  txtButtonRename: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewButtonRename: {
    height: 42,
    width: 90,
    backgroundColor: 'red',
    marginTop: 16,
    borderRadius: 20,
    justifyContent: 'center'
  },
  viewButonDone: {
    height: 42,
    width: 90,
    backgroundColor: '#0176E4',
    marginTop: 16,
    borderRadius: 20,
    justifyContent: 'center'
  },
  viewModalRemove: {
    height: 140,
    width: "70%",
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: '82%',
    borderWidth: 1,
  },
  viewButtonXoa: {
    height: 42,
    width: 90,
    backgroundColor: 'white',
    marginTop: 16,
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0176E4'
  },
  txtButtonRemove: {
    color: '#0176E4',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewButonDone: {
    height: 42,
    width: 90,
    backgroundColor: '#0176E4',
    marginTop: 16,
    borderRadius: 20,
    justifyContent: 'center'
  },
  txtButtonRename: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewModalRp: {
    height: "100%",
    width: "100%",
    backgroundColor: 'white',
    alignSelf: 'center',
    top: "20%",
    borderRadius: 30,
    borderWidth: 1
},
viewHeader1: {
  backgroundColor: 'white',
  height: 44,
  width: "90%",
  borderRadius: 30,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center'
},
})