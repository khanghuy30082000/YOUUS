import { Animated, StyleSheet, Text, View, Image, Dimensions, SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../assets/lgo.png'
import Onbroading from '../OnBroading/Onbroading';
import { useRef } from 'react';
import { useEffect } from 'react';
import Youus from '../../assets/YOUUS.png'
import slogan from '../../assets/slogan.png'
import * as Animatable from 'react-native-animatable';

const Bluee = "#0176E4";
const WhiteColor = "#FFFFFF";
export default function Splash() {

    // SafeArea Value...
    const edges = useSafeAreaInsets();

    // Animation Values....
    const startAnimation = useRef(new Animated.Value(0)).current;

    // Scaling Down Both logo and Title...
    const scaleLogo = useRef(new Animated.Value(1)).current;
    const BgscaleLogo = useRef(new Animated.Value(1)).current;

    // Offset Animation....
    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    // const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    // Animating COntent...
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    // Animation Done....
    useEffect(() => {
        setTimeout(() => {
            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        // For same Height for non safe Area Devices...
                        toValue: -Dimensions.get('window').width + (edges.bottom + 1),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        toValue: 2,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    BgscaleLogo,
                    {
                        toValue: 0,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ])
                .start();

        }, 2000);

    }, [])

    return (
        <SafeAreaView style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor:'white',
        }}>
             <StatusBar
     backgroundColor="#ffffff"
    barStyle={'dark-content'}
   
   />
            <Animatable.View style={{
                marginTop:'50%'
            }}>
                <Animatable.Image source={Logo} style={{
                    width: 150,
                    height: 142,
                    top: 35,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                }} animation="fadeOutLeftBig" duration={2000} delay={1500}></Animatable.Image>
                <Animatable.Image source={Youus} style={{
                    width: 230,
                    height: 48,
                    top: 30,
                    alignSelf: 'center',
                    marginBottom: 20,
                }} animation="fadeOutRightBig" duration={2000} delay={1500}></Animatable.Image>
                <Animatable.Image source={slogan} style={{
                    width: 149.5,
                    height: 12,
                    top: 20,
                    alignSelf: 'center',
                    marginBottom: 20,
                }} animation="fadeOutLeftBig" duration={2000} delay={1500}></Animatable.Image>
            </Animatable.View>
            <Animated.View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: WhiteColor,
                zIndex: 0,
                transform: [
                    { translateY: contentTransition }
                ]
            }}>
                <Onbroading>

                </Onbroading>
            </Animated.View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {

    }
})