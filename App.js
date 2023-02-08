import React, { useEffect,useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Redirect, Route, useHistory } from 'react-router-native';
import { Login } from './components/Logins/Login';
import { SignUp } from './components/Logins/SignUp';
import ResetPasswordScreen from './components/Logins/ResetPasswordScreen';
import { Dashboard } from './components/Wall/Dashboard';
import { UserContext } from './components/Context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase/compat/app';


import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";
import { Profile } from './components/Profile/Profile';
import { OpenPost } from './components/Posts/OpenPost';
import { EditProfile } from './components/Profile/EditProfile';
import { AddPost } from './components/Posts/AddPost';
import { FeelingsActivities } from './components/Posts/FeelingsActivities';
import { FriendRequests } from './components/Friends/FriendRequests';
import { FriendsList } from './components/Friends/FriendsList';
import ChatScreens from './components/Chats/ChatScreens';
import Performances from './components/Performances/Performances';
import System from './components/Profile/System';

import Chat from './components/Chats/Chat';
import Donerestpassword from './components/Logins/Donerestpassword';
import { createContext } from 'react';
import CongratulaterRegister from './components/Logins/CongratulateDoneRegister';
import VerifyRegister from './components/Logins/VerifyRegister';
import AddChat from './components/Chats/AddChat';
import TabNhom from './components/Chats/TabNhom';
import TabCaNhan from './components/Chats/TabCaNhan';
import Splash from './components/SplashScreen/Splash'
import notifis from './components/Wall/notifis';
import InfoGroupChat from './components/Chats/InforChatbot/InfoGroupChat';
import ChatOnetoOne from './components/Chats/ChatOnetoOne';
import SearchScreen from './components/Search/SearchScreen';
import CaNhan from './components/Profile/CaNhan';
import Media from './components/Media/Media';
import InfChatOne from './components/Chats/InforChatbot/InfChatOne';
import file from './components/Chats/File/file';
import SearchChatCaNhan from './components/AppComponents/SearchChatItemCaNhan';
import Member from './components/Chats/MemberGroupChat/Member';
import Vote from './components/Chats/VoteGroupChat/Vote';
import EditProfileOption from './components/Profile/EditProfileOption';
import EditInfoProfile from './components/Profile/EditInfoProfile';
import EditAvatarCover from './components/Profile/EditAvatarCover';
import OpenImage from './components/AppComponents/OpenImage';
import PrivatePermissions from './components/Profile/PrivatePermissions';
import SecurityScreen from './components/Profile/SecurityScreen';
import OpenImageCover from './components/AppComponents/OpenImageCover';
import SingleMedia from './components/Media/SingleMedia';
import { FeelingsAction } from './components/Posts/FeelingsAction';
import { CustomModal } from './components/Posts/CustomModal';
import { CustomModal2 } from './components/Posts/CustomModal2';
import Stories from './components/Story/Stories';
import AddStories from './components/Story/AddStories';
import VideoInPost from './components/Profile/VideoInPost';
import ImageInPost from './components/Profile/ImageInPost';
import PostImage from './components/Posts/PostImage';
import CallChatOne from './components/Chats/Call/CallChatOne/CallChatOne';
import CallVideo from './components/Chats/Call/CallChatOne/CallVideo';
import Call from './components/Chats/Call/CallGroup/Call';
import AcceptCallOne from './components/Chats/Call/CallChatOne/AcceptCallOne';
import ViewImageChatOne from './components/Chats/ViewImage/ViewImageChatOne';
import AnhChatGroup from './components/Chats/ViewFile/ChatGroup/AnhChatGroup';
import AnhChatOne from './components/Chats/ViewFile/ChatOne/AnhChatOne';
import LinkChatOne from './components/Chats/ViewFile/ChatOne/LinkChatOne';
import LinkChatGroup from './components/Chats/ViewFile/ChatGroup/LinkChatGroup'
import ShowInfoUprofile from './components/Profile/ShowInfoUprofile';
var firebaseConfig = {
  apiKey: "AIzaSyBt8QjMYDr-HdGjvcuS04v5Wld_tlAtqiQ",
  authDomain: "youus-72e81.firebaseapp.com",
  projectId: "youus-72e81",
  storageBucket: "youus-72e81.appspot.com",
  messagingSenderId: "1018078844387",
  appId: "1:1018078844387:web:729a7f2ddb6de272657cd6",
  measurementId: "G-9MCQ00R26Z"
};
let app;

if (!firebase.apps.length ) {
  app = firebase.initializeApp(firebaseConfig)
 
} else {
  app = firebase.app();

}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

