
import React from 'react'
import { PageHeaders } from '../AppComponents/PageHeaders'
import { useHistory } from 'react-router-native';
import  { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, StatusBar ,Image} from 'react-native';
import firebase from 'firebase/compat/app';
import { useFirestoreCollection } from '../hooks';
import { Notifications } from '../Notifications/Notifications';
import { CommentNotifications } from '../Notifications/CommentNotifications';
import { LikesNotifications } from '../Notifications/LikesNotifications';
import { ScrollView } from 'react-native-gesture-handler';
const notifis = (props) => {
    const history = useHistory();
    const usera = firebase.auth().currentUser;
 
    const profileId = props.match.params.id;
    console.log(profileUid);
    
    const profileUid = usera.uid;

  const backToDashboard = () => {
    history.push(`/dashboard`);
  };
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;

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
      // .where("userId", "!=",userId)
      .orderBy('created', 'desc')
      ,
    []
  );

  const fetchLikesNotifications = useFirestoreCollection(
    db
      .collection('accounts')
      .doc(userId)
      .collection('likesNotifications')
       .where("userId", "!=",userId)
      // .orderBy('created', 'desc')

      ,
    []
  );

  console.log(user.uid);
  return (
    <SafeAreaView style={{backgroundColor:'#ffffff'}} >
       <StatusBar
     backgroundColor="#ffffff"
    barStyle={'dark-content'}
   
   />
    <View  >
     
    <PageHeaders
        placeholder='Thông báo'
        onPressNavigation={backToDashboard}
      />
     <View style={{backgroundColor:'#ffffff',height:'100%'}}>
      <ScrollView style={{backgroundColor:'#ffffff'}}>

     
<View style={{justifyContent:'center',alignItems:'center',width:'100%',backgroundColor:'#e5efff'}}>
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
                      placeholder='đã gửi lời mời kết bạn với bạn'
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
</ScrollView>
     </View>
      
    </View>
    </SafeAreaView>
  )
}

export default notifis

const styles = StyleSheet.create({

})