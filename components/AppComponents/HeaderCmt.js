import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, Feather, Ionicons, Entypo } from "@expo/vector-icons";
import { useHistory } from 'react-router-native';

const HeaderCmt = () => {
    const history = useHistory();

    const gotoBack = () => {
        history.goBack();
    };

    return (
        <SafeAreaView >
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginStart: 16  }}>
                <Feather
                    onPress={gotoBack}
                    name='chevron-left'
                    size={25}
                    color='black'
                />
                <Text style={{ fontSize: 18, color: '#0176E4', fontWeight:'bold', marginStart: 16, }}>Quay lại</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HeaderCmt

const styles = StyleSheet.create({})