export default function App() {
  const [user, setUser] = useState(null);
  const [Chats , setChats] = useState([]);
  const history = useHistory();

 
if (!firebase.apps.length ) {
  app = firebase.initializeApp(firebaseConfig)
 
} else {
  app = firebase.app();

}
  // const users = firebase2.auth.currentUser.uid;
  // console.log(users);
  // setUser(users);
  // if(firebase.auth().currentUser.uid===undefined){
  //   return users;
  // }
  // const db = firebase.firestore();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);

    });
  }, []);

  return (
    <SafeAreaProvider>
    <UserContext.Provider value={user}>
      <NativeRouter>
        <View style={styles.container}>
          {user ? (
            <Redirect from='/' to='/dashboard' />
          ) : (
            <Route exact path='/' component={Splash} />
          )}
       
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/verify' component={VerifyRegister} />
          <Route exact path='/congratulate' component={CongratulaterRegister} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/resetpassword' component={ResetPasswordScreen} />
          <Route exact path='/doneresetpassword' component={Donerestpassword} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/profile/:id' component={Profile} />
          <Route exact path='/system' component={System} />
          <Route exact path='/editProfile/:id' component={EditProfile} />
          <Route exact path='/addPost' component={AddPost} />
          <Route exact path='/chats' component={ChatScreens} />
          <Route exact path='/performances' component={Performances} />
          <Route exact path='/post/:id/' component={OpenPost} />
          <Route exact path='/addChat' component={AddChat} />
          <Route exact path='/TabNhom' component={TabNhom} />
          <Route exact path='/TabCaNhan' component={TabCaNhan} />
          <Route exact path='/chat' component={Chat} />
          <Route exact path='/notis' component={notifis} />
          <Route exact path='/infGrChat' component={InfoGroupChat}/>
          <Route exact path='/search' component={SearchScreen} user={user} option={({route}) =>({title: route.params.userName})}/>
          <Route exact path='/CaNhan/:id' component={CaNhan}/>
          <Route exact path='/chatone' component={ChatOnetoOne} user={user} option={({route}) =>({title: route.params.userName})}/>
          <Route exact path='/media' component={Media}/>
          <Route exact path='/InfChatOne' component={InfChatOne} />
          <Route exact path='/file' component={file} />
          <Route exact path='/searchCaNhan' component={SearchChatCaNhan}/>
          <Route exact path='/MemmberGroupChat' component={Member} />
          <Route exact path='/Vote' component={Vote} />
          <Route exact path='/EditprofileOption' component={EditProfileOption} />
          <Route exact path='/EditAvatarCover' component={EditAvatarCover} />
          <Route exact path='/EditInfoprofile' component={EditInfoProfile} />
          <Route exact path='/OpenImage' component={OpenImage} />
          <Route exact path='/SecurityScreen' component={SecurityScreen} />
          <Route exact path='/PrivatePermissions' component={PrivatePermissions} />
          <Route exact path='/OpenImageCover' component={OpenImageCover} />
          <Route exact path='/SingleMedia' component={SingleMedia} />
          <Route exact path='/stories' component={Stories} />
          <Route exact path='/addstories' component={AddStories} />
          <Route exact path='/CallOne' component={CallChatOne}/>
          <Route exact path='/CallVideoOne' component={CallVideo} />
          <Route exact path='/Call' component={Call} />
          <Route exact path='/AcceptCallOne' component={AcceptCallOne}/>
          <Route exact path='/ViewImageChatOne' component={ViewImageChatOne}/>
          <Route exact path='/AnhChatGroup' component={AnhChatGroup}/>
          <Route exact path='/AnhChatOne' component={AnhChatOne} />
          <Route exact path='/LinkChatOne' component={LinkChatOne}/>
          <Route exact path='/LinkChatGruop' component={LinkChatGroup} />
          <Route
            exact
            path='/feelingsActivities'
            component={FeelingsActivities}
          />
           <Route
            exact
            path='/feelingsAction'
            component={FeelingsAction}
          />
          <Route exact path='/friendRequests/:id/' component={FriendRequests} />
          <Route exact path='/customodal' component={CustomModal} />
          <Route exact path='/customodal2' component={CustomModal2} />
          <Route exact path='/friends/:id/' component={FriendsList} />
          <Route exact path='/ImageInPost' component={ImageInPost} />
          <Route exact path='/VideoInPost' component={VideoInPost} />
          <Route exact path='/PostImage' component={PostImage} />
          <Route exact path='/showinfoprofile' component={ShowInfoUprofile} />

        </View>
      </NativeRouter>
    </UserContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE6E0',
  },
});
