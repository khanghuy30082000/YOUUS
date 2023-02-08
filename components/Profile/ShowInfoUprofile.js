import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useHistory } from 'react-router-native';
import { PageHeader2 } from '../AppComponents/PageHeader2'

const ShowInfoUprofile = (props) => {
    const history = useHistory();
    const goBack = () => {
        history.goBack()
      };
  return (
    <SafeAreaView style={{backgroundColor:'#ffffff',height:'100%'}}>
      <PageHeader2
      placeholder=''
      onPressNavigation={goBack}
    />
    {/* <Text>ekweewrwer</Text> */}
   </SafeAreaView>
  )
}

export default ShowInfoUprofile

const styles = StyleSheet.create({})