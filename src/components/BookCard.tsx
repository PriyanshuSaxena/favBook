import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Volume} from '../constants/interface/InterfaceConstants';
import FavoriteIcon from '../svg/FavoriteIcon';
import {AppDispatch, RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {removeBookById, setFavoriteBooks} from '../redux/favoriteBooksSlice';

const BookCard = ({
  bookDetails,
  isFavScreen,
  showDetails,
}: {
  bookDetails: Volume;
  isFavScreen?: boolean;
  showDetails: Function;
}) => {
  const [favoriteMarked, setFavoriteMarked] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const favBooks = useSelector((state: RootState) => state.favBookList.list);

  useEffect(() => {
    if (isFavScreen) {
      setFavoriteMarked(true);
    } else {
      let filterData = favBooks.filter((item) => item.id == bookDetails.id);
      setFavoriteMarked(filterData.length !== 0);
    }
  }, [favBooks]);

  const setFav = () => {
    setFavoriteMarked(!favoriteMarked);
    if (!favoriteMarked) {
      dispatch(setFavoriteBooks(bookDetails));
    } else {
      dispatch(removeBookById(bookDetails.id));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        resizeMode="cover"
        style={styles.imgDimensions}
        source={
          bookDetails?.volumeInfo?.imageLinks?.thumbnail
            ? {uri: bookDetails?.volumeInfo?.imageLinks?.thumbnail}
            : require('../assets/pngImage/defaultBook.jpg')
        }
      />

      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            style={styles.title}
            ellipsizeMode="tail">
            {bookDetails?.volumeInfo?.title}
          </Text>
          <TouchableOpacity onPress={setFav}>
            <FavoriteIcon isFocused={isFavScreen ? true : favoriteMarked} />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={1} style={styles.author}>
          <Text style={styles.authorLabel}>Author:</Text> {bookDetails?.volumeInfo?.authors}
        </Text>
        <TouchableOpacity onPress={() => showDetails()} style={styles.detailsButtonContainer}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 6,
    elevation: 3,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imgDimensions: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  detailsContainer: {
    flexShrink: 1,
    flexGrow: 1,
    paddingLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    flexShrink: 1,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  author: {
    flexShrink: 1,
  },
  authorLabel: {
    fontWeight: 'bold',
    color: '#000',
  },
  detailsButtonContainer: {
    alignItems: 'flex-end',
  },
  detailsButtonText: {
    borderColor: '#2088F3',
    borderWidth: 1,
    padding: 2,
    borderRadius: 6,
    paddingHorizontal: 30,
    color: '#2088F3',
    marginTop: 5,
  },
});

export default BookCard;
