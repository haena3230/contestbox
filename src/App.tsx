import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavi from './Pages/navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SplashScreen from 'react-native-splash-screen';
import { relayStylePagination } from '@apollo/client/utilities';
import ErrorBoundary from 'react-native-error-boundary'
import {ErrorPage} from '~/Components/Error';

// error 판별 시간 정하기 
// 메일로 보내주기

const CustomFallback = (props: { error: Error, resetError: Function }) => (
  <ErrorPage 
    onPress={()=>null}
  />
)

// graphql
const client = new ApolloClient({
  uri: 'https://api.contestbox.co.kr/graphql',
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


import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

const App =()=>{
  useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide();
    },1000);
    // webclientId 초기화
    if (Platform.OS === 'android') {
        GoogleSignin.configure({
          webClientId :'880797973035-32s5alunbevkb5lshlcqniioc7ubcjh3.apps.googleusercontent.com',
          offlineAccess:false
        });
      }    
  },[])
  return (
    // <ErrorBoundary onError={errorHandler} FallbackComponent={CustomFallback}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainStackNavi />
        </NavigationContainer>
      </ApolloProvider>
    // </ErrorBoundary>
  );
};

export default App;

