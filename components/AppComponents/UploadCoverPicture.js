import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

function UploadCoverPicture({ profileId }) {
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
        coverPicture: downloadURL,
      });
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(`coverPictures/${profileId}/`);
    await ref.put(blob);

    return ref.getDownloadURL();
  };

  return (
    <TouchableOpacity onPress={pickImage} style={styles.uploadContainer}>
      
        <Text style={{
          color:"black",
          fontSize: 16,
          fontWeight:'bold',
          textAlign:'center'
        }}>
          Tải lên ảnh bìa
        </Text>
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  uploadContainer: {
    top: -90,
    color:'black',
  },
});

export { UploadCoverPicture };
