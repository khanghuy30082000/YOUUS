import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useHistory } from 'react-router-native';
import { StyleSheet } from 'react-native';
import { AntDesign, Feather, Ionicons, Entypo, FontAwesome, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons"
import { ScrollView } from 'react-native';

const trang = "white";
const Xanh = "#0176E4";

const file = () => {

  const history = useHistory();
  const gotoBack = () => {
    history.goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor:trang, flex: 1}}>
      <View style={styles.viewHeader}>
        <Feather
          onPress={gotoBack}
          name='chevron-left'
          size={25}
          color='black'
          style={{ marginStart: 5, flex: 0.5 }}
        />
        <Text style={styles.textHeader}>Ảnh, file & link</Text>
      </View>
      <ScrollView style={{ flex: 0.8}}/>
    </SafeAreaView>
  )
}

export default file

const styles = StyleSheet.create({
  viewHeader: {
    flex: 0.1,
    backgroundColor: 'white',
    height: 44,
    width: "100%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textHeader: {
    color: '#0176E4',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
})


