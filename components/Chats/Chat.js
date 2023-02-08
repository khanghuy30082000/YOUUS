import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Image
} from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Avatar } from 'react-native-elements';
import { PageHeadersLC } from '../AppComponents/PageHeadersLC'
import { AntDesign, Feather, Ionicons, Entypo, FontAwesome } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar';
import { useFirestoreCollection, useFirestoreDocument } from '../hooks';
import { auth, db } from '../../App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import * as ImagePicker from 'expo-image-picker';
import { useHistory } from 'react-router-native';
import * as Animatable from 'react-native-animatable';
import BottomSheet from "react-native-easy-bottomsheet";
const Xanhh = "#0176E4";
const Do = 'green'

const Chat = (props) => {
  const [users, setUsers] = useState(null)
  const getUsers = useFirestoreDocument(
    db.collection('accounts').doc(firebase.auth().currentUser.uid),
    [chatID]
  );
  console.log('user ne', getUsers)
  // console.log("props : ", props)
  const [isVisible, setVisible] = useState(false);
  const chatID = props.location.state.id;
  // console.log('chatid', chatID)
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [modalVisible2, setModalVisible2] = useState(false);

  const upLoad = async () => {

    const uri = image
    const childPath = `chatGroup/${chatID}/${Math.random().toString(36)}`;
    console.log(childPath)
    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`)
    }
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        saveImageData(snapshot);
        console.log(snapshot)
      })
    }
    const taskError = snapshot => {
      console.log(snapshot)
    }
    const cancel = () => {
      setModalVisible2(false)
    }
    task.on("state_change", taskProgress, taskError, taskCompleted, cancel);

  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      setVisible(true);

    }

  };


  const getChatID = useFirestoreDocument(
    db.collection('chatgroup').doc(chatID),
    [chatID]
  );

  const saveImageData = (downloadURL) => {
    db.collection('chatgroup').doc(chatID).collection('messages').add({
      downloadURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      email: auth.currentUser.email,
      userName: getUsers.data.userName,
      photoAvt: getUsers.data.profilePicture || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
    }).then(
      setVisible(false)
    )
  }

  const gotoBack = () => {
    history.goBack();
  };

  const infChat = () => {
    history.push('/infGrChat', { nameChat: getChatID.data.chatName, avatar: getChatID.data.avt || "https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg", chatID: props.location.state.id });
  };
  const call = () => {
    history.push('/Call', { nameChat: getChatID.data.chatName, avatar: getChatID.data.avt || "https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg", chatID: props.location.state.id });
  };
  const sendMessenger = () => {
    Keyboard.dismiss();
    db.collection('chatgroup').doc(chatID).collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        userName: getUsers.data.userName,
        email: auth.currentUser.email,
        nameGr: getChatID.data.chatName,
        imageGr: getChatID.data.avt || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg",
        photoAvt: getUsers.data.profilePicture || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
      })
    setInput('')
  };

  useLayoutEffect(() => {
    const unsubscribe = db.collection("chatgroup")
      .doc(chatID)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
      );
    return unsubscribe;
  }, [])

  if (!getChatID) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <StatusBar style='dark' /> */}
      <View style={{
        flex: 0.1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomRightRadiuss: 20,
        borderBottomLeftRadius: 20
      }}>
        <Feather
          onPress={gotoBack}
          name='chevron-left'
          size={25}
          color='black'
          style={{ marginStart: 5 }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%', height: "60%", paddingStart: 10 }}>
          <Avatar
            rounded
            source={{
              uri: getChatID.data.avt || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
            }}>
          </Avatar>
          <TouchableOpacity style={{ marginStart: 5, width: "85%" }} onPress={infChat}>
            <Text style={styles.requestHeaderText}>{getChatID.data.chatName}</Text>
            <Text style={{ paddingStart: 10, }}>333 Thành Viên</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginHorizontal: '1%' }}>
            <TouchableOpacity style={{ paddingEnd: 20, }} onPress={call}>
              <Ionicons name="call" size={24} color={Xanhh} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingEnd: 20, }}>
              <FontAwesome name='video-camera' size={24} color={Xanhh} />
            </TouchableOpacity>
            <TouchableOpacity onPress={infChat}>
              <Entypo name='dots-three-vertical' size={24} color={Xanhh} />
            </TouchableOpacity>
          </View>

        </View>

      </View>
      {/* <StatusBar style='dark' /> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15, }} style={{ flex: 0.8, backgroundColor: '#E2E2E2' }}>
              {messages.map(({ id, data }) => (
                data.email === auth.currentUser.email ?
                  (
                    data.downloadURL ? (
                      <TouchableOpacity style={{
                        maxWidth: "80%", alignSelf: 'flex-end', height: 250, width: 250, marginEnd: 10, marginBottom: 6

                      }}>
                        <Image style={{ height: "100%", width: "100%", borderRadius: 10, }} source={{ uri: data.downloadURL }} />
                      </TouchableOpacity>


                    ) : (
                      (data.votes ? (
                        <TouchableOpacity key={id} style={{
                          width: "70%", backgroundColor: 'white', alignSelf: 'center',
                          marginBottom: 6, padding: 10, borderRadius: 20,
                        }}>
                          <View style={{padding: 5}}>
                            <Text style={{fontSize: 16, fontWeight:'bold', textAlign:'center'}}> {data.votes}</Text>
                            <TouchableOpacity style={{
                              backgroundColor: '#E2E2E2',
                              marginTop: 5,
                              borderRadius: 20,
                            }}>
                              <Text style={{
                                padding: 10,
                                fontSize: 14, marginStart: 5,
                                fontWeight: 'bold'
                              }}>{data.idea1}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                              backgroundColor: '#E2E2E2',
                              marginTop: 7,
                              borderRadius: 20,
                            }}>
                              <Text style={{
                                padding: 10,
                                fontSize: 14, marginStart: 5,
                                fontWeight: 'bold'
                              }}>{data.idea2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: "50%", backgroundColor:Xanhh, marginTop: 10, alignSelf:'center', alignItems:'center', borderRadius: 20,}}>
                              <Text style={{ fontSize: 18, fontWeight:'bold', color:'white', padding: 5,}}>
                                Bình chọn
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity key={id} style={{
                          maxWidth: "80%", backgroundColor: Xanhh, alignSelf: 'flex-end',
                          marginEnd: 10, marginBottom: 6, padding: 10, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20,
                        }}>
                          <Text style={styles.recieverText}> {data.message}</Text>
                        </TouchableOpacity>
                      )
                      )
                    )

                  )
                  :
                  (
                    data.downloadURL ? (
                      <TouchableOpacity style={{
                        flexDirection: 'row', maxWidth: "80%"
                      }}>
                        <View style={{
                          marginEnd: 50,
                        }}>
                          <Avatar
                            position="absolute"
                            rounded
                            containerStyle={{
                              position: "absolute",
                            }}
                            margin={9}
                            size={30}
                            bottom={-8}
                            source={{
                              uri: data.photoAvt || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
                            }}
                          />
                        </View>
                        <TouchableOpacity style={{ marginTop: 6 }}>
                          <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: Do
                          }}>
                            {data.userName}
                          </Text>
                          <Image style={{ height: 250, width: 250, borderRadius: 10, marginTop: 3, marginBottom: 10, }} source={{ uri: data.downloadURL }} />
                        </TouchableOpacity>

                      </TouchableOpacity>
                    ) : (
                      (data.votes ? (
                        <TouchableOpacity key={id} style={{
                          width: "70%", backgroundColor: 'white', alignSelf: 'center',
                          marginBottom: 6, padding: 10, borderRadius: 20,
                        }}>
                          <View style={{padding: 5}}>
                            <Text style={{fontSize: 16, fontWeight:'bold', textAlign:'center'}}> {data.votes}</Text>
                            <TouchableOpacity style={{
                              backgroundColor: '#E2E2E2',
                              marginTop: 5,
                              borderRadius: 20,
                            }}>
                              <Text style={{
                                padding: 10,
                                fontSize: 14, marginStart: 5,
                                fontWeight: 'bold'
                              }}>{data.idea1}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                              backgroundColor: '#E2E2E2',
                              marginTop: 7,
                              borderRadius: 20,
                            }}>
                              <Text style={{
                                padding: 10,
                                fontSize: 14, marginStart: 5,
                                fontWeight: 'bold'
                              }}>{data.idea2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: "50%", backgroundColor:Xanhh, marginTop: 10, alignSelf:'center', alignItems:'center', borderRadius: 20,}}>
                              <Text style={{ fontSize: 18, fontWeight:'bold', color:'white', padding: 5,}}>
                                Bình chọn
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <View style={{
                          flexDirection: "row",
                          maxWidth: '80%',
                        }}>
                          <TouchableOpacity style={{
                            marginEnd: 35,
                          }}>
                            <Avatar
                              position="absolute"
                              rounded
                              containerStyle={{
                                position: "absolute",
                              }}
                              margin={9}
                              size={30}
                              bottom={-8}
                              source={{
                                uri: data.photoAvt || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
                              }}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity style={{
                            maxWidth: "80%", backgroundColor: 'white', padding: 10, marginBottom: 7, borderBottomRightRadius: 20,
                            borderTopLeftRadius: 20, borderTopRightRadius: 20, marginStart: 10, alignSelf: 'flex-start',
                          }}>
                            <View>
                              <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: Do
                              }}>
                                {data.userName}
                              </Text>
                              <Text style={{
                                fontSize: 14,
                                color: 'black'
                              }}>
                                {data.message}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))
                    )


                  )
              ))}
            </ScrollView>
            <View style={styles.centeredView}>
              <BottomSheet
                bottomSheetTitle={"Nhấn để gửi ảnh"}
                bottomSheetTitleStyle={{ color: '#0A2463', fontSize: 16, marginStart: "33%" }}
                setBottomSheetVisible={setVisible}
                bottomSheetVisible={isVisible}
              >
                <ScrollView>
                  <View>
                    {image && <Image source={{ uri: image }} style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 10, marginTop: 5 }} />}
                  </View>
                  <TouchableOpacity onPress={upLoad}>
                    <View style={{ width: "80%", height: 50, borderRadius: 20, shadowRadius: 10, justifyContent: 'center', alignSelf: 'center', backgroundColor: Xanhh, marginTop: 20, }}>
                      <Text style={{ justifyContent: 'center', fontSize: 20, color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}>Gửi</Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </BottomSheet>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={{
                marginEnd: 20,
              }}>
                <Entypo
                  name='add-to-list'
                  size={30}
                  color={Xanhh}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{
                marginEnd: 20,
              }}
                onPress={pickImage}
              >
                <Feather
                  name='image'
                  size={30}
                  color={Xanhh}

                />
              </TouchableOpacity>
              <TouchableOpacity style={{
                marginEnd: 20,
              }}>
                <FontAwesome
                  name='microphone'
                  size={30}
                  color={Xanhh}
                />
              </TouchableOpacity>
              <TextInput
                placeholder='Tin nhắn'
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessenger}
                placeholderTextColor="#7F7F7F"
                style={{
                  height: 40,
                  width: '50%',
                  backgroundColor: '#E2E2E2',
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  fontSize: 16,
                }}
              />
              <TouchableOpacity
                disabled={!input}
                onPress={sendMessenger}
                activeOpacity={0.5}
                style={{
                  marginStart: 20,
                }}>
                <Ionicons name='send' size={30} color="#2B68E6" />
              </TouchableOpacity>

            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2'
  },
  footer: {
    flexDirection: 'row',
    alignItems: "center",
    width: "100%",
    padding: 15,
    flex: 0.1,
    // bottom: "-15%",
    backgroundColor: 'white'
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "#00FFFF",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  reciever: {
    padding: 15,
    backgroundColor: Xanhh,
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: 'relative',
    flexDirection: 'row'
  },
  sender: {
    padding: 15,
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    fontWeight: "500",
    color: "white",
    marginLeft: 0,
  },
  postHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    height: 70,
    backgroundColor: 'white'
  },
  requestHeaderText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    paddingStart: 10,
    color: Xanhh,
  },

})