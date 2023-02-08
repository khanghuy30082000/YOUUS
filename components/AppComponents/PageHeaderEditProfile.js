import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { Feather } from '@expo/vector-icons';

function PageHeaderEditProfile({ placeholder, onPressNavigation }) {
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
        <View style={{ justifyContent: 'center', alignSelf: 'flex-start', alignItems: 'center' }}>
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 12,
  
  },
  requestHeaderText: {
    marginLeft: '42%',
    elevation: 20,

    shadowColor: 15,
    fontSize: 20,
    
    fontWeight: '700',
    color: '#0176E4',

  },
});

export { PageHeaderEditProfile};
