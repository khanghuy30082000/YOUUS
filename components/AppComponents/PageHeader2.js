import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';

function PageHeader2({ placeholder, onPressNavigation }) {
  const history = useHistory();

  return (
    <TouchableOpacity onPress={onPressNavigation}>
      <View style={styles.postHeader}>
        <Feather
          name='chevron-left'
          size={25}
          color='black'
          style={{ justifyContent: 'center', alignSelf: 'flex-start' }}
        />
        <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center',width:'100%' }}>
          <Text style={styles.requestHeaderText}>{placeholder}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postHeader: {

    backgroundColor: '#ffffff',
    elevation: 20,
    shadowColor: 15,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 12,
  
  },
  requestHeaderText: {
  
    elevation: 20,
        marginRight:30,
    shadowColor: 15,
    fontSize: 20,
    
    fontWeight: '700',
    color: '#0176E4',

  },
});

export { PageHeader2 };
