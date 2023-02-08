import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Feather, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useHistory } from 'react-router-native';

const SearchChatItem = () => {
    const history = useHistory();
    const gotoAddChat = () => {
        history.push(`/addChat`);
    };
    return (
        <View style={{
            height: 70,
            width: "100%",
            flexDirection: 'row',
            alignItems:'center'
        }}>
            <View style={{
                backgroundColor: '#E9E9E9',
                height: 40,
                width: '80%',
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
                <TextInput placeholder='Tìm kiếm người dùng'
                    placeholderTextColor={"#BFBFBF"}
                    style={{
                        width: "80%",
                        color: '#BFBFBF',
                    }}></TextInput>
            </View>
            <TouchableOpacity
                onPress={gotoAddChat}
                style={{
                    width: '10%',
                    height: 40,
                    justifyContent: 'center',
                    marginStart: 10,
                }}>
                <MaterialCommunityIcons name='account-multiple-plus-outline' size={34} color='#0176E4' />
            </TouchableOpacity>

        </View>
    )
}

export default SearchChatItem

const styles = StyleSheet.create({
    iconSearch: {
        marginTop: 8,
        start: -10
    },

})