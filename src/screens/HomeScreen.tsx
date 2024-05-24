import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import bookServices from '../services/bookServices';
import BooksList from '../components/BooksList';
import { Volume } from '../constants/interface/InterfaceConstants';

const HomeScreen = () => {
  const [searchedBooks, setSearchedBooks] = useState<Volume[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setRefreshing(true);
    bookServices
      .getVolumes('dogs')
      .then(res => {
        setSearchedBooks(res.data.items);
        setRefreshing(false);
      })
      .catch(err => {
        console.log(err);
        setRefreshing(false);
      });
  };

  const renderItem = ({ item }: { item: Volume }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.bookId}>{item.id}</Text>
      {/* Additional book details can be rendered here */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>
      <BooksList />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchedBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onRefresh={fetchBooks}
        refreshing={refreshing}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          // Implement load more functionality if needed
        }}
        ListEmptyComponent={<View><Text>No books found</Text></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookId: {
    fontSize: 16,
  },
});

export default HomeScreen;
