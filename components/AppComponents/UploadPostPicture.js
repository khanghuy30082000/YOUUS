import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

function UploadPostPicture({ profileId }) {
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
      db.collection('posts').doc(profileId).add({
        postPicture: downloadURL,
      });
    }
  };
// upload ảnh
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(`postPictures/${Math.random()*100}`);
    await ref.put(blob);

    return ref.getDownloadURL();
  };

  return (
    <View style={styles.uploadContainer}>
      <Button title='Thêm ảnh' onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  uploadContainer: {},
});

export { UploadPostPicture };
