import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { AntDesign, Icon, Feather, Ionicons, Entypo } from "react-native-vector-icons"
import { useHistory } from 'react-router-native';
import { db } from '../../App'
import SearchChatItemCaNhan from '../AppComponents/SearchChatItemCaNhan';
import ItemChonNguoi from '../AppComponents/ItemChonNguoi';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const AddChat = ({ navigation }) => {
    const [input, setInput] = useState("");
    const [image, setImage] = useState(null);
    const history = useHistory();
    const gotoBack = () => {
        history.goBack();
    };


    const upLoad = async () => {
        const uri = image
        const childPath = `avtGrchat/${Math.random().toString(36)}`;
        console.log(childPath)
        const response = await fetch(uri);
        const blob = await response.blob();
        const task = firebase.storage().ref().child(childPath).put(blob);
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                saveImageData(snapshot);
                console.log('hi', snapshot)
                // createChat(true)
            })
        }
        const taskError = snapshot => {
            console.log(snapshot)
        }
        const cancel = () => {
            setModalVisible2(false)
        }
        task.on("state_change", taskProgress, taskError, taskCompleted, cancel);


    }
    const createChat = async () => {
        await db.collection('chatgroup').add({
            chatName: input,
            avt: snapshot
        }).then(() => {
            history.goBack();
        })
            .catch((error) => alert(error));
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }

    };
    const saveImageData = (downloadURL) => {
        db.collection('chatgroup').add({
            chatName: input,
            avt: downloadURL || "https://photo-baomoi.bmcdn.me/w700_r1/2019_10_21_180_32646649/91c7a93c0d7ce422bd6d.jpg",
        }).then(() => {
            history.goBack();
        })
            .catch((error) => alert(error));
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 16,
                height: 40,
                alignItems: 'center'
            }}>
                <TouchableOpacity>
                    <Feather
                        onPress={gotoBack}
                        name='chevron-left'
                        size={25}
                        color='black'
                    />
                </TouchableOpacity>
                <Text style={{
                    alignSelf: 'center',
                    color: "#0176E4",
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>
                    Tạo nhóm mới
                </Text>
                <TouchableOpacity disabled={!input} onPress={upLoad}>
                    <Ionicons name='md-add-circle-outline' size={34} color='#004DE3' />
                </TouchableOpacity>
            </View>
            <View style={{
                marginTop: 10,
                flexDirection: 'row',
                height: 80,
                width: '100%',
            }}>
                <TouchableOpacity style={{
                    height: 48,
                    width: 48,
                    borderRadius: 40,
                    backgroundColor: '#0176E4',
                    marginStart: 16,
                    alignSelf: 'center'
                }} onPress={pickImage}>
                    {image && <Image source={{ uri: image }} style={{ height: 48, width: 48, borderRadius: 40 }} />}
                    <Entypo
                        name='camera'
                        size={25}
                        color="white"
                        style={{
                            alignSelf: 'center',
                            paddingTop: 10,
                        }}
                    />
                </TouchableOpacity>
                <View style={{
                    height: 40,
                    width: "75%",
                    alignSelf: 'center',
                    marginStart: 10,
                    justifyContent: 'center'
                }}>
                    <TextInput
                        placeholder='Tên nhóm mới'
                        placeholderTextColor={'#7F7F7F'}
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        onSubmitEditing={createChat}
                        style={{
                            fontSize: 18,
                        }}
                    />
                </View>

            </View>
            <SearchChatItemCaNhan />
            <ItemChonNguoi />

        </SafeAreaView>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
    },
})