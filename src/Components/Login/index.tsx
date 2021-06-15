// google login component

// webclientId 초기화
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// 로그인

import auth from '@react-native-firebase/auth';;
import React from 'react';
import { Button } from 'react-native';

export function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => {
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      }
    />
  );
}

async function onGoogleButtonPress() {

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}