import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavi from './Pages/navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SplashScreen from 'react-native-splash-screen';
import { relayStylePagination } from '@apollo/client/utilities';

// graphql
const client = new ApolloClient({
  uri: 'https://api-dev.contestbox.co.kr/graphql',
  cache: new InMemoryCache({
    typePolicies:{
      Query:{
        fields:{
          contests: relayStylePagination(),
        }
      }
    }
  })
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

