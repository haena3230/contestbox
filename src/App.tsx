// app
import React,{useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import ErrorBoundary from 'react-native-error-boundary'
import {ErrorPage} from '~/Components/Error';
import LoginPage from '~/Pages/LoginPage';
// navi
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavi from './Pages/navigation';
// apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
// login
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// error 판별 시간 정하기 
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

const App =()=>{
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState();

  // 로그인상태 확인
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide();
    },1000);
    // webclientId 초기화
    GoogleSignin.configure({
      webClientId :'880797973035-oit01a4se5c1fkltvqfjk9hlhfjqpp0f.apps.googleusercontent.com',
      offlineAccess:true
    });
    // login상태 확인
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    
  },[])
  if (initializing) return null;
  if (!user) {
    return (
      <LoginPage />
    );
  }
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

