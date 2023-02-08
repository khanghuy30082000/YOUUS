import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-native';
import { PageHeadersIb } from '../AppComponents/PageHeadersIb';
import { Tab } from './Tab';
import SearchChatItem from '../AppComponents/SearchChatItem';
import { Avatar, ListItem } from 'react-native-elements'
import CustomListItem from '../../components/AppComponents/CustomListItem'
import { Feather } from '@expo/vector-icons';
import {  db } from '../../App';
import { Footer } from '../Wall/Footer';
// import { StatusBar } from 'expo-status-bar';
const TabNhom = () => {
    const [chats, setChats] = useState([]);
    const history = useHistory();
    useEffect(() => {
        const unsubcribe = db.collection('chatgroup').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        return unsubcribe;
    }, [])
    const enterChat = (id, chatName) => {
        history.push('Chat', {
            id,
            chatName,
        })
    }
    const goBack = () => {
        history.goBack();
    };
    const gotoChat = () => {
        history.push('/chats');
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
           <StatusBar barStyle='dark-content' backgroundColor="white"/>
            <View style={styles.viewHeader}>
                <TouchableOpacity style={{ width: "5%", marginStart: 16 }} onPress={goBack}>
                    <Feather name='chevron-left' size={24} color='black' />
                </TouchableOpacity>
                <View style={{
                    width: "85%",
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 18, color: '#0176E4', fontWeight: 'bold' }}>Tin nhắn</Text>
                </View>
            </View>
            <View style={{
                height: 50,
                width: '100%',
                backgroundColor: 'white',
                flexDirection: 'row',
            }}>
                <TouchableOpacity style={{
                    height: 50,
                    width: "50%",
                    alignItems: 'center',
                    justifyContent: "center",
                }}
                    onPress={gotoChat}>
                    <Text style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: 'bold'
                    }}>
                        Cá nhân
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    height: 50,
                    width: "50%",
                    alignItems: 'center',
                    justifyContent: "center",
                    borderBottomWidth: 1.5,
                    borderBottomColor: "#0176E4"
                }} >
                    <Text style={{
                        fontSize: 16,
                        color: '#0176E4',
                        fontWeight: 'bold'
                    }}>
                        Nhóm
                    </Text>
                </TouchableOpacity>
            </View>
            {/* <Tab /> */}
            <SearchChatItem />
            <ScrollView style={{ flex: 0.8, }}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem
                        key={id}
                        id={id}
                        chatName={chatName}
                        enterChat={enterChat}
                    />
                ))}
            </ScrollView>
            <View style={{ bottom: 0, position: 'absolute', flex: 1, alignSelf: 'center', width: '100%', justifyContent: 'center', }} ><Footer /></View>
        </SafeAreaView>
    )
}
export default TabNhom
const styles = StyleSheet.create({
    viewHeader: {
        height: 40,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
})