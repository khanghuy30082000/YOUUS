import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Camera } from 'expo-camera'
import { useHistory } from 'react-router-native';
import { Button } from 'react-native';
import { AntDesign, Feather, Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native';

const CallVideo = (props) => {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const history = useHistory();
    const gotoBack = () => {
        history.goBack();
    };
    const done = () => {
        history.goBack();
    };


    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted')
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            setImage(data.uri);
        }
        if (hasCameraPermission === false) {
            return <Text>No camera</Text>;

        }
    }
    return (

        <View style={styles.cameraContainer}>
            <Camera ref={ref => setCamera(ref)}
                style={styles.fixedRatio}
                type={type}
                ratio={'1:1'}
            />
           
            <View style={styles.header}>
                <TouchableOpacity>
                    <Feather name='chevron-down' size={32} color='white' />
                </TouchableOpacity>
            </View>
            <View style={styles.viewImage}>
                <Image
                    style={styles.image}
                    source={{ uri: props.location.state.avatar }} />

                <Text style={styles.textYouCall}>Gọi video với</Text>
                <Text style={styles.textName}> {props.location.state.userName} </Text>
            </View>
            <View style={{
                top: -350
        }}>
          <View style={styles.viewBottom}>
            <View style={{
              flexDirection:'row',
              padding: 16,
            }}>
            <TouchableOpacity style={styles.end} onPress={done}>
              <MaterialCommunityIcons name='phone-remove' size={28} color='white' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.sound}>
            <MaterialIcons name='volume-up' size={28} color='white' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.video}>
              <Feather name='video' size={28} color='white' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.xoayCamera}
            onPress={() => {
                setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
            }}>
              <Feather name='refresh-ccw' size={28} color='white' />
            </TouchableOpacity>
            </View>
           

          </View>

        </View>

        </View>
    )
}

export default CallVideo

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
    },
    fixedRatio: {
        // flex: 1,
        height: "100%",
        width: "100%"
    },
    header: {
        height: 30, width: "100%", marginStart: 16,
        top: "-95%"
    },
    viewImage: {
        height: 201,
        width: "90%",
        alignSelf: 'center',
        alignItems: 'center',
        top: "-85%",
      },
      image: {
        height: 140,
        width: 140,
        borderRadius: 70,
        backgroundColor: 'gray',
        borderWidth: 1,
        borderColor: '#0176E4'
      },
      textYouCall: { color: 'white', fontSize: 14, marginTop: 16 },
      textName: { color: 'white', fontSize: 18, marginTop: 8, fontWeight: 'bold' },
      viewBottom: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 90,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
      },
      end:{
        height: 48,
        width: 48,
        backgroundColor: 'red',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
      sound:{
        height: 48,
        width: 48,
        backgroundColor: '#0176E4',
        borderRadius: 30,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
      },
      video:{
        height: 48,
        width: 48,
        backgroundColor: '#0176E4',
        borderRadius: 30,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
      },
      xoayCamera:{
        height: 48,
        width: 48,
        backgroundColor: '#0176E4',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
      }
})