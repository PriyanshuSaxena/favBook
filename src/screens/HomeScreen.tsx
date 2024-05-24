import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import bookServices from '../services/bookServices';
import {Volume} from '../constants/interface/InterfaceConstants';
import BookCard from '../components/BookCard';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import SearchBook from '../components/SearchBook';
import LottieView from 'lottie-react-native';
import {debounce} from 'lodash';
import DetailModal from '../components/DetailModal';

const HomeScreen = () => {
  const [searchedBooks, setSearchedBooks] = useState<Volume[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [skip, setSkip] = useState<number>(0);
  const favBooks = useSelector((state: RootState) => state.favBookList.list);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sort, setSort] = useState('newest');
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Volume>();

  useEffect(() => {
    if (searchQuery) fetchBooks(skip);
    else setSearchedBooks([]);
  }, [searchQuery]);

  const SortModal = () => {
    return (
      <Modal visible={showSortModal} transparent>
        <TouchableOpacity
          onPress={() => setShowSortModal(false)}
          style={styles.dullModalStyle}
        />
        <View style={styles.sortListStyles}>
          <Text style={styles.sortHeading}>Sort By</Text>
          <TouchableOpacity
            onPress={() => {
              setSort('newest');
              setSearchedBooks([]);
              setSkip(0);
              fetchBooks(0);
            }}>
            <Text
              style={
                sort != 'relevance'
                  ? {color: 'blue', fontWeight: '600', paddingVertical: 5}
                  : {paddingVertical: 5}
              }>
              Publication Date
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSort('relevance');
              setSearchedBooks([]);
              setSkip(0);
              fetchBooks(0);
            }}>
            <Text
              style={
                sort == 'relevance'
                  ? {color: 'blue', fontWeight: '600', paddingVertical: 5}
                  : {paddingVertical: 5}
              }>
              Relevance
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const fetchBooks = (skip: number) => {
    setRefreshing(true);
    setSort(pre => {
      bookServices
        .getVolumes(searchQuery, skip, pre)
        .then(res => {
          skip === 0
            ? setSearchedBooks(res.data.items)
            : setSearchedBooks([...searchedBooks, ...res.data.items]);
          setRefreshing(false);
        })
        .catch(err => {
          console.log(err);
          setRefreshing(false);
        });
      return pre;
    });
  };

  const renderItem = ({item}: {item: Volume}) => (
    <BookCard
      bookDetails={item}
      showDetails={() => {
        setDetailModal(true);
        setSelectedBook(item);
      }}
    />
  );

  const onSearching = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowSortModal(true)}
        style={styles.sortContainer}>
        <Image
          source={require('../assets/pngImage/sort.png')}
          style={styles.sortIcon}
        />
      </TouchableOpacity>
      <SearchBook
        handleSearch={debounce((query: string) => {
          onSearching(query);
        }, 200)}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchedBooks}
        extraData={favBooks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onEndReachedThreshold={0.2}
        onRefresh={() => {
          fetchBooks(0);
          setSkip(0);
        }}
        onEndReached={() => {
          if (searchedBooks.length >= 20) {
            fetchBooks(skip + 20);
            setSkip(skip + 20);
          }
        }}
        ListEmptyComponent={
          <View>
            <LottieView
              style={styles.searchAnimation}
              source={require('../assets/animations/SearchBook.json')}
              autoPlay
              loop
            />
          </View>
        }
      />
      <SortModal />
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
  sortContainer: {
    backgroundColor: 'white',
    borderRadius: 40,
    height: 50,
    width: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    right: 10,
    zIndex: 2,
    elevation: 3,
  },
  sortIcon: {
    height: '50%',
    width: '50%',
  },
  searchAnimation: {
    height: 350,
    width: 350,
    alignSelf: 'center',
  },
  dullModalStyle: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
  },
  sortListStyles: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    zIndex: 2,
    position: 'absolute',
    bottom: 80,
    right: 60,
  },
  sortHeading: {
    fontWeight: '600',
    marginBottom: 10,
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
