import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import BottomStackNavigator from './src/navigation/BottomStackNavigator';
import {Provider, useDispatch} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
        <NavigationContainer>
          {/* <RootStackNavigator /> */}
          <BottomStackNavigator />
        </NavigationContainer>
    </Provider>
  );
};

export default App;
