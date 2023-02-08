import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AntDesign, Icon, Feather, Ionicons, Entypo } from "react-native-vector-icons"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore'
import { Avatar, ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';

const ItemChonNguoi = () => {
    const [users, setUsers] = useState(null)
    const user = firebase.auth().currentUser;
    // const uid = props.location.state.uid
    const getUsers = async () => {
        const querySanp = await firebase.firestore().collection('accounts').where('uid', '!=', user.uid).get()
        const allusers = querySanp.docs.map(docSnap => docSnap.data())
        setUsers(allusers)
    }

    useEffect(() => {
        getUsers()
    }, [])
    const RenderCard = ({ item }) => {
        return (
            <Animatable.View animation="fadeInUp" delay={100}>
                <TouchableOpacity>
                <ListItem>
                <ListItem.CheckBox >
                </ListItem.CheckBox>
                    <Avatar
                        rounded
                        source={{
                            uri: item.profilePicture || "https://gamek.mediacdn.vn/133514250583805952/2021/9/26/photo-1-1632639337166965564522.jpg"
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title
                            style={{ fontWeight: "800" }}>{item.userName}
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>
            </Animatable.View>
            
        )


    }
    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => { return <RenderCard item={item} /> }}
                keyExtractor={(item) => item.email}
            />

        </View>
    )
}

export default ItemChonNguoi

const styles = StyleSheet.create({})