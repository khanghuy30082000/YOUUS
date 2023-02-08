import { FlatList, Image, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { AntDesign, Feather, Ionicons, Entypo, FontAwesome } from "@expo/vector-icons"
import { useFirestoreCollection, useFirestoreDocument } from '../hooks';
import { useHistory } from 'react-router-native';
import { auth, db } from '../../App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'
import { Avatar } from 'react-native-elements';
import { useLayoutEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient'
import BottomSheet from "react-native-easy-bottomsheet";
import { Alert } from 'react-native';
import { doc } from 'firebase/firestore';
// import { Permissions, Notifications } from 'expo';


// async componentDidMout() {
//     this.currentUser = await firebase.auth().currentUser
//     await this.registerForPushNotificationsAsync();
// }

const Xanhh = "#0176E4";
const Do = "#0176E4";
const Vang = "yellow"
const Hong = "#0176E4";
const Hongnhat = "#0176E4";
const Trang = "white";
const Xamchuot = "#E2E2E2";

const ChatOnetoOne = (props, { route }) => {

    const upLoad = async () => {

        const uri = image
        const childPath = `chatOne/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
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

    const [isFetching, setIsFetching] = useState(false);
    const [flatList, setFlatList] = useState(null)
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [roomHast, setRoomHast] = useState("");
    const [users, setUsers] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const user = firebase.auth().currentUser;
    const [isVisible, setVisible] = useState(false);
    const uid = props.location.state.uid
    console.log('uid', uid)
    const [image, setImage] = useState(null);
    const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
    const linkImage = "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
    console.log('docid', docid)
    const yasuo = props.location.state.avatar || linkImage
    const email = props.location.state.email
    console.log('email', email)
    const db = firebase.firestore();
    const history = useHistory();
    const nickname = props.location.state

    const getUser = useFirestoreDocument(
        firebase.firestore().collection('accounts').doc(user.uid),
        [uid]
    );
    // console.log('name', getUser)
    const gotoBack = () => {
        history.goBack();
    };
    const gotoInf = () => {
        history.push('/InfChatOne', { userName: props.location.state.userName, uid: props.location.state.uid, avatar: yasuo, email: props.location.state.email });
    };
    const call = () => {
        history.push('/CallOne', { userName: props.location.state.userName, uid: props.location.state.uid, avatar: yasuo });
    };
    const callVideo = () => {
        history.push('/CallVideoOne', { userName: props.location.state.userName, uid: props.location.state.uid, avatar: yasuo });
    };
    const showConfirmDialog = () => {
        return Alert.alert(
            "Hi cậu!!!",
            "Tính năng đang được anh Dev đẹp zai phát triển thêm, cậu vui lòng đợi tí nha ♥",
            [
                {
                    text: "Okeeee",
                }, {
                    text: "Đồng ý",
                },
            ]
        );
    };


    const nicknames = useFirestoreDocument(
        db.collection('chatrooms').doc(docid).collection("nickname").doc(user.uid),
        [user.uid]
    );
    console.log('nickname', nicknames)

    const sendMessenger = () => {
        Keyboard.dismiss();
        db.collection('chatrooms').doc(docid).collection("messages")
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                userName: getUser.data.userName,
                photoAvt: getUser.data.profilePicture || linkImage,
                email: auth.currentUser.email,
                sentBy: user.uid,
                sentTo: uid,
            })
        setInput('')
    };
    const saveImageData = (downloadURL) => {
        db.collection('chatrooms').doc(docid).collection("messages").add({
            downloadURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            email: auth.currentUser.email,
            userName: getUser.data.userName,
            photoAvt: getUser.data.profilePicture || linkImage
        }).then(
            setVisible(false)
        )
    }
    useLayoutEffect(() => {
        const unsubscribe = firebase.firestore().collection("chatrooms")
            .doc(docid)
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

    if (!getUser) {
        return null;
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


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                flex: 0.1,
                backgroundColor: Trang,
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
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%', height: "60%", paddingStart: 10, }}>
                    <Avatar
                        rounded
                        source={{
                            uri: yasuo
                        }}>
                    </Avatar>
                    <TouchableOpacity style={{ marginStart: 5, width: "85%" }} onPress={gotoInf}>
                        <Text style={styles.requestHeaderText}>
                            {props.location.state.userName}
                        </Text>
                        <Text style={{ paddingStart: 10, }}>Đang hoạt động</Text>

                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginHorizontal: '1%' }}>
                        <TouchableOpacity style={{ paddingEnd: 20, }} onPress={call}>
                            <Ionicons name="call" size={24} color={Xanhh} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingEnd: 20, }} onPress={callVideo}>
                            <FontAwesome name='video-camera' size={24} color={Xanhh} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={gotoInf}>
                            <Entypo name='dots-three-vertical' size={24} color={Xanhh} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15, }} style={{ flex: 0.8, backgroundColor: Xamchuot }}>
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    data.downloadURL ? (

                                        <TouchableOpacity style={{
                                            maxWidth: "80%", alignSelf: 'flex-end', height: 200, width: 200, marginEnd: 10, marginBottom: 6

                                        }}>
                                            <Image style={{ height: "100%", width: "100%", borderRadius: 10, }} source={{ uri: data.downloadURL }} />
                                        </TouchableOpacity>


                                    ) : (
                                        <LinearGradient colors={[Xanhh, Do, Hong, Hongnhat]} key={id} style={{
                                            maxWidth: "80%", alignSelf: 'flex-end',
                                            marginEnd: 10, marginBottom: 6, padding: 10, borderBottomLeftRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20,
                                        }}>
                                            <Text style={styles.recieverText}> {data.message}</Text>
                                        </LinearGradient>

                                    )

                                ) : (
                                    data.downloadURL ? (
                                        <View style={{
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

                                                <Image style={{ height: 200, width: 200, borderRadius: 10, marginTop: 3, marginBottom: 10, backgroundColor: Xamchuot }} source={{ uri: data.downloadURL }} />
                                            </TouchableOpacity>

                                        </View>
                                    ) : (
                                        <View style={{
                                            flexDirection: "row",
                                            maxWidth: '80%',
                                        }}>
                                            <View style={{
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
                                            </View>

                                            <LinearGradient colors={[Trang, Trang, Trang]} style={{
                                                maxWidth: "80%", backgroundColor: 'white', padding: 10, marginBottom: 7, borderBottomRightRadius: 20,
                                                borderTopLeftRadius: 20, borderTopRightRadius: 20, marginStart: 10, alignSelf: 'flex-start',
                                            }}>


                                                <Text style={{
                                                    fontSize: 14,
                                                    color: 'black'
                                                }}>
                                                    {data.message}
                                                </Text>

                                            </LinearGradient>
                                        </View>
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
                        < View style={styles.footer}>
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
                            }} onPress={showConfirmDialog}>
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
                                    backgroundColor: Xamchuot,
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
                                <Ionicons name='send' size={30} color={Xanhh} />
                            </TouchableOpacity>

                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatOnetoOne

const styles = StyleSheet.create({
    requestHeaderText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        paddingStart: 10,
        color: Xanhh,
    },
    image: {
        height: 70,
        width: 70
    },
    container: {
        flex: 1,
        backgroundColor: Xamchuot
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