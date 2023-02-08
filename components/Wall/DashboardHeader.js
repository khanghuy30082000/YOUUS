import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, SafeAreaView, TextInput, } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { CustomSearchBar } from '../AppComponents/CustomSearchBar';
import firebase from 'firebase/compat/app';
import { useFirestoreCollection } from '../hooks';
import { Notifications } from '../Notifications/Notifications';
import { CommentNotifications } from '../Notifications/CommentNotifications';
import { LikesNotifications } from '../Notifications/LikesNotifications';
import logo from '../../assets/YOUUSs.png'
import { Icon } from 'react-native-elements';
import { useHistory } from 'react-router-native';
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"

import YOUUSss from '../../assets/YOUUSss.svg'
const bgBlue = "#D7EBFF";

function DashboardHeader(props) {
  const history = useHistory();
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

  const backToDashboard = () => {
    history.push(`/notis`);
  };
  const nextToScreen = () => {
    history.push(`/search`);
  };
  const fetchFriendsNotifications = useFirestoreCollection(
    db
      .collection('accounts')
      .doc(userId)
      .collection('friendsNotifications')
      .orderBy('created', 'desc'),
    []
  );

  const fetchCommentNotifications = useFirestoreCollection(
    db
      .collection('accounts')
      .doc(userId)
      .collection('commentNotifications')
      .orderBy('created', 'desc'),
    []
  );

  const fetchLikesNotifications = useFirestoreCollection(
    db
      .collection('accounts')
      .doc(userId)
      .collection('likesNotifications')
      .orderBy('created', 'desc'),
    []
  );

  // console.log(fetchLikesNotifications);

  return (
    <SafeAreaView style={styles.headerContainer}>
      {/* <Image source={logo}
        style={{ marginStart: 16 }}

      /> */}
{/* 
      <YOUUSss width={77} height={19} fill={'#fff'}/> */}
      <View style={{marginLeft:16,}}>

      <Svg
    width={77}
    height={19}
    fill="#fff"
    
 
  >
    <Path
      d="m4.125.938 3.563 7.78L11.25.939h3.832L9.469 11.789V18H5.906v-6.21L.281.937h3.844Zm26.18 8.132v.809c0 1.297-.176 2.46-.528 3.492-.351
       1.031-.847 1.91-1.488 2.637a6.454 6.454 0 0 1-2.297 1.652c-.883.383-1.863.574-2.941.574-1.07 0-2.051-.191-2.942-.574a6.593 6.593 0 
       0 1-2.297-1.652c-.648-.727-1.152-1.606-1.511-2.637-.352-1.031-.528-2.195-.528-3.492V9.07c0-1.304.176-2.468.528-3.492.351-1.031.847-1.91 
       1.488-2.637a6.525 6.525 0 0 1 2.297-1.664c.89-.382 1.871-.574 2.941-.574 1.078 0 2.059.192 2.942.574.89.383 1.656.938 2.297 1.664.648.727 
       1.148 1.606 1.5 2.637.359 1.024.539 2.188.539 3.492Zm-3.551.809v-.832c0-.906-.082-1.703-.246-2.39-.164-.688-.406-1.266-.727-1.735-.32-.469-.71-.82-1.172-1.055-.46-.242-.988-.363-1.582-.363-.593 0-1.12.121-1.582.363-.453.235-.84.586-1.16 1.055-.312.469-.55 1.047-.715 1.734-.164.688-.246 1.485-.246 2.39v.833c0 .898.082 1.695.246 2.39.164.688.407 1.27.727 1.747.32.468.71.824 1.172 1.066.46.242.988.363 1.582.363.594 0 1.12-.12 1.582-.363a3.145 3.145 0 0 0 1.16-1.066c.313-.477.55-1.059.715-1.746.164-.696.246-1.493.246-2.391ZM42.258.938h3.504V12.21c0 1.312-.282 2.418-.844 3.316a5.206 5.206 0 0 1-2.309 2.028c-.976.453-2.101.68-3.375.68-1.273 0-2.406-.227-3.398-.68a5.278 5.278 0 0 1-2.32-2.028c-.555-.898-.832-2.004-.832-3.316V.937h3.515v11.274c0 .766.121 1.39.364 1.875a2.3 2.3 0 0 0 1.042 1.066c.461.227 1.004.34 1.63.34.64 0 1.183-.113 1.628-.34a2.242 2.242 0 0 0 1.032-1.066c.242-.484.363-1.11.363-1.875V.937Zm15.82 0h3.504V12.21c0 1.312-.281 2.418-.844 3.316a5.206 
       5.206 0 0 1-2.308 2.028c-.977.453-2.102.68-3.375.68-1.274 0-2.407-.227-3.399-.68a5.278 5.278 0 0 1-2.32-2.028c-.555-.898-.832-2.004-.832-3.316V.937h3.516v11.274c0 .766.12 1.39.363 1.875.242.484.59.84 1.043 1.066.46.227 1.004.34 1.629.34.64 0 1.183-.113 1.629-.34a2.242 2.242 0 0 0 1.03-1.066c.243-.484.364-1.11.364-1.875V.937ZM73.36 13.534a2.26 2.26 0 0 0-.14-.82 1.55 1.55 0 0 0-.492-.68c-.243-.21-.583-.418-1.02-.62a14.405 14.405 0 0 0-1.7-.634 21.508 21.508 0 0 1-2.202-.844 9.05 9.05 0 0 1-1.828-1.09 4.91 4.91 0 0 1-1.243-1.464c-.296-.555-.445-1.2-.445-1.934a4 4 0 0 1 .469-1.933 4.45 4.45 0 0 1 1.312-1.5c.563-.422 1.227-.746 1.993-.973a9.019 9.019 0 0 1 2.543-.34c1.257 0 2.355.227 3.292.68.938.453 1.665 1.074 2.18 1.863.524.79.785 1.692.785 2.707h-3.492c0-.5-.105-.937-.316-1.312a2.14 2.14 0 0 0-.938-.903c-.414-.218-.937-.328-1.57-.328-.61 0-1.117.094-1.524.281-.406.18-.71.426-.914.739a1.817 1.817 0 0 0-.304 1.03c0 .29.07.552.21.786.15.234.368.453.657.656.289.203.644.395 1.066.575.422.18.91.355 1.465.527.93.281 1.746.598 2.45.95.71.35 1.304.745 1.78 1.183a4.4 4.4 0 0 1 1.079 1.488c.242.555.363 1.184.363 1.887 0 .742-.144 1.406-.434 1.992a4.093 4.093 0 0 1-1.254 1.488c-.546.406-1.199.715-1.956.926-.758.21-1.606.316-2.543.316-.844 0-1.676-.109-2.497-.328a7.58 7.58 0 0 1-2.238-1.02 5.138 5.138 0 0 1-1.594-1.734c-.398-.703-.597-1.535-.597-2.496h3.527c0 .531.082.98.246 1.348.164.367.395.664.692.89.304.227.664.391 1.078.493.422.101.882.152 1.382.152.61 0 1.11-.086 1.5-.258.399-.172.692-.41.88-.715a1.87 1.87 0 0 0 .292-1.03Z"
      fill="#0176E4"
    />
  </Svg>

      </View>
   

      {searchIsOpen ? <CustomSearchBar /> : null}
      <View style={styles.iconSection}>
        <TouchableOpacity
           onPress={nextToScreen}
          style={styles.touSeacrh}>
          <AntDesign
            name='search1'
            size={24}
            color='#ffffff'
            style={styles.iconSearch}
          />
          <Text style={{color:'#FFFFFF',justifyContent:'center',alignSelf:'center',fontSize:17,}}>
          Tìm kiếm với YOUUS
          </Text>
          {/* <TextInput placeholder='Tìm kiếm với YOUUS'
            placeholderTextColor={"#ffffff"}
            style={{
              width:"80%",
              color:'#2B2B2B'
            }}>

          </TextInput> */}
        </TouchableOpacity>
        <TouchableOpacity
        onPress={backToDashboard}
          //  onPress={() => setNotificationsOpen(!notificationsOpen)}
        >
          <View style={styles.notificationIconContainer}>
            <View style={styles.iconContainer}>
              <Feather
                name='bell'
                size={28}
                color='#0176E4'
                style={styles.bell}
              />
            </View>
            <View style={styles.circle}></View>
          </View>
        </TouchableOpacity>
        {/* {notificationsOpen ? (
          <View style={styles.notificationsOpen}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationHeaderText}>Thông báo</Text>
            </View>
            {fetchLikesNotifications.map((likes) => {
              return (
                <LikesNotifications
                  key={likes.id}
                  postId={likes.data.post}
                  created={likes.data.created}
                  friendId={likes.data.userId}
                  placeholder='đã thích bài viết của bạn'
                  isRead={likes.data.markedAsRead}
                  userId={userId}
                  likeId={likes.id}
                />
              );
            })}

            {fetchCommentNotifications.map((comment) => {
              return (
                <CommentNotifications
                  key={comment.id}
                  postId={comment.data.post}
                  created={comment.data.created}
                  friendId={comment.data.userId}
                  placeholder='đã bình luận bài viết của bạn'
                  isRead={comment.data.markedAsRead}
                  userId={userId}
                  commentId={comment.id}
                />
              );
            })}
            {fetchFriendsNotifications.map((notification) => {
              if (
                notification.data.isFriend === false &&
                userId !== notification.id
              ) {
                return (
                  <View>
                    <Notifications
                      key={userId}
                      friendId={notification.id}
                      created={notification.data.created}
                      userId={userId}
                      placeholder='đã thêm bạn là bạn bè'
                      isRead={notification.data.markedAsRead}
                    />
                  </View>
                );
              }

              if (notification.data.isFriend === true) {
                return (
                  <Notifications
                    key={notification.id}
                    friendId={notification.id}
                    created={notification.data.created}
                    userId={userId}
                    placeholder='đã chấp nhận yêu cầu kết bạn'
                    isRead={notification.data.markedAsRead}
                  />
                );
              }
            })}
          </View>
        ) : null} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
     display: 'flex',
  elevation:3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    width: "100%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#ffffff',
    marginBottom:8,
  },
  social: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  iconSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIconContainer: { marginTop: 15,width:'100%' },
  bell: { marginRight: 20 },
  circle: {
    backgroundColor: 'red',
    borderRadius: 50,
    fontWeight: 'bold',
    bottom: 30,
    left: 15,
    width: 10,
    height: 10,
  },

  notificationsOpen: {
    justifyContent:'center',
    alignItems:'center',
    display: 'flex',
   position:'absolute',
    top: 40,
    right: 20,
    width: '100%',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },

  notificationHeader: {
    backgroundColor: 'black',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10

  },
  notificationHeaderText: { fontSize: 18, color: '#ffffff' },
  touSeacrh: {
    height: 40,
    width: 213,
    backgroundColor: '#E2E2E2',
    borderRadius: 20,
    marginEnd: 15,
    justifyContent: 'center',
    paddingEnd: 10,
    flexDirection:'row'
  },
  iconSearch:{
    width: "17%",
    alignSelf:'center',
    marginStart:7
  }

});

export { DashboardHeader };
