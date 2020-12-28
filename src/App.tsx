import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavi from './Pages/navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.contestbox.namo.kim/graphql',
  cache: new InMemoryCache()
});

const App =()=>{
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStackNavi />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
