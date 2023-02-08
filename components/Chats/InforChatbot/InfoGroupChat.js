import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Alert } from 'react-native'
import { AntDesign, Feather, Ionicons, Entypo, FontAwesome, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons"
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements';
import { useHistory } from 'react-router-native';
import { auth, db } from '../../../App';
import firebase from 'firebase/compat/app';
import * as Animatable from 'react-native-animatable';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { useFirestoreCollection, useFirestoreDocument } from '../../hooks';
import { StatusBar } from 'expo-status-bar';
import BottomSheet from "react-native-easy-bottomsheet";
import * as ImagePicker from 'expo-image-picker';
import Vote from '../VoteGroupChat/Vote';


const InfoGroupChat = (props, id) => {
    const [userName, setUserName] = useState('');
    const [reports, setReports] = useState('');
    const chatID = props.location.state.chatID;
    const [image, setImage] = useState(null);
    const [isVisible, setVisible] = useState(false);
    const [isVisible1, setVisible1] = useState(false);
    // const chatIDName = props.chatName;
    // console.log('idchat', chatIDName)
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    // console.log("chat : ", props)
    const history = useHistory();
    const idd = props.location.state.chatID
    console.log('id', chatID)

    const upLoad = async () => {
        const uri = image
        const childPath = `avtGrchat/${Math.random().toString(36)}`;
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
                console.log('link anh ', snapshot)
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
    const saveImageData = (downloadURL) => {
        db.collection('chatgroup').doc(props.location.state.chatID)
            .update({
                avt: downloadURL || "https://photo-baomoi.bmcdn.me/w700_r1/2019_10_21_180_32646649/91c7a93c0d7ce422bd6d.jpg",
            }).then(() => {
                history.goBack();
            })
            .catch((error) => alert(error));
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }

    };

    const report = () => {
        firebase.firestore().collection('chatgroup').doc(chatID).collection('report').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            report: reports,
            email: auth.currentUser.email,
            nameChat: props.location.state.nameChat
        }).then(() => {
            rpdone();
        })
    };
    const rpdone = () => {
        setReports('')
        setModalVisible1(false)
        Alert.alert(
            'Cảm ơn bạn đã góp ý',
            'Chúng tôi đã nhận thông tin và sẽ khắc phục vấn đề này!!!'
        )
    }

    const renameGr = () => {
        firebase.firestore().collection('chatgroup').doc(props.location.state.chatID)
            .update({
                chatName: userName,
            })
            .then(() => {
                renameDone();
            })
    }
    const delteteChatGr = () => {
        firebase.firestore().collection('chatgroup').doc(props.location.state.chatID)
            .delete().then(() => {
                history.push('/TabNhom');
            }
            )
    }

    const renameGroup = (inputText) => {
        setUserName(inputText);
    };
    const gotoBack = () => {
        history.goBack();
    };
    const goTo = () => {
        setModalVisible2(true)
    };
    const gotoReports = () => {
        setModalVisible1(true)
    };
    const ok = () => {
        setModalVisible(true)
    };
    const huy = () => {
        setModalVisible(false)
    }
    const cancelRp = () => {
        setModalVisible1(false)
    }
    const renameDone = () => {
        setModalVisible2(false)
        // history.push('/media')
        // history.goBack();
    }
    const gotoMemmber = () => {
        history.push(`/MemmberGroupChat`)
        // delteteChatGr(true);
    }
    const gotoVote = () => {
        history.push('/Vote', {chatID: props.location.state.chatID, nameChat: props.location.state.nameChat})
    }
    const file = () => {
        history.push('/AnhChatGroup', {idchat: props.location.state.chatID})
    }
    const searchCaNhan = () => {
        history.push('/searchCaNhan');
    }
    // const gotoReport = () => {
    //     history.push('/RpNhom');
    // }
    const showOutGr = () => {
        return Alert.alert(
            "Bạn có chắc chắn",
            "Muốn thoát khỏi nhóm này không?",
            [
                {
                    text: "Hủy",
                }, {
                    text: "Có",
                },
            ]
        );
    };
    const showRemoveGr = () => {
        return Alert.alert(
            "Bạn có chắc chắn",
            "Muốn xoá nhóm này không?",
            [
                {
                    text: "Hủy",
                }, {
                    text: "Có",

                },
            ]
        );
    };
    const getUserGroup = useFirestoreDocument(
        db.collection('chatgroup').doc(chatID),
        [chatID]
    );
    // console.log('lay user', getUserGroup)
    if (!getUserGroup) {
        return null;
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={styles.centeredView}>
                <BottomSheet
                    bottomSheetTitle={"Hình ảnh đoạn chat"}
                    bottomSheetTitleStyle={{ color: '#0176E4', fontSize: 20, height: 30, marginStart: 95 }}
                    setBottomSheetVisible={setVisible}
                    bottomSheetVisible={isVisible}>
                    <ScrollView style={{
                        paddingBottom: 30,
                    }}>
                        <TouchableOpacity style={{
                            height: 300,
                            width: 300,
                            alignSelf: 'center',
                            marginTop: 20,
                            marginBottom: 20,
                        }}>
                            {
                                image ? (
                                    <Image source={{ uri: image }} style={{ height: "100%", width: "100%", borderRadius: 150 }} />
                                ) : (
                                    <Image
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 150,
                                        }}
                                        source={{
                                            uri: props.location.state.avatar
                                        }}
                                    />
                                )
                            }


                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            borderWidth: 1,
                            borderColor: '#0176E4',
                            height: 50,
                            width: "70%",
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 10,
                        }} onPress={pickImage}>
                            <Text style={{
                                color: '#0176E4',
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>
                                Thay đổi ảnh
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#0176E4',
                            height: 50,
                            width: "70%",
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                        }} onPress={upLoad}>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>
                                Cập nhật
                            </Text>
                        </TouchableOpacity>

                    </ScrollView>
                </BottomSheet>
            </View>
            <Animatable.View animation="lightSpeedIn" delay={200}>
                <View style={styles.viewHeader}>
                    <Feather
                        onPress={gotoBack}
                        name='chevron-left'
                        size={25}
                        color='black'
                        style={{ marginStart: 5, flex: 0.5 }}
                    />
                    <Text style={styles.textHeader}>Tuỳ chỉnh Chat</Text>
                </View>

                <ScrollView style={{ backgroundColor: '#E2E2E2' }}>

                    <View style={styles.viewBg} >
                        <Image style={styles.imgBg}
                            source={{
                                uri: props.location.state.avatar
                            }}
                        />

                    </View>
                    <View style={styles.viewInformation}>
                        <TouchableOpacity style={styles.viewAvt} onPress={() => {
                            setVisible(true);
                        }}>
                            <View style={{
                                height: 120,
                                width: 120,
                                backgroundColor: 'blue',
                                borderRadius: 70
                            }} >
                                <Image source={{
                                    uri: props.location.state.avatar
                                }} style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 70
                                }} />
                            </View>

                        </TouchableOpacity>

                        <Text style={styles.nameGr}>
                            {props.location.state.nameChat}
                        </Text>
                        <View style={styles.viewOption}>
                            <View style={styles.viewDetailOption}>
                                <TouchableOpacity style={styles.viewIcon} onPress={searchCaNhan}>
                                    <AntDesign
                                        name='search1'
                                        size={24}
                                        color='white'
                                        style={{ alignSelf: 'center', paddingTop: 10 }}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.txtDetailOption}>Tìm tin nhắn</Text>

                            </View>
                            <View style={styles.viewDetailOption}>
                                <TouchableOpacity style={styles.viewIcon}>
                                    <AntDesign
                                        name='adduser'
                                        size={24}
                                        color='white'
                                        style={{ alignSelf: 'center', paddingTop: 10 }}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.txtDetailOption}>Mời thành viên</Text>

                            </View>
                            <View style={styles.viewDetailOption}>
                                <TouchableOpacity style={styles.viewIcon}>
                                    <Feather
                                        name='bell'
                                        size={24}
                                        color='white'
                                        style={{ alignSelf: 'center', paddingTop: 10 }}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.txtDetailOption}>Tắt thông báo</Text>

                            </View>

                        </View>
                    </View>
                    <View style={{ top: -155 }}>
                        <View style={{
                            backgroundColor: 'white',
                            width: '100%',
                            height: 340,
                            borderRadius: 20,
                        }}>
                            <View style={{
                                marginStart: 16,

                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    height: 56,
                                    width: "90%",
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                }} onPress={goTo}>
                                    <SimpleLineIcons
                                        name='pencil'
                                        size={24}
                                        color='black'
                                        style={{ alignSelf: 'center', paddingTop: 10 }}
                                    />
                                    <Text style={styles.txtDetail}>
                                        Đổi tên nhóm
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                marginStart: 16,
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    width: "90%",
                                    height: 56,
                                    backgroundColor: 'white',
                                    alignItems: 'center'
                                }} onPress={() => {
                                    setVisible(true);
                                }}>
                                    <Entypo
                                        name='images'
                                        size={24}
                                        color='black'
                                        style={{ alignSelf: 'center', paddingTop: 10 }}
                                    />
                                    <Text style={styles.txtDetail}>
                                        Thay đổi ảnh nhóm
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                marginStart: 16,
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    width: "90%",
                                    height: 56,
                                    backgroundColor: 'white',
                                    alignItems: 'center'
                                }} onPress={gotoMemmber}>
                                    <Feather
                                        name='users'
                                        size={24}
                                        color='black'
                                        style={{ alignSelf: 'center', paddingTop: 10 }}
                                    />
                                    <Text style={styles.txtDetail}>
                                        Xem thành viên
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                marginStart: 16,
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    width: "90%",
                                    height: 56,
                                    backgroundColor: 'white',
                                    alignItems: 'center'
                                }} onPress={file}>
                                    <Feather
                                        name='image'
                                        size={24}
                                        color='black'
                                        style={{ alignSelf: 'center', paddingTop: 10 }}
                                    />
                                    <Text style={styles.txtDetail}>
                                        Ảnh, file, link đã chia sẻ
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                marginStart: 16,
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    height: 56,
                                    width: "90%",
                                    backgroundColor: 'white',
                                    alignItems: 'center'
                                }} onPress={gotoVote}>
                                    <MaterialIcons
                                        name='how-to-vote'
                                        size={24}
                                        color='black'
                                        style={{ alignSelf: 'center' }}
                                    />
                                    <Text style={styles.txtDetail}>
                                        Tạo bình chọn
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                marginStart: 16,
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    width: "90%",
                                    height: 56,
                                    backgroundColor: 'white',
                                    alignItems: 'center'
                                }}>
                                    <AntDesign
                                        name='pushpino'
                                        size={24}
                                        color='black'
                                        style={{ alignSelf: 'center', paddingTop: 10 }}
                                    />
                                    <Text style={styles.txtDetail}>
                                        Ẩn hiện tin đã ghim
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{
                            height: 168,
                            width: "100%",
                            backgroundColor: 'white',
                            borderRadius: 20,
                            marginTop: 10,
                        }}>
                            <View style={{
                                marginStart: 16,
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    height: 56,
                                    width: "90%",
                                    backgroundColor: 'white',
                                    alignItems: 'center'
                                }} onPress={gotoReports}>
                                    <AntDesign
                                        name='warning'
                                        size={24}
                                        color='black'
                                        style={{ alignSelf: 'center' }}
                                    />
                                    <Text style={styles.txtDetail}>Báo cáo</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                marginStart: 16,
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    height: 56,
                                    width: "90%",
                                    backgroundColor: 'white',
                                    alignItems: 'center'
                                }} onPress={showOutGr}>
                                    <AntDesign
                                        name='logout'
                                        size={24}
                                        color='red'
                                        style={{ alignSelf: 'center' }}
                                    />
                                    <Text style={styles.txtDetailRed}>Rời nhóm chat</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                marginStart: 16,
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    height: 56,
                                    width: "90%",
                                    backgroundColor: 'white',
                                    alignItems: 'center'
                                }} onPress={ok}>
                                    <Feather
                                        name='trash-2'
                                        size={24}
                                        color='red'
                                        style={{ alignSelf: 'center' }}
                                    />
                                    <Text style={styles.txtDetailRed}>Xoá cuộc trò chuyện</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
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
                                            Đổi tên nhóm
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
                                        <TextInput placeholder={props.location.state.nameChat}
                                            placeholderTextColor={"#7F7F7F"}
                                            inputText={props.location.state.nameChat}
                                            onChangeText={renameGroup}
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
                                                <Text style={styles.txtButtonRename}>Huỷ</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.viewButonDone}>
                                            <TouchableOpacity onPress={renameGr}>
                                                <Text style={styles.txtButtonRename} >Hoàn tất</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                            </Animatable.View>
                        </Modal>
                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Animatable.View style={styles.viewModalRemove}
                                animation="zoomIn" duration={500}
                            >
                                <View style={{}}>
                                    <View style={{ marginTop: 20, }}>
                                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '400', textAlign: 'center', marginHorizontal: 20 }}>
                                            Bạn có đồng ý xoá cuộc trò chuyện này không?
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        paddingHorizontal: 20,
                                    }}>
                                        <View style={styles.viewButtonXoa} >
                                            <TouchableOpacity onPress={huy}>
                                                <Text style={styles.txtButtonRemove}>Không</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.viewButonDone}>
                                            <TouchableOpacity onPress={delteteChatGr}>
                                                <Text style={styles.txtButtonRename} >Đồng ý</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                            </Animatable.View>
                        </Modal>
                        <Modal
                            transparent={true}
                            visible={modalVisible1}
                            onRequestClose={() => {
                                setModalVisible1(!modalVisible1);
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
                                            Huỷ
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.textHeader}>Có vấn đề gì vậy?</Text>

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
                                            Hãy cho chúng tôi biết chuyện gì đang xảy ra
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#7F7F7F',
                                            marginTop: 2
                                        }}>
                                            Dựa trên ý kiến đóng góp của bạn, chúng tôi sẽ phát hiện được nếu có gì đó không ổn.
                                        </Text>
                                    </View>
                                    <View style={{
                                        height: 100,
                                        width: "100%",
                                        marginTop: 20,
                                        borderRadius: 30,
                                    }}>
                                        <TextInput
                                            placeholder='Vui lòng nhập vấn đề bạn đang gặp phải...'
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
                                            Nếu bạn thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy báo ngay cho dịch vụ khẩn cấp tại địa phương
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
                                            Gửi
                                        </Text>

                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>
                        </Modal>
                    </View>

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
    viewHeader1: {
        backgroundColor: 'white',
        height: 44,
        width: "90%",
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
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
    },
    imgBg: {
        height: "100%",
        width: '100%'
    },
    viewInformation: {
        // height: 248,
        width: 309,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        top: -170,
    },
    viewAvt: {
        alignSelf: 'center',
        marginTop: 16,
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
        height: 350,
        width: "100%",
        borderRadius: 20,
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
    viewModalRp: {
        height: "100%",
        width: "100%",
        backgroundColor: 'white',
        alignSelf: 'center',
        top: "20%",
        borderRadius: 30,
        borderWidth: 1
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
    txtButtonRename: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    txtButtonRemove: {
        color: '#0176E4',
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
    viewButonDone: {
        height: 42,
        width: 90,
        backgroundColor: '#0176E4',
        marginTop: 16,
        borderRadius: 20,
        justifyContent: 'center'
    },

})