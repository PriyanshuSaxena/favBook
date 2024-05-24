import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import bookServices from '../services/bookServices';
import {Volume} from '../constants/interface/InterfaceConstants';
import SearchIcon from '../svg/SearchIcon';
import BookCard from '../components/BookCard';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const HomeScreen = () => {
  const [searchedBooks, setSearchedBooks] = useState<Volume[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const favBooks = useSelector((state: RootState) => state.favBookList.list);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setRefreshing(true);
    bookServices
      .getVolumes('dogs')
      .then(res => {
        setSearchedBooks(res.data.items);
        console.log(JSON.stringify(res.data.items), '=====');
        setRefreshing(false);
      })
      .catch(err => {
        console.log(err);
        setRefreshing(false);
      });
  };

  const renderItem = ({item}: {item: Volume}) => (
    <BookCard bookDetails={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchedBooks}
        extraData={favBooks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onRefresh={fetchBooks}
        refreshing={refreshing}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          // Implement load more functionality if needed
        }}
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

export default HomeScreen;
