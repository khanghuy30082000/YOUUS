import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,StatusBar, Dimensions, SafeAreaView
} from 'react-native';
import { TaggedFriend } from '../Friends/TaggedFriend';
import { useFirestoreDocument, useFirestoreCollection } from '../hooks';
import firebase from 'firebase/compat/app';
import { Image as RNImage } from 'react-native';
import { useHistory } from 'react-router-native';
import { Comments } from './Comments';
import { PageHeaders } from '../AppComponents/PageHeaders';
import { Post } from './Post';
import moment from 'moment';
import { Feelings } from './Feelings';
import Svg, { Path,Rect,G,Defs ,ClipPath,fill} from "react-native-svg";
import { Feather, AntDesign, FontAwesome, MaterialIcons, SimpleLineIcons,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Video } from 'react-native-expo-image-cache';
import BottomSheet from "react-native-easy-bottomsheet";  
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import CommentInComment from './CommentInComment';
function OpenPost(props,post, isWith) {
  const [comment, setComment] = useState('');
  const postId = props.match.params.id;
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const userId = user.uid;
  const history = useHistory();
  console.log(props);
  const [isVisible, setVisible] = useState(false);
  const [isVisible1, setVisible1] = useState(false);
  const [isVi, setVi] = useState(false);
  const [comment2, setComment2] = useState([]);
  const fetchUser = useFirestoreDocument(
    db.collection('accounts').doc(userId),
    []
  );
  const fetchPost = useFirestoreDocument(db.collection('posts').doc(postId), [
    postId,
  ]);
  const fetchComm = useFirestoreCollection( 
    db.collection('posts/'+postId+'/comments'),
    []
  );


  const fetchMyUser = useFirestoreDocument(
    db.collection('accounts').doc(userId),
    []
  );

  const fetchComments = useFirestoreCollection(
    db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('created', 'asc'),
    [postId]
  );

  const goToProfile = (id) => {
    history.push(`/profile/${id}`);
  };

  const goToTaggedUserProfile = (isWith) => {
    history.push(`/profile/${isWith}`);
  };
  
  if (!fetchPost) {
    return null;
  }
  const numberOfComments = fetchComments.length;
  const addLikesToDb = () => {

    if ((fetchPost.data.usersWhoLiked || []).find((user) => user === userId) === undefined) {
      db.collection('posts')
        .doc(postId)
        .update({
          usersWhoLiked: firebase.firestore.FieldValue.arrayUnion(userId),
        });

      db.collection('accounts')
        .doc(fetchPost.data.userId)
        .collection('likesNotifications')
        .add({
          created: firebase.firestore.Timestamp.fromDate(new Date()),
          userId: userId,
          post: postId,
          markAsRead: false,
        });
    } else {
      // console.log(db.collection('posts').doc(postId));
      // console.log(1);

      const docRef = doc(db, "posts", postId);
      const data = {
        'usersWhoLiked': firebase.firestore.FieldValue.arrayRemove(userId)
      };
      updateDoc(docRef, data)
        .then(() => {
          console.log("Code Field has been deleted successfully");
        })
        .catch(() => {
          console.log(error);
        })
    }
  }
  const addLikesToComment = () => {
    setVi(!isVi)
    if ((fetchPost.data.usersWhoLiked || []).find((user) => user === userId) === undefined) {
      db.collection('posts')
        .doc(postId)
        .collection('comments').doc(comment.id)
        .update({
          usersWhoLikedComment: firebase.firestore.FieldValue.arrayUnion(userId),
        });

      db.collection('accounts')
        .doc(fetchPost.data.userId)
        .collection('likesNotifications')
        .add({
          created: firebase.firestore.Timestamp.fromDate(new Date()),
          userId: userId,
          post: postId,
          markAsRead: false,
        });
    } else {
      // console.log(db.collection('posts').doc(postId));
      // console.log(1);

      const docRef = doc(db, "posts", postId);
      const data = {
        'usersWhoLikedComment': firebase.firestore.FieldValue.arrayRemove(userId)
      };
      updateDoc(docRef, data)
        .then(() => {
          console.log("Code Field has been deleted successfully");
        })
        .catch(() => {
          console.log(error);
        })
    }
  }
  const deleteLikesToDb = () => {
    db.collection('posts')
      .doc(postId)
      .delete({
        usersWhoLiked: firebase.firestore.FieldValue.arrayUnion(userId),
      });
    db.collection('accounts')
      .doc(fetchPost.data.userId)
      .collection('likesNotifications')
      .add({
        created: firebase.firestore.Timestamp.fromDate(new Date()),
      userId: userId,
        post: postId,
        markAsRead: false,
      });
  };
  //lấy id người post bài


  const openPost = (postId) => {
    history.push(`/post/${postId}`);
  };
  const opencommnet = (postId) => {
    history.push(`/post/${postId}`,postId);
  };
  const openSingleMedia = () => {
    history.push(`/media`);
  };
  if (!fetchUser) {
    return null;
  }
  // if (!fetchMyUser) {
  //   return null;
  // }


  if (!fetchComments) {
    return null;
  }
  const showConfirmDialog = () => {
    return Alert.alert(
      "Bạn có chắc chắn",
      "Muốn xoá bài viết này không?",
      [
        {
          text: "Hủy",
        }, {
          text: "Có",
          onPress: () => {
            deleteLikesToDb(userId)
            history.push(`/dashboard`);
          },
          
        },
      ]
    );
  };
   const userIdOfPost = fetchPost.data.userId;

  const handleCommentInput = (inputText) => {
    setComment(inputText);
  };

  const addCommentToPost = () => {
    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .add({
        postComment: comment,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        user: userId,
        
      });
    db.collection('accounts')
      .doc(userIdOfPost)
      .collection('commentNotifications')
      .add({
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        comment: comment,
        userId: userId,
        post: postId,
        markAsRead: false,
      });
  };

  const backToDashboard = () => {
    history.push(`/dashboard`);
  };
//  console.log( props);

const showemojitab = () => {
  return (<EmojiSelector
    category={Categories.symbols}
    onEmojiSelected={emoji => console.log(emoji)}
  />)
};
  return (
    <SafeAreaView style={{backgroundColor:'#ffffff',height:'100%',width:'100%'}}>

   
    <ScrollView>
      <View style={styles.postContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
        <PageHeaders
          placeholder='Quay lại'
          onPressNavigation={backToDashboard}
        />
      
          {/* <Post post={fetchPost.data} isWith={fetchPost.data.isWith} /> */}
          
          <View style={styles.userHeader}>
          {fetchUser.data.profilePicture ? (
            <TouchableOpacity onPress={() => goToProfile(fetchPost.data.userId)} >
              <Image borderRadius={66}
                uri={fetchUser.data.profilePicture}
                style={styles.avatarImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => goToProfile(fetchPost.data.userId)} >
              <RNImage borderRadius={66} source={Avatar} style={styles.avatarImage} /></TouchableOpacity>
          )}
  {fetchPost.data.isWith ? ( <View style={{    display: 'flex',
    flexDirection: 'column',
    marginLeft: 8,top:-5,marginTop:10}}>
            <View style={styles.userfeelings}>
              <TouchableOpacity onPress={() => goToProfile(fetchPost.data.userId)}>
                <View>
                  <Text style={styles.userName}>{fetchUser.data.userName} </Text></View></TouchableOpacity>
              <Feelings selectedFeeling={fetchPost.data.feeling} />
      
            </View>
            
            {fetchPost.data.isWith ? (
              <View style={styles.isWithContainer}>
                <TouchableOpacity onPress={() => goToTaggedUserProfile(fetchPost.data.isWith)}>
                  <TaggedFriend friendId={fetchPost.data.isWith} />
                </TouchableOpacity>
              </View>
            ) : null}

            <Text style={styles.date}>
              {moment(fetchPost.data.created.toDate()).format('DD/MM hh:ss')}
            </Text>
            
          </View>):( <View style={styles.detailsContainer}>
            <View style={styles.userfeelings}>
              <TouchableOpacity onPress={() => goToProfile(fetchPost.data.userId)}>
                <View>
                  <Text style={styles.userName}>{fetchUser.data.userName} </Text></View></TouchableOpacity>
              <Feelings selectedFeeling={fetchPost.data.feeling} />
      
            </View>
            
            {fetchPost.data.isWith ? (
              <View style={styles.isWithContainer}>
                <TouchableOpacity onPress={() => goToTaggedUserProfile(fetchPost.data.isWith)}>
                  <TaggedFriend friendId={fetchPost.data.isWith} />
                </TouchableOpacity>
              </View>
            ) : null}

            <Text style={styles.date}>
              {moment(fetchPost.data.created.toDate()).format('DD/MM hh:ss')}
            </Text>
            
          </View>)}

         
          <View style={{marginTop:-20,position:'absolute',left:'91%'}}>
          <TouchableOpacity onPress={() => {
            setVisible(true);
          }}>
          
            <View style={{marginTop:-20}}>
              <Ionicons name='ellipsis-horizontal' size={20} color='black' />
            </View>
         
        </TouchableOpacity>
          </View>
        
        </View>
       
       {fetchPost.data ? (<Text style={styles.post}>{fetchPost.data.post}</Text>):(<Text style={{marginBottom:0}}></Text>)} 
        <View >
          {fetchPost.data.postPicture && (
            <TouchableOpacity onPress={() => openPost(postId)} >
              <Image 
                uri={fetchPost.data.postPicture}
                style={styles.postImage}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.centeredView}>
        <BottomSheet
         
          bottomSheetTitleStyle={{ color: '#0A2463', fontSize: 16, marginStart: "31%" }}
          setBottomSheetVisible={setVisible1}
          bottomSheetStyle={{
            backgroundColor: "white",
            maxHeight: "55%",
            minHeight: "15%",
          }}
          bottomSheetVisible={isVisible1}
        >
          <ScrollView>
          <EmojiSelector
          showHistory={true}
     showTabs={true}
          showSearchBar={true}
  category={Categories.history}
  onEmojiSelected={emoji =>setComment2([...comment2,emoji])}
/>
            </ScrollView>
            
            </BottomSheet></View>
      <View style={styles.centeredView}>
        <BottomSheet
          bottomSheetTitle={"Chọn một tuỳ chọn"}
          bottomSheetTitleStyle={{ color: '#0A2463', fontSize: 16, marginStart: "31%" }}
          setBottomSheetVisible={setVisible}
          bottomSheetVisible={isVisible}
        >
          <ScrollView>
          <TouchableOpacity onPress={() => goToProfile(post.userId)}>
              <View style={styles.viewOption}>
                <SimpleLineIcons
                  name='user'
                  size={24}
                  color='#0176E4'
                />
                <Text style={styles.txtBlue}>
                  Xem trang cá nhân
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.viewOption}>
                <SimpleLineIcons
                  name='pencil'
                  size={24}
                  color='#0176E4'
                />
                <Text style={styles.txtBlue}>
                  Chỉnh sửa bài viết
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={showConfirmDialog}>
              <View style={styles.viewOption}>
                <Feather
                  name='trash-2'
                  size={24}
                  color='red'
                />
                <Text style={styles.txtRed}>
                  Xoá bài viết
                </Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={butonCancel}>
              <View style={styles.viewOption}>
                <Feather
                  name='cancel'
                  size={24}
                  color='#0176E4'
                />
                <Text style={styles.txtBlue}>
                  Huỷ
                </Text>
              </View>
            </TouchableOpacity> */}
          </ScrollView>
        </BottomSheet>
      </View>
      <View style={styles.reactionContainer}>
        <View style={{
          flexDirection: 'row',
          marginBottom:8,
        }}>
          <TouchableOpacity onPress={() => addLikesToDb(userId)} style={{ marginStart: 20, }}>
            {(fetchPost.data.usersWhoLiked || []).find((user) => user === userId) ===
              undefined ? (
              <View style={styles.reactionSection}>
                <FontAwesome name='heart-o' size={22} color='#FF6196' />
<Text style={styles. reactionTextPi}>?</Text>
              </View>
            ) : (
              <View style={styles.reactionSection}>
                <FontAwesome name='heart' size={22} color='#FF6196' />
                <Text style={styles. reactionTextPi}>{fetchPost.data.usersWhoLiked.length} </Text>
              </View>

            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openPost(postId)} style={{ marginStart: 4, }}>
            <View style={styles.reactionSection}>
             <Svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M5 6H10M19 17L15.6757 15.3378C15.4237 15.2118 15.2977 15.1488 15.1656 15.1044C15.0484 15.065 14.9277 15.0365 14.8052 15.0193C14.6672 15 14.5263 15 14.2446 15H5.8C4.11984 15 3.27976 15 2.63803 14.673C2.07354 14.3854 1.6146 13.9265 1.32698 13.362C1 12.7202 1 11.8802 1 10.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8V17Z" stroke="#0176E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</Svg> 


              <Text style={styles.reactionText}>{numberOfComments}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
          
       

        {fetchComments.map((comment) => {
          return <Comments key={comment.id} comment={comment.data} />;
          
        })}
      </View>
      <View
        style={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        
      
        
    
            
       
      </View>
    </ScrollView>
    <View style={{
        
        borderTopColor:'#E9E9E9',
        borderTopWidth:0.4,
        width: "100%",
        flexDirection:'row',
        paddingTop:8,
        paddingLeft:20,
        alignItems:'center',
        bottom:0
    ,paddingBottom:10,
      }} >
        {fetchUser.data.profilePicture ? (
            <TouchableOpacity onPress={() => goToProfile(user.uid)} >
              <Image borderRadius={66}
                uri={fetchUser.data.profilePicture}
                style={styles.avatarImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => goToProfile(user.uid)} >
              <RNImage borderRadius={66} source={Avatar} style={styles.avatarImage} /></TouchableOpacity>
          )}
     
      <View style={{height:39,width:235,flexDirection:'row',
                  backgroundColor: '#E9E9E9', marginLeft: 5, marginRight:5, borderRadius: 35, borderTopLeftRadius: 35, borderTopRightRadius: 35, shadowRadius: 5,}}>
         
          <TextInput
            style={styles.textInput}
            textContentType='emailAddress'
            name='email'
            placeholder='Bình luận ngay...'
            placeholderTextColor='black'
            defaultValue={comment2}
            onChangeText={handleCommentInput}
          inputText={comment}
            >
             
             
            </TextInput>
           
            
            </View>
            <TouchableOpacity onPress={addCommentToPost}>
             <Svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M9.5003 10C10.0526 10 10.5003 9.55229 10.5003 9.00001C10.5003 8.44772 10.0526 8.00001 9.5003 8.00001V10ZM3.41872 
8.00001C2.86643 8.00001 2.41872 8.44772 2.41872 9.00001C2.41872 9.55229 2.86643 10 3.41872 10V8.00001ZM3.24634 9.79721L4.19461
 10.1147L3.24634 9.79721ZM3.40651 9.23098L4.39807 9.36061L3.40651 9.23098ZM3.24829 8.2793L2.2992 8.59431L3.24829 8.2793ZM3.407
  8.84594L2.41511 8.97301L3.407 8.84594ZM5.50231 15.7491L5.91268 16.661L5.50231 15.7491ZM2.6078 16.6701L2.33899 17.6332L2.6078 
  16.6701ZM2.24158 12.7986L1.2933 12.4811H1.2933L2.24158 12.7986ZM1.61359 15.7704L0.681972 16.1339L1.61359 15.7704ZM15.6367 
  6.81135L15.2263 7.72327L15.6367 6.81135ZM18.1896 8.33514L17.2932 8.77836L18.1896 8.33514ZM15.6367 11.1886L16.0471 12.1005L15.6367
  11.1886ZM18.1896 9.66478L19.0861 10.108L18.1896 9.66478ZM5.48483 2.24303L5.07446 3.15495L5.48483 2.24303ZM2.59799 1.32468L2.86605
   2.28808L2.59799 1.32468ZM2.22215 5.18767L1.27306 5.50269L2.22215 5.18767ZM1.60365 2.22209L2.53461 2.58722L1.60365 2.22209ZM9.5003 
   8.00001H3.41872V10H9.5003V8.00001ZM5.07446 3.15495L15.2263 7.72327L16.0471 5.89943L5.89519 1.33111L5.07446 3.15495ZM15.2263 
   10.2767L5.09195 14.8371L5.91268 16.661L16.0471 12.1005L15.2263 10.2767ZM3.18985 13.116L4.19461 10.1147L2.29806 9.47976L1.2933 12.4811L3.18985 
   13.116ZM4.19738 7.96428L3.17123 4.87266L1.27306 5.50269L2.2992 8.59431L4.19738 7.96428ZM4.19461 10.1147C4.27677 9.86923 4.3638 9.62278 4.39807 
   9.36061L2.41494 9.10136C2.41156 9.12722 2.40436 9.16225 2.29806 9.47976L4.19461 10.1147ZM2.2992 8.59431C2.40468 8.9121 2.41179 8.94714 2.41511 8.97301L4.3989 8.71887C4.3653 8.45661 4.27891 8.20994 4.19738 7.96428L2.2992 8.59431ZM4.39807 9.36061C4.42591 9.14762 4.42619 8.93193 4.3989 8.71887L2.41511 8.97301C2.42057 9.01562 2.42051 9.05876 2.41494 9.10136L4.39807 9.36061ZM5.09195 14.8371C4.28342 15.201 3.73922 15.4448 3.33112 15.5862C2.89726 15.7365 2.82305 15.6919 2.87661 15.7069L2.33899 17.6332C2.91585 17.7942 3.4985 17.6448 3.98586 17.476C4.49899 17.2982 5.1404 17.0085 5.91268 16.661L5.09195 14.8371ZM1.2933 12.4811C1.02446 13.2842 0.80012 13.9512 0.674356 14.4795C0.554908 14.9813 0.464303 15.5759 0.681972 16.1339L2.5452 15.407C2.56541 15.4588 2.51365 15.3894 2.61999 14.9427C2.72001 14.5225 2.90839 13.9568 3.18985 13.116L1.2933 12.4811ZM2.87661 15.7069C2.72513 15.6646 2.60236 15.5535 2.5452 15.407L0.681972 16.1339C0.967768 16.8665 1.58158 17.4219 2.33899 17.6332L2.87661 15.7069ZM15.2263 7.72327C16.016 8.07861 16.545 8.31775 16.9119 8.52423C17.3002 8.74274 17.3167 8.82578 17.2932 8.77836L19.0861 7.89193C18.8242 7.36223 18.3357 7.03053 17.8928 6.7813C17.4286 6.52005 16.8004 6.23843 16.0471 5.89943L15.2263 7.72327ZM16.0471 12.1005C16.8004 11.7615 17.4286 11.4799 17.8928 11.2186C18.3357 10.9694 18.8242 10.6377 19.0861 10.108L17.2932 9.22157C17.3167 9.17415 17.3002 9.25718 16.9119 9.47569C16.545 9.68218 16.016 9.92131 15.2263 10.2767L16.0471 12.1005ZM17.2932 8.77836C17.3623 8.91803 17.3623 9.0819 17.2932 9.22157L19.0861 10.108C19.4313 9.40965 19.4313 8.59027 19.0861 7.89193L17.2932 8.77836ZM5.89519 1.33111C5.12531 0.984662 4.48566 0.695758 3.97376 0.518436C3.48729 0.349925 2.90595 0.201 2.32992 0.361277L2.86605 2.28808C2.81282 2.30289 2.88688 2.25854 3.31913 2.40827C3.72593 2.54918 4.26832 2.79219 5.07446 3.15495L5.89519 1.33111ZM3.17123 4.87266C2.89276 4.03366 2.70646 3.46928 2.60786 3.0502C2.50309 2.60492 2.55478 2.53577 2.53461 2.58722L0.672689 1.85697C0.454378 2.4136 0.543109 3.00711 0.661019 3.50826C0.785094 4.0356 1.00711 4.70142 1.27306 5.50269L3.17123 4.87266ZM2.32992 0.361277C1.57323 0.571827 0.959473 1.12575 0.672689 1.85697L2.53461 2.58722C2.59196 2.44097 2.71471 2.33019 2.86605 2.28808L2.32992 0.361277Z" fill="#0176E4"/>
</Svg> 
            </TouchableOpacity  >

            <TouchableOpacity onPress={() => {
            setVisible1(true);
          }}   style={{marginLeft:5}} >
            <MaterialIcons
                  name='sentiment-satisfied-alt'
                  size={24  }
                  color='#0176E4'
                />
            </TouchableOpacity>
                
      </View>   
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'white',
  },
  postHeader: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  postHeaderText: { fontSize: 25, fontWeight: 'bold' },
  postSection: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  userHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarImage: { width: 40, height: 40 },
  userName: { fontWeight: 'bold' },
  date: { color: '#A8A39F' },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  post: { fontSize: 18 },
  reactionData: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE6E0',
    padding: 10,
  },
  reactionSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: { color: 'grey', fontSize: 28 },
  heartClicked: { color: 'red', fontSize: 28 },
  reactionText: {
    marginLeft: 10,
    color: 'grey',
  },

  reactionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  textInput: {
   
    marginLeft:20,
    backgroundColor:'#E9E9E9',
    width:'75%',marginTop:12,
    justifyContent:'center',
    paddingBottom: 10,
    fontSize: 14,color:'#7F7F7F'
  },
  userHeader: {
    
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
   width:'100%',
   marginLeft:10,
  },
  postImage: {
   
    height:(Dimensions.get('window').width),
    width:'110%',
    flexDirection:'column',
    resizeMode: 'contain',
    maxHeight: 480,
    marginTop:4,left:-10,
    top: -10,
     
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 8,top:-5
  },
  userfeelings: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2B2B2B',
  },
  isWithContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  isWith: {
    fontSize: 14
  },
  isWithUserName: { marginLeft: 5, fontSize: 14, fontWeight: 'bold',fontFamily:'Roboto' },
  avatarImage: { width: 48, height: 48, borderRadius: 66,shadowRadius:6 },


  date: { color: '#A8A39F',fontSize:12, },
  post: {
    marginTop:0,
    fontSize: 14,
    marginBottom: 4,
   marginLeft:11,
    paddingVertical:4
    
  },
  emojis: { fontSize: 14 },

  reactionData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A2D8EB',
    padding: 10,
    top: -20,
  },
  reactionSection: {
   
    flexDirection: 'row',
    alignSelf: 'center',
    
    alignItems: 'center',
    width: 50,

  },
  option: {
    backgroundColor:'red',
    
  
  },
  heart: { color: 'grey', fontSize: 30 },
  heartClicked: { color: 'red', fontSize: 28 },
  reactionText: {
    color: '#0176E4',
    fontSize: 16,
    marginStart: 10,
  },
  reactionTextPi: {
    fontWeight:'500',
    color: '#FF6196',
    fontSize: 16,
    marginStart: 10,
  },

  reactionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop:0,left:-10,
  },
  viewOption:{
    height: 52,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 16,
  },
  txtBlue:{
    fontSize: 16,
    paddingStart: 8,
    color:'#0176E4'
  },
  txtRed:{
    fontSize: 16,
    paddingStart: 8,
    color: 'red'
  },
  date: { fontSize: 12, marginTop: 2 ,marginRight:10,  },
  date3 : { fontSize: 12, marginTop: 2 ,marginRight:10, fontWeight: 'bold'  },
  date1 : { fontSize: 12, marginTop: 2 ,marginRight:10, fontWeight: 'bold',color:'blue'  },
  date2: { fontSize: 12, marginTop: 2 ,marginRight:7,marginLeft:30, },

});

export { OpenPost };
