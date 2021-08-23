// google login component

// 로그인
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const SignIn = async () => {

  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('로그인 취소')
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('이미 로그인 상태')
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('서비스 이상')
    } else {
      console.log('다른 문제')
      console.log(error)
    }
  }
};

export const SignOut = async () => {
  try {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
    await GoogleSignin.revokeAccess();
  } catch (error) {
    console.error(error);
  }
};
