import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, Feather, Ionicons, Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements';
import { useHistory } from 'react-router-native';

import firebase from 'firebase/compat/app';
import * as Animatable from 'react-native-animatable';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { useFirestoreCollection, useFirestoreDocument } from '../hooks';


const InfoGroupChat = (props) => {
    console.log("chat : ", props)

    const history = useHistory();
    const gotoBack = () => {
        history.goBack();
    };
    // const getChatNa = useFirestoreDocument(
    //     db.collection('chats').doc(chatNa),
    //     [chatNa]
    //   );
    //   if (!getChatNa) {
    //     return null;
    //   }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#E2E2E2'
        }}>
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
            <View style={styles.viewBg}>
                <Image style={styles.imgBg}
                    source={{
                        uri: props.location.state.avatar
                    }}
                />
            </View>
            <View style={styles.viewInformation}>
                <View style={styles.viewAvt}>
                    <Avatar
                        rounded
                        size={96}
                        source={{
                            uri: props.location.state.avatar
                        }}>
                    </Avatar>
                </View>

                <Text style={styles.nameGr}>
                    {props.location.state.nameChat}
                </Text>
                <View style={styles.viewOption}>
                    <View style={styles.viewDetailOption}>
                        <TouchableOpacity style={styles.viewIcon}>
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
            <Animatable.View animation="slideInUp" delay={200}>
            <View style={styles.viewDetail}>
                <TouchableOpacity style={styles.viewRename}>
                    <SimpleLineIcons
                        name='pencil'
                        size={24}
                        color='black'
                        style={{ alignSelf: 'center', paddingTop: 10 }}
                    />
                    <Text style={styles.txtDetail}>Đổi tên nhóm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewRename}>
                    <Feather
                        name='users'
                        size={24}
                        color='black'
                        style={{ alignSelf: 'center', paddingTop: 10 }}
                    />
                    <Text style={styles.txtDetail}>Xem thành viên</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewRename}>
                    <Feather
                        name='image'
                        size={24}
                        color='black'
                        style={{ alignSelf: 'center', paddingTop: 10 }}
                    />
                    <Text style={styles.txtDetail}>Ảnh, file, link đã chia sẻ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewRename}>
                    <AntDesign
                        name='pushpino'
                        size={24}
                        color='black'
                        style={{ alignSelf: 'center', paddingTop: 10 }}
                    />
                    <Text style={styles.txtDetail}>Ẩn/hiện tin đã ghim</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewDetailBottom}>
                <TouchableOpacity style={styles.viewRename}>
                    <AntDesign
                        name='warning'
                        size={24}
                        color='black'
                        style={{ alignSelf: 'center', paddingTop: 10 }}
                    />
                    <Text style={styles.txtDetail}>Báo cáo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewRename}>
                    <AntDesign
                        name='logout'
                        size={24}
                        color='red'
                        style={{ alignSelf: 'center', paddingTop: 10 }}
                    />
                    <Text style={styles.txtDetailRed}>Rời nhóm chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewRename}>
                    <Feather
                        name='trash-2'
                        size={24}
                        color='red'
                        style={{ alignSelf: 'center', paddingTop: 10 }}
                    />
                    <Text style={styles.txtDetailRed}>Xoá cuộc trò chuyện</Text>
                </TouchableOpacity>
            </View>
            </Animatable.View>

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
    },
    imgBg: {
        height: "100%",
        width: '100%'
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
        height: 205,
        width: "100%",
        top: -155,
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
    }
})