import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const SearchBook = ({handleSearch}:{handleSearch:Function}) => {
    
  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search books..."
        onChangeText={(query:string)=>handleSearch(query)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor:'white',padding:10
  },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
      },
});

export default SearchBook;
