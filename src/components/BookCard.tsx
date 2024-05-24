import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Volume} from '../constants/interface/InterfaceConstants';
import LottieView from 'lottie-react-native';
import FavoriteIcon from '../svg/FavoriteIcon';
import {AppDispatch, RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {removeBookById, setFavoriteBooks} from '../redux/favoriteBooksSlice';

const BookCard = ({
  bookDetails,
  isFavScreen,
}: {
  bookDetails: Volume;
  isFavScreen?: boolean;
}) => {
  const [favoriteMarked, setFavoriteMarked] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const favBooks = useSelector((state: RootState) => state.favBookList.list);

  useEffect(() => {
    if (isFavScreen) {
      setFavoriteMarked(true);
    }else{
      let filterData = favBooks.filter((item)=>item.id==bookDetails.id);
      if (filterData.length==0) setFavoriteMarked(false)
      else  setFavoriteMarked(true)
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
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        margin: 6,
        elevation: 3,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Image
        resizeMode="cover"
        style={{width: 80, height: 80, borderRadius: 5}}
        source={
          bookDetails?.volumeInfo?.imageLinks?.thumbnail
            ? {uri: bookDetails?.volumeInfo?.imageLinks?.thumbnail}
            : require('../assets/pngImage/defaultBook.jpg')
        }
      />

      <View
        style={{
          flexShrink: 1,
          flexGrow: 1,
          paddingLeft: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            numberOfLines={1}
            style={{
              flexGrow: 1,
              flexShrink: 1,
              fontWeight: 'bold',
              color: '#000',
              fontSize: 18,
            }}
            ellipsizeMode="tail">
            {bookDetails?.volumeInfo?.title}
          </Text>
          <TouchableOpacity onPress={setFav}>
            <FavoriteIcon isFocused={isFavScreen ? true : favoriteMarked} />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={1} style={{flexShrink: 1}}>
          <Text style={{fontWeight: 'bold', color: '#000'}}>Author:</Text>{' '}
          {bookDetails?.volumeInfo?.authors}
        </Text>
        <TouchableOpacity style={{alignItems: 'flex-end'}}>
          <Text
            style={{
              borderColor: '#2088F3',
              borderWidth: 1,
              padding: 2,
              borderRadius: 6,
              paddingHorizontal: 30,
              color: '#2088F3',
              marginTop: 5,
            }}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BookCard;
