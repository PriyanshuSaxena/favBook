import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import BookCard from '../components/BookCard';
import {Volume} from '../constants/interface/InterfaceConstants';
import LottieView from 'lottie-react-native';
import DetailModal from '../components/DetailModal';

const FavoriteBooks = () => {
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Volume | undefined>();
  const favBooks = useSelector((state: RootState) => state.favBookList.list);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={favBooks}
        renderItem={({item}: {item: Volume}) => (
          <BookCard
            bookDetails={item}
            isFavScreen={true}
            showDetails={() => {
              setDetailModal(true);
              setSelectedBook(item);
            }}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <LottieView
              style={styles.emptyListAnimation}
              source={require('../assets/animations/EmptyList.json')}
              autoPlay
              loop
            />
          </View>
        }
      />
      <DetailModal
        bookDetails={selectedBook}
        modalVisible={detailModal}
        onModalClose={() => setDetailModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListAnimation: {
    height: 350,
    width: 350,
  },
});

export default FavoriteBooks;
