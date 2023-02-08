import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'
import { useState } from 'react';
import { doc } from 'firebase/firestore';
import { StatusBar } from 'expo-status-bar';

const SearchChatCaNhan = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = (search) => {
        firebase.firestore().collection('accounts').where('userName', '>=', search).get().then((snapshot) => {
            const users = querySanp.docs.map(docSnap => docSnap.data())
            setUsers(users);
            console.log('hi', users);
        }
        )
    }
    const history = useHistory();
    const gotoAddChat = () => {
        history.push(`/addChat`);
    };
    const gotoBack = () => {
        history.goBack();
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style='dark'/>
            <View style={{
                height: 50,
                width: "100%",
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={gotoBack}>
                    <Feather name='chevron-left' size={24} color='black' />
                </TouchableOpacity>
                <View style={{
                    backgroundColor: '#E9E9E9',
                    height: 40,
                    width: '80%',
                    justifyContent: 'center',
                    marginHorizontal: 16,
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
                    <TextInput placeholder='Tìm kiếm tin nhắn'
                        placeholderTextColor={"#BFBFBF"}
                        style={{
                            width: "80%",
                            color: '#BFBFBF',
                            marginStart: 5,
                        }}
                        onChangeText={(search) => fetchUsers(search)}
                    ></TextInput>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SearchChatCaNhan

const styles = StyleSheet.create({
    iconSearch: {
        marginTop: 8,
        marginStart: 10,
    },

})