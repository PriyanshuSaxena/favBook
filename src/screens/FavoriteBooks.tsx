import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FavoriteIcon from '../svg/FavoriteIcon';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import BookCard from '../components/BookCard';
import {Volume} from '../constants/interface/InterfaceConstants';

const FavoriteBooks = () => {
  const favBooks = useSelector((state: RootState) => state.favBookList.list);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={favBooks}
        renderItem={({item}: {item: Volume}) => <BookCard bookDetails={item} isFavScreen={true} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View>
            <Text>No books found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    // padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  bookId: {
    fontSize: 16,
  },
});

export default FavoriteBooks;
