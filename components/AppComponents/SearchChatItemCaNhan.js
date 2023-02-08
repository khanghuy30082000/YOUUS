import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
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
import { useFirestoreCollection, useFirestoreDocument } from '../hooks';

const Xanh = '#0176E4'
const den = 'black'

const SearchChatCaNhan = (props) => {
    const user = firebase.auth().currentUser;
    console.log('------------------------------------------------')
    const history = useHistory();
    const gotoBack = () => {
        history.goBack();
    };
    return (
        <View style={{
            height: 50,
            width: "100%",
            flexDirection: 'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'white'
        }}>
            <View style={{
                backgroundColor: '#E9E9E9',
                height: 40,
                width: '90%',
                justifyContent: 'center',
                marginHorizontal: 16,
                borderRadius: 20,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <TouchableOpacity>
                    <AntDesign
                        name='search1'
                        size={24}
                        color='#BFBFBF'
                        style={styles.iconSearch}
                    />
                </TouchableOpacity>
                <TextInput placeholder='Tìm kiếm người dùng'
                    placeholderTextColor={"#BFBFBF"}
                    style={{
                        width: "80%",
                        color: '#BFBFBF',
                    }}></TextInput>
            </View>
            
        </View>
    )
}

export default SearchChatCaNhan

const styles = StyleSheet.create({
    iconSearch: {
        marginTop: 8,
        start: -10
    },

})