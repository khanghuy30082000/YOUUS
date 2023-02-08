import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';

const People = () => {
    return (
        <View style={{
            marginHorizontal: 16,
            height: 80,
            width: "100%"
        }}>
            <View style={{
                height: "100%",
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity style={{
                    marginEnd: 16,
                }}>
                    <MaterialCommunityIcons
                        name='checkbox-blank-circle-outline'
                        size={24}
                        color='#BFBFBF'
                    />
                </TouchableOpacity>

                <Image
                    style={{
                        height: 48,
                        width: 48,
                        backgroundColor: 'red',
                        borderRadius: 40,
                        marginEnd: 16,
                    }}
                    source={{
                        uri: "https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                      }}
                />

                <Text style={{
                    color:'black',
                    fontSize: 14,
                    fontWeight:'bold'
                }}>Thanh Thang Pham</Text>
            </View>

        </View>
    )
}

export default People

const styles = StyleSheet.create({})