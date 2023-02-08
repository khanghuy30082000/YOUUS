import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Switch, ScrollView, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-native';
import { AntDesign, Feather, Ionicons, Entypo, FontAwesome, SimpleLineIcons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useEffect } from 'react';
import { Avatar, ListItem } from 'react-native-elements'
import BottomSheet from "react-native-easy-bottomsheet";
// import { Switch } from "@rneui/themed";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'
import { StatusBar } from 'expo-status-bar';

const Member = () => {
    const [users, setUsers] = useState(null)
    const user = firebase.auth().currentUser;
    const [isVisible, setVisible] = useState(false);

    const getUsers = async () => {
        const querySanp = await firebase.firestore().collection('accounts').get()
        const allusers = querySanp.docs.map(docSnap => docSnap.data())
        setUsers(allusers)
    }
    useEffect(() => {
        getUsers()
    }, [])

    const history = useHistory();
    const gotoBack = () => {
        history.goBack();
    };

    const RenderCard = ({ item }) => {
        const showConfirmDialog = () => {
            return Alert.alert(
                "Bạn có chắc chắn",
                "Muốn mời người này ra khỏi nhóm không?",
                [
                    {
                        text: "Hủy",
                    }, {
                        text: "Có",
                    },
                ]
            );
        };
        return (
            <TouchableOpacity>
                <ListItem>
                    <Avatar
                        rounded
                        source={{
                            uri: item.profilePicture || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
                        }}
                    />
                    <View>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{ fontWeight: "800", width: "85%", fontSize: 14 }}>{item.userName}
                            </Text>
                            <TouchableOpacity onPress={() => {
                                setVisible(true);
                            }}>
                                <Entypo
                                    name='dots-three-horizontal'
                                    size={25}
                                    color='black'
                                    style={{}}
                                />
                            </TouchableOpacity>

                        </View>
                        <Text style={{ fontSize: 12, color: '#7F7F7F' }}>
                            {item.email}
                        </Text>
                    </View>
                </ListItem>
                <View style={styles.centeredView}>
                    <BottomSheet
                        bottomSheetTitle={item.userName}
                        bottomSheetTitleStyle={{ color: '#0176E4', fontSize: 20, height: 30 }}
                        setBottomSheetVisible={setVisible}
                        bottomSheetVisible={isVisible}>
                        <ScrollView>
                            <TouchableOpacity>
                                <View style={styles.viewOption}>
                                    <Text style={styles.txtBlue}>
                                        Kết bạn
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.viewOption}>
                                    <Text style={styles.txtBlue}>
                                        Xem trang cá nhân
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.viewOption}>
                                    <Text style={styles.txtBlue}>
                                        Chặn người dùng
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showConfirmDialog}>
                                <View style={styles.viewOption}>
                                    <Text style={styles.txtRed}>
                                        Mời rời khỏi nhóm
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </BottomSheet>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
            {/* <StatusBar style='dark'/> */}
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
                        Thành viên
                    </Text>
                </View>
                <AntDesign
                    name='adduser'
                    size={25}
                    color='#0176E4'
                    style={{ marginStart: 5 }}
                />
            </View>
            <View style={styles.viewSearch}>
                <View style={{
                    height: 70,
                    width: "100%",
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: '#E9E9E9',
                        height: 40,
                        width: '90%',
                        justifyContent: 'center',
                        marginStart: 16,
                        borderRadius: 20,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity>
                            <AntDesign
                                name='search1'
                                size={24}
                                color='#BFBFBF'
                                style={styles.iconSearch}
                            />
                        </TouchableOpacity>
                        <TextInput placeholder='Tìm kiếm thành viên trong nhóm'
                            placeholderTextColor={"#BFBFBF"}
                            style={{
                                width: "80%",
                                color: '#BFBFBF',
                            }}></TextInput>
                    </View>


                </View>
                <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 14, color: '#7F7F7F', textAlign: 'center' }}>
                        Tổng thành viên: {12}
                    </Text>
                </View>
            </View>
            <FlatList
                data={users}
                renderItem={({ item }) => { return <RenderCard item={item} /> }}
                keyExtractor={(item) => item.email}
            />

        </SafeAreaView>
    )
}

export default Member

const styles = StyleSheet.create({
    header: {
        height: 40,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    viewSearch: {
        height: 96,
        width: "100%",
        backgroundColor: 'white',
        marginTop: 1,
    },
    iconSearch: {
        marginTop: 8,
        start: -10
    },
    viewOption: {
        height: 70,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtBlue: {
        fontSize: 20,
        paddingStart: 8,
        color: '#black'
    },
    txtRed: {
        fontSize: 20,
        color: 'red'
    }
})