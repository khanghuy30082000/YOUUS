import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

function UploadImageModal({ profileId }) {
  const db = firebase.firestore();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const downloadURL = await uploadImage(result.uri);
      db.collection('accounts').doc(profileId).update({
        profilePicture: downloadURL,
      });
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(`profilePictures/${profileId}`);
    await ref.put(blob);

    return ref.getDownloadURL();
  };

  return (
    <TouchableOpacity onPress={pickImage} >
      <Text style={{
        color: "black",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        Tải lên
      </Text>
    </TouchableOpacity>
  );
}

export { UploadImageModal };
