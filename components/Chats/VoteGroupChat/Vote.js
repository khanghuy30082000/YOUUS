import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Switch } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { AntDesign, Feather, Ionicons, Entypo, FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import { useHistory } from 'react-router-native';
import firebase from 'firebase/compat/app';
import { auth, db } from '../../../App';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'

const Vote = (props) => {

    const nameChat = props.location.state.nameChat
    console.log('nameChat', nameChat)

    const chatID = props.location.state.chatID
    console.log('chatID', chatID)

    const [checked, setChecked] = useState(true);
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [votes, setVotes] = useState('');
    const [idea1, setIdear1] = useState('');
    const [idea2, setIdear2] = useState('');
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const toggleSwitch = () => {
        setChecked(!checked);
    };

    const DateTime = () => {
        showMode('date')
        // showTime(true)
    }
    const showTime = () => {
        showMode('time')
    }
    const history = useHistory();
    const gotoBack = () => {
        history.goBack();
    };
    const done = () => {
        history.push('/chats')
    }
    const vote = () => {
        firebase.firestore().collection('chatgroup').doc(chatID).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            votes: votes,
            email: auth.currentUser.email,
            idea1: idea1,
            idea2: idea2,
        }).then(() => {
            voteDone();
        })
    };
    const voteDone = () => {
        history.goBack();
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <StatusBar style='dark' /> */}
            <View style={styles.header}>
                <Feather
                    onPress={gotoBack}
                    name='chevron-left'
                    size={25}
                    color='black'
                    style={{ marginStart: 5 }}
                />
                <View>
                    <Text style={{ color: '#0176E4', fontSize: 18, fontWeight: 'bold' }}>
                        Tạo bình chọn
                    </Text>
                </View>
                <TouchableOpacity onPress={vote}>
                    <FontAwesome
                        name='check-circle'
                        size={26}
                        color='#0176E4'
                    // style={{ marginStart: 5 }}
                    />
                </TouchableOpacity>

            </View>
            <ScrollView style={{
                backgroundColor: '#E2E2E2',

            }}>
                <View style={styles.container}>
                    <View style={styles.viewBg}>
                        <Text style={styles.textOption}>
                            Câu hỏi bình chọn
                        </Text>
                        <TextInput
                            placeholder='Viết câu hỏi bình chọn...'
                            placeholderTextColor={"#7F7F7F"}
                            value={votes}
                            onChangeText={(text) => setVotes(text)}
                            onSubmitEditing={vote}
                            style={{
                                height: 40,
                                backgroundColor: 'white',
                                width: "100%",
                                marginBottom: 16
                            }}
                        />
                    </View>
                    <View style={styles.viewBg}>
                        <Text style={styles.textOption}>
                            Bình chọn 1
                        </Text>
                        <View style={styles.viewOption}>
                            <TextInput
                                placeholder='Nhập bình chọn...'
                                placeholderTextColor={"#7F7F7F"}
                                value={idea1}
                                onChangeText={(text) => setIdear1(text)}
                                onSubmitEditing={vote}
                                style={{
                                    height: 40,
                                    borderBottomWidth: 0.5,
                                    width: "90%"
                                }}
                            />
                            <AntDesign
                                name='close'
                                size={25}
                                color='black'
                                style={{
                                    marginTop: 5,
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.viewBg}>
                        <Text style={styles.textOption}>
                            Bình chọn 2
                        </Text>
                        <View style={styles.viewOption}>
                            <TextInput
                                placeholder='Nhập bình chọn...'
                                placeholderTextColor={"#7F7F7F"}
                                value={idea2}
                                onChangeText={(text) => setIdear2(text)}
                                onSubmitEditing={vote}
                                style={{
                                    height: 40,
                                    borderBottomWidth: 0.5,
                                    width: "90%"
                                }}
                            />
                            <AntDesign
                                name='close'
                                size={25}
                                color='black'
                                style={{
                                    marginTop: 5,
                                }}
                            />
                        </View>
                    </View>
                    <View style={{
                        height: 50,
                        width: "90%",
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}>
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                color: '#0176E4',
                                fontSize: 14,
                            }}>
                                Thêm bình chọn
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={styles.container}>
                    <View style={styles.viewDetails}>
                        <Text style={styles.txt}>
                            Ghim tin nhắn
                        </Text>
                        <Switch
                            value={checked}
                            onValueChange={(toggleSwitch) => setChecked(toggleSwitch)}
                        />
                    </View>
                    <View style={styles.viewDetails}>
                        <Text style={styles.txt}>
                            Có thể thêm phương án
                        </Text>
                        <Switch
                            value={checked1}
                            onValueChange={(toggleSwitch) => setChecked1(toggleSwitch)}
                        />
                    </View>
                    <View style={styles.viewDetails}>
                        <Text style={styles.txt}>
                            Chọn nhiều phương án
                        </Text>
                        <Switch
                            value={checked2}
                            onValueChange={(toggleSwitch) => setChecked2(toggleSwitch)}
                        />
                    </View>
                    <View style={styles.viewDetails}>
                        <TouchableOpacity>
                            <Text style={styles.txt}>
                                Đặt thời hạn bình chọn
                            </Text>
                            <Text style={{ color: '#7F7F7F', marginTop: 2 }}>
                                Ngày 10 Tháng 10 lúc 16:20
                            </Text>
                        </TouchableOpacity>

                        <Switch
                            value={checked3}
                            onValueChange={(toggleSwitch) => setChecked3(toggleSwitch)}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Vote

const styles = StyleSheet.create({
    header: {
        height: 40,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    viewBg: {
        height: 66,
        width: "90%",
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 16,
    },
    container: {
        // height: "100%",
        width: "100%",
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 20,
        paddingBottom: 10,
    },
    textOption: {
        fontSize: 14,
        color: '#7F7F7F',
        fontWeight: 'bold'
    },
    viewOption: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        width: "100%",
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    viewDetails: {
        height: 58,
        width: "90%",
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txt: {
        fontSize: 14,
        color: 'black',
    },
})