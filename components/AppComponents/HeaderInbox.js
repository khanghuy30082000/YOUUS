import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useHistory } from 'react-router-native';
import { auth, db } from '../../App';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const HeaderInbox = ({route}) => {

    return (
        <SafeAreaView>
            <View>
                <Avatar
                    rounded
                    source={{
                        uri:
                            "https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg",
                    }}>
                </Avatar>
                <Text style={{ color: "black", marginLeft: 10, fontWeight: "700" }}>
                    {chatName}
                </Text>

            </View>
        </SafeAreaView>
    )
}

export default HeaderInbox

const styles = StyleSheet.create({})