import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';


function PageHeaderLogin({ placeholder,placeholder2, onPressNavigationDN,onPressNavigationDK }) {
  const history = useHistory();

  return (

    <View>
    <View style={{flexDirection:'row'}}>
 <TouchableOpacity onPress={onPressNavigationDN}>
      <View style={styles.postHeader}>
       
        <Text style={styles.requestHeaderText}>{placeholder}</Text>
        
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPressNavigationDK}>
      <View style={styles.postHeader2}>
       
       
        <Text style={styles.requestHeaderText2}>{placeholder2}</Text>

      </View>
    </TouchableOpacity>

    </View>
    </View>
    

  );
}

const styles = StyleSheet.create({
  postHeader: {
    
    backgroundColor: '#f8ffff',
    elevation:20,
    shadowColor:15,
    display: 'flex',
    flexDirection: 'row',
    paddingTop:12,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    paddingBottom:12,
    borderBottomColor:'#0176E4',
    borderBottomWidth:1,
    
  },
  postHeader2: {
    
    backgroundColor: '#f8ffff',
    elevation:20,
    shadowColor:15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:12,
    textAlign:'center',
    paddingBottom:12,
    
    
  },
  requestHeaderText: {
    width:'50%',
    elevation:20,
    shadowColor:15,
    textAlign:'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',
    color: '#0176E4',
    alignItems:'center',
    

  },
  requestHeaderText2: {
    width:'50%',
    elevation:20,shadowColor:15,

    fontSize: 18,
    fontWeight: 'bold',
    color: '#BFBFBF',

  },
});

export { PageHeaderLogin };
