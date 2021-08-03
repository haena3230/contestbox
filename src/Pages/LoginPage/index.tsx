// login page
import React from 'react'
import { Text, View } from 'react-native'
import {Container,Styles,Color} from '~/Styles'
import {SignIn} from '~/Components/Login';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Header from '~/Components/Header';
import styled from 'styled-components/native'


const LoginPage= ()=>{
    return(
        <Container>
            <Header />
            <View style={{flex:1, backgroundColor:Color.background, justifyContent:'center',alignItems:'center', paddingBottom:50}}>
                <SigninText>
                    간편하게 시작해보세요
                </SigninText>
                <GoogleSigninButton 
                    style={{ width: '90%', height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={()=>SignIn()}
                />
            </View>
        </Container>
    )
}
const SigninText = styled.Text`
    ${Styles.m_m_font}
    color:${Color.gray}
    width:85%

`

export default LoginPage