import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStackNavigator from './src/navigation/RootStackNavigator'

const App = () => {
  
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App