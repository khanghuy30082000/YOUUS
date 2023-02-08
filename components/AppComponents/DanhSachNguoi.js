import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import People from './People'

const DanhSachNguoi = () => {
  return (
    <View >
      <View style={styles.viewBgChuCai}>
        <Text style={styles.txtChuCai}>A</Text>
      </View>
      <People/>
      <People/>
      <People/>
      <View style={styles.viewBgChuCai}>
        <Text style={styles.txtChuCai}>B</Text>
      </View>
      <People/>
      <People/>
      <People/>
      <View style={styles.viewBgChuCai}>
        <Text style={styles.txtChuCai}>C</Text>
      </View>
      <People/>
      <People/>
      <People/>
    </View>
  )
}

export default DanhSachNguoi

const styles = StyleSheet.create({
  viewBgChuCai:{
    backgroundColor:'#0176E4',
    height:24,
    width:"100%",
    borderRadius: 5,
    justifyContent:'center',
    paddingStart: 20,
    marginBottom: 5,
  },
  txtChuCai:{
    color:'white',
          fontSize: 16,
          fontWeight:'bold'
  },

})