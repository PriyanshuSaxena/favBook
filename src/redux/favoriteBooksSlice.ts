import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Volume} from '../constants/interface/InterfaceConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for the slice state
interface favoriteBookList {
  list: Volume[];
}

// Define the initial state using that type
const initialState: favoriteBookList = {
  list: [],
};

export const favoriteBooksSlice = createSlice({
  name: 'favoriteBookList',
  initialState,
  reducers: {
    loadFav: (state,action: PayloadAction<Volume[]>) => {
      state.list = action.payload
    },
    setFavoriteBooks: (state, action: PayloadAction<Volume>) => {
      state.list.push(action.payload);
      AsyncStorage.setItem("favBooks", JSON.stringify(state.list));
    },
    removeBookById: (state, action: PayloadAction<string>) => {
      let copyOfFavoriteBooks = [...state.list];
      let index = copyOfFavoriteBooks.findIndex((items: Volume) => {
        return items.id === action.payload;
      });
      copyOfFavoriteBooks.splice(index, 1);
      state.list = copyOfFavoriteBooks;
      AsyncStorage.setItem("favBooks", JSON.stringify(copyOfFavoriteBooks));
    },
  },
});

export const {loadFav, setFavoriteBooks, removeBookById} =
  favoriteBooksSlice.actions;

export default favoriteBooksSlice.reducer;
