import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavi from './Pages/navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SplashScreen from 'react-native-splash-screen';
import {createStore,combineReducers,Reducer,Store} from 'redux'
import {Provider} from 'react-redux'
import {queryReducers} from './Store/reducers';

// graphql
const client = new ApolloClient({
  uri: 'https://api-dev.contestbox.namo.kim/graphql',
  cache: new InMemoryCache()
});

// redux
export const rootReducer:Reducer = combineReducers({
  query:queryReducers,
})
const store:Store = createStore(rootReducer)
export type RootState = ReturnType<typeof rootReducer>

const App =()=>{
  useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide();
    },1000);
  },[])
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainStackNavi />
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
};

export default App;

