import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavi from './Pages/navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SplashScreen from 'react-native-splash-screen';

const client = new ApolloClient({
  uri: 'https://api-dev.contestbox.namo.kim/graphql',
  cache: new InMemoryCache()
});

const App =()=>{
  useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide();
    },1000);
  },[])
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStackNavi />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;

