import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useHistory } from 'react-router-native';


const ViewImageChatOne = (props) => {
  const history = useHistory();
  const gotoBack = () => {
    history.goBack();
  };

  const hi = props.location.state
  console.log('xaol', hi)
  return (
    <View >
      <Text onPress={gotoBack}>ViewImageChatOne</Text>
    </View>
  )
}

export default ViewImageChatOne

const styles = StyleSheet.create({})