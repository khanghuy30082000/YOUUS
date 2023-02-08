import { Animated, StyleSheet, Text, View, Image, Dimensions, SafeAreaView, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHistory } from 'react-router-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('screen');

// Màu xanh dương
const Bluee = "#0176E4";
// Màu tím backgr
const bgColor = "#D7EBFF"
// Màu background giới thiệu
const bgs = ['white', 'white', 'white'];

const DATA = [
  {
    "key": "1",
    "title": "Welcome",
    "description": "Cùng nhau trải nghiệm những tính năng giải trí, liên lạc, cập nhật thông tin, làm việc hiệu quả với ứng dụng YOUUS",
    "image": "https://i.imgur.com/8ORwmoQ.png"
  },
  {
    "key": "2",
    "title": "Mạng xã hội ",
    "description": "YOUUS là một mạng xã hội cho phép bạn chia sẻ thông tin, kết nối, liên lạc trực tuyến hoàn toàn miễn phí.",
    "image": "https://i.imgur.com/Oy5StNH.png"
  },
  {
    "key": "3",
    "title": "Nghiệp vụ",
    "description": "YOUUS tích hợp tính năng Nghiệp vụ dành cho nhân viên công ty, giúp nhân viên các phòng ban làm việc hiệu quả hơn.",
    "image": "https://i.imgur.com/JLJM8bm.png"
  },
]

const Indication = ({ scrollx }) => {
  return <View style={{ position: 'absolute', bottom: 80, flexDirection: 'row' }}>
    {DATA.map((_, i) => {
      const inputRange = [(i - 1) * width, i * width, (i + i) * width];
      const scale = scrollx.interpolate({
        inputRange,
        outputRange: [0.8, 1.4, 0.8],
        borderWidth: 1,
        extrapolate: 'clamp'
      });

      return <Animated.View
        key={`indication-${i}`}
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: Bluee,
          margin: 10,
          transform: [
            {
              scale,
            }
          ]
        }} />
    })}
  </View>
}
const Backdrop = ({ scrollx }) => {

  const backgroundColor = scrollx.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  })
  return <Animated.View
    style={[StyleSheet.absoluteFillObject,
    {
      backgroundColor: backgroundColor,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    }]}
  />
}

export default function OnBroading() {
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const edges = useSafeAreaInsets();
  const startAnimation = useRef(new Animated.Value(0)).current;
  const bgImg = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(
          startAnimation,
          {
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          bgImg,
          {
            useNativeDriver: true,
          }
        ),
      ])
        .start();
    }, 3000);

  }, [])
  const history = useHistory();

  const login = () => {
    history.push(`/login`);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E2E2E2' }}>
      <View style={{ alignItems: 'center', flex: 0.9 }}>
        <Backdrop scrollx={scrollx} />
        <View>
          <Animated.FlatList
            data={DATA}
            keyExtractor={item => item.key}
            horizontal
            scrollEventThrottle={32}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollx } } }],
              { useNativeDriver: false }
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            renderItem={({ item }) => {
              return (
                <View style={{ width, justifyContent: 'center' }}>
                  <View style={styles.viewImg}>
                    <Image source={{ uri: item.image }} style={styles.img} />
                  </View>
                  <View style={{}}>
                    <Text style={styles.header}>{item.title}</Text>
                    <Text style={styles.caption}>{item.description}</Text>
                  </View>
                </View>
              );
            }}
          ></Animated.FlatList>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Indication scrollx={scrollx} />
        </View>
      </View>


      <View style={styles.viewButton}>
        <TouchableOpacity onPress={login} style={styles.touNext}>
          <Text style={styles.next}> Tiếp theo </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={login} style={styles.touSkip}>
          <Text style={styles.skip}> Bỏ qua </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  img: {
    width: 291, height: 180,
    resizeMode: 'contain',
  },
  viewImg: {
    alignItems: 'center',
  },
  viewButton: {
    display: 'flex'
  },
  caption: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    fontSize: 16,
    marginHorizontal: 40,
    paddingTop: 10,
  },
  header: {
    fontWeight: '700',
    fontSize: 36,
    marginBottom: 15,
    textAlign: 'center',
    color: Bluee,
    paddingTop: 40,
  },
  touNext: {
    marginTop: 5,
    top: -35,
    height: 56,
    width: 290,
    backgroundColor: Bluee,
    alignSelf: 'center',
    borderRadius: 40,
  },
  next: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: "6%",
  },
  touSkip: {
    marginTop: 30,
    height: 56,
    width: 166,
    borderWidth: 1,
    borderColor: "#27579C",
    alignSelf: 'center',
    borderRadius: 40,
  },

  skip: {
    fontSize: 16,
    color: Bluee,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: "10%",
  },

})