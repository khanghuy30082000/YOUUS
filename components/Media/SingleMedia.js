import React, {useRef, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image, SafeAreaView,StatusBar} from 'react-native';

 import { Video, AVPlaybackStatus } from 'expo-av';
import { Feather, Ionicons, Octicons,AntDesign,Ionic } from '@expo/vector-icons';

const SingleMedia = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const videoRef = useRef(null);
  
    const onBuffer = buffer => {
      console.log('buffring', buffer);
    };
    const onError = error => {
      console.log('error', error);
    };
  
    const [mute, setMute] = useState(false);
  
    const [like, setLike] = useState('');
  return (
    <SafeAreaView
      style={{
        width: windowWidth,
        height: windowHeight,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
          <StatusBar  barStyle={'light-content'} backgroundColor="#000000" />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>

 <Video
        ref={video}
        style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/youus-72e81.appspot.com/o/M%C3%88O%20QU%E1%BA%A8Y%20NH%E1%BA%A0C%20H%C3%80I%20H%C6%AF%E1%BB%9AC%20-%20DANCE%20CAT%20FUNNY.mp4?alt=media&token=532422f4-cd23-4f83-b569-8f4986f452fa',
        }}
    
        isMuted='true'
        isLooping
        resizeMode={"contain"}
        shouldPlay={true}
      
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> 
        </TouchableOpacity>
        
        </SafeAreaView>
  )
}

export default SingleMedia

