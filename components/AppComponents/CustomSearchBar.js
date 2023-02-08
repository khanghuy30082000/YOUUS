import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import algoliasearch from 'algoliasearch/lite';
import { useHistory } from 'react-router-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { FlatList } from 'react-native-gesture-handler';
const client = algoliasearch('ZSIY5PSYK3', 'fecd49d40a71be386353ecbc04b80c33');
const index = client.initIndex('accounts');

function CustomSearchBar(props) {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInput = (inputText) => {
    setSearchInput(inputText);
  };

  useEffect(() => {
    if (searchInput) {
      index.search(searchInput).then((results) => {
        setSearchResults(results.hits);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

  const resultArray = searchResults.map((data) => {
    return data.account;
  });

  const getUserIdOfSearch = searchResults.map((data) => {
    return data.objectID;
  });

  const openProfile = (getUserIdOfSearch) => {
    history.push(`/profile/${getUserIdOfSearch}`);
  };

  return (
    <View style={styles.toolsSection}>
      <TextInput
        style={styles.searchInput}
        name='text'
        placeholder='Tìm kiếm bạn..'
        placeholderTextColor='#A8A39F'
        onChangeText={handleSearchInput}
      ></TextInput>
      <TouchableOpacity onPress={() => openProfile(getUserIdOfSearch)}>
        <Text style={styles.searchInput}>{resultArray}</Text>
      </TouchableOpacity>
      <FlatList>
        
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  toolsSection: {
    backgroundColor: 'white',
    width: 300,
    right: 20,
    borderRadius: 5,
    right: 90,
    top: 70,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  searchInput: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#6CA9D6',
  },
  resultList: {
    backgroundColor: 'white',
    top: 10,
    right: 90,
    padding: 10,
  },
});

export { CustomSearchBar };
