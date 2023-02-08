import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TabBarIOSItem, Image, Modal } from 'react-native';
import { Feather, Ionicons, Octicons, AntDesign } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-native';
import Svg, { Path, Rect, G, Defs, ClipPath, fill } from "react-native-svg";
import Icon from 'react-native-vector-icons/FontAwesome'

import buttonYouus from '../../assets/buttonYouus.png'
function Footer({ profileId }) {
  const history = useHistory();
  const [modalVisible2, setModalVisible2] = useState(false);

  const user = firebase.auth().currentUser;

  const profileUid = user.uid;
  const db = firebase.firestore();



  const goToWall = () => {
    history.push(`/dashboard`);
  };

  const goToNotifications = () => {
    history.push(`/friendRequests/${profileId}/`);
  };
  const goTochat = () => {
    history.push(`/chats`);
  };
  const goTonghiepvu = () => {
    history.push(`/performances`);
  };
  const goToProfile = () => {
    history.push(`/profile/${profileId}`);

  };
  const goToCaNhan = () => {
    history.push(`/CaNhan/${profileUid}`);

  };

  const goToProfil = (Id) => {
    history.push(`/profile/${Id}`);
  };
  const goTo = () => {
    setModalVisible2(true)
  };
  const gotoMedia = () => {
    history.push(`/media`);
  };
  return (
    <View style={{ backgroundColor: 'transparent', borderRadius: 20, opacity: 0.9 }}>

      {/* Task trang chủ */}

      <View style={styles.footerContainer}>

        <TouchableOpacity onPress={goToWall}>

          <View style={styles.iconContainer}>
            <Ionicons name='home-outline' size={22} color='#ffffff' />
            {/* <Icon name="home" size={20} color='black' ></Icon> */}
            <Text style={styles.iconText}>Trang chủ</Text>
          </View>
        </TouchableOpacity>
        {/* Task thông báo */}
        <TouchableOpacity onPress={goTochat}>
          <View style={styles.iconContainer}>
            <Ionicons name='md-chatbubble-outline' size={22} color='#ffffff' />
            <Text style={styles.iconText}>Tin nhắn</Text>

          </View>
        </TouchableOpacity>

        {/* Task nghiệp vụ */}
        <TouchableOpacity onPress={gotoMedia}>
          <View style={styles.iconContainer}>
            <Ionicons name='book' size={38} color='#ffffff' />

          </View>
        </TouchableOpacity>
        {/* <View style={{ width: 70, height: 70 }} >
          <TouchableOpacity onPress={gotoMedia} >
            <View style={styles.iconContainer}>

              <Svg width="110" height="60" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M20 0H0C11.0457 0 20 8.95312 20 20V25C20 44.3301 35.67 60 55 60C74.33 60 90 44.3301 90 25V20C90 8.95508 98.9543 0 110 0H90H20Z" fill="#ffffff" />
              </Svg>
              <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', display: 'flex', marginBottom: 10 }}>


                <Svg width="52" height="52" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Rect width="48" height="48" rx="20" fill="#0176E4" />
                  <G clip-path="url(#clip0_1429_7890)">
                    <Path d="M27.5591 24.7058C27.4138 24.5337 27.2316 24.5003 27.036 24.6188C26.9234 24.6866 26.817 24.7656 26.7095 24.8426C26.2796 25.1484
 25.8497 25.4552 25.4208 25.7621C25.4013 25.7763 25.3819 25.7904 25.3594 25.7996C25.3174 25.8178 25.2816 25.8066 25.2539 25.7692C25.2263 
 25.7307 25.2304 25.6922 25.2652 25.6608C25.2949 25.6345 25.3276 25.6112 25.3604 25.5879C25.7831 25.2861 26.2079 24.9853 26.6297 24.6815C26.7402 
 24.6025 26.8559 24.5296 26.9583 24.4395C27.1476 24.2734 27.1507 23.999 26.9081 23.8207C26.8211 23.7569 26.7208 23.7235 26.6143 23.7569C26.5427
  23.7792 26.4731 23.8116 26.4116 23.8582C25.949 24.2086 25.4648 24.5276 24.999 24.8719C24.9407 24.9145 24.8824 24.957 24.823 24.9965C24.7739 25.0279 24.7206 25.0188 24.6961 24.9783C24.6674 24.9307 24.6848 24.8932 24.7247 24.8638C24.7759 24.8264 24.8291 24.7899 24.8813 24.7524C25.1751 24.5377 25.4668 24.321 25.7678 24.1165C25.9827 23.9706 26.1885 23.8106 26.3994 23.6587C26.5017 23.5848 26.5734 23.3377 26.5079 23.1949C26.4065 22.9751 26.123 22.8972 25.9183 23.0298C25.778 23.121 25.645 23.2243 25.5078 23.3225C25.1925 23.5483 24.8783 23.7742 24.563 24C24.4719 24.0648 24.3808 24.1296 24.2887 24.1934C24.2375 24.2279 24.1761 24.2218 24.1474 24.1843C24.1146 24.1408 24.13 24.084 24.1873 24.0405C24.1965 24.0334 24.2068 24.0273 24.217 24.0202C24.2999 23.9635 24.3828 23.9089 24.4647 23.8511C24.8005 23.6131 25.1383 23.3772 25.472 23.1351C25.604 23.0389 25.7494 22.9579 25.864 22.8394C25.9776 22.723 26.0268 22.5923 25.9623 22.4232C25.8712 22.1822 25.5979 22.0931 25.3931 22.2176C25.2898 22.2804 25.1976 22.3574 25.0994 22.4252C24.8404 22.6055 24.5824 22.7878 24.3245 22.9701C23.9621 23.2263 23.6008 23.4835 23.2374 23.7397C22.9569 23.9382 22.6744 24.1347 22.3939 24.3332C22.311 24.3919 22.3141 24.3929 22.3612 24.4861C22.5383 24.8385 22.7502 25.1707 22.915 25.5292C23.0358 25.7925 23.0296 26.0436 22.8413 26.2867C22.5659 26.6431 22.0254 26.6411 21.7491 26.234C21.6979 26.1581 21.658 26.073 21.6139 25.992C21.5177 25.8158 21.4287 25.6345 21.3232 25.4644C21.2025 25.2679 20.9404 25.2638 20.8278 25.4522C20.7623 25.5606 20.7787 25.679 20.838 25.7864C20.9998 26.0821 21.1615 26.3788 21.3273 26.6725C21.5894 27.1383 21.8371 27.6123 22.0991 28.0771C22.223 28.2969 22.2957 28.5247 22.3162 28.7698V29.1688C22.3162 31.4403 20.1072 33.3138 17.8348 33.3138C15.4589 33.3138 13.3749 31.3775 13.3749 29.1688V18.819C13.3749 17.8013 12.6194 16.9759 11.6869 16.9759C10.7554 16.9759 10 17.8013 10 18.819V29.1698C10 33.414 13.5878 37 17.8348 37C21.398 37 24.4975 34.4905 25.4157 31.1861C25.4157 31.1861 25.4157 31.1861 25.4167 31.1861C25.4167 31.1851 25.4167 31.1851 25.4167 31.1841C25.5958 30.539 25.692 29.8635 25.692 29.1698V28.8528C25.7535 28.1277 25.7913 27.2953 25.7903 27.0442C25.7903 26.8335 25.7739 26.5368 25.8527 26.471C26.1199 26.2482 26.3543 26.073 26.6358 25.8694C26.902 25.678 27.1701 25.4897 27.4363 25.2973C27.4813 25.2649 27.5243 25.2264 27.5601 25.1849C27.6748 25.0512 27.6727 24.8405 27.5591 24.7058Z" fill="white" />
                    <Path d="M30.1658 11C26.2136 11 22.8316 14.0877 22.3638 17.9238C22.3638 17.9238 22.3638 17.9238 22.3628 17.9238C22.3628 17.9299 22.3618 17.937 22.3607 17.9431C22.327 18.2276 22.3085 18.5152 22.3075 18.8069C22.2932 19.3993 22.3044 19.9907 22.3075 20.5842V20.6865C22.3055 20.7594 22.287 20.8252 22.2502 20.889C22.0403 21.2505 21.8325 21.6131 21.6247 21.9756C21.3791 22.404 21.1437 22.8394 20.8888 23.2628C20.8478 23.3316 20.813 23.4035 20.7905 23.4825C20.7322 23.6881 20.7925 23.8724 20.8888 24.0496C21.1396 24.5084 21.3852 24.9692 21.6268 25.433C21.7363 25.6436 21.8499 25.8512 21.9656 26.0578C22.0434 26.1955 22.1632 26.2867 22.3198 26.2958C22.6187 26.312 22.8777 25.9555 22.763 25.7115C22.7303 25.6426 22.6955 25.5747 22.6596 25.5079C22.4672 25.1413 22.2747 24.7747 22.0803 24.4091C22.0158 24.2876 22.0147 24.2846 22.1233 24.2066C22.5102 23.9291 22.8971 23.6516 23.283 23.3731C23.9668 22.8789 24.6506 22.3837 25.3333 21.8865C25.5749 21.7103 25.6926 21.7194 25.6906 21.4713C25.6885 21.2232 25.6844 20.9822 25.6824 20.7401V19.9624C25.6834 19.8874 25.6834 19.8125 25.6824 19.7376V18.8312C25.6824 16.5597 27.8913 14.6862 30.1638 14.6862C32.5396 14.6862 34.6237 16.6225 34.6237 18.8312V29.182C34.6237 30.1997 35.3791 31.0251 36.3116 31.0251C37.2441 31.0251 37.9995 30.1997 37.9995 29.182V18.8302C38.0006 14.586 34.4128 11 30.1658 11Z" fill="white" />
                  </G>
                  <Defs>
                    <ClipPath id="clip0_1429_7890">
                      <Rect width="28" height="26" fill="white" transform="translate(10 11)" />
                    </ClipPath>
                  </Defs>
                </Svg>

              </View>
            </View>
          </TouchableOpacity>
        
        </View> */}

        {/* Task thông báo */}
        <TouchableOpacity onPress={goToNotifications}>
          <View style={styles.iconContainer}>
            <Ionicons name='md-people-outline' size={22} color='#ffffff' />
            <Text style={styles.iconText}>Bạn bè</Text>
          </View>
        </TouchableOpacity>

        {/* Task Tài khoản */}
        <TouchableOpacity onPress={goToCaNhan}>
          <View style={styles.iconContainer}>
            <Ionicons name='md-reorder-three-outline' size={22} color='#ffffff' />
            <Text style={styles.iconText}>Mở rộng</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleLogOut}>
        <View style={styles.iconContainer}>
          <Feather name='log-out' size={25} color='white' />
          <Text style={styles.iconText}>Log out</Text>
        </View>
      </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  footerContainer: {
    display: 'flex',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    bottom: 0,
    borderBottomWidth: 0,
    borderBottomColor: '#0176E4',
    backgroundColor: '#0176E4',
    width: '100%',
  },

  iconContainer: {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 3,
    marginLeft: 3,
    marginRight: 3,
    opacity: 0.99
  },
  iconText: { color: '#ffffff', fontSize: 12, fontWeight: '400' },
});

export { Footer };