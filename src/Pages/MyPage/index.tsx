// my page
import React, { useEffect, useState } from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import {Color, IconSize, Styles} from '~/Styles'
// component
import Header from '~/Components/Header'
import { Container } from '~/Styles'
// icon
import UserIcon from '~/Assets/assignment_ind_black_24dp.svg'
import StarIcon from '~/Assets/star_outline_black_24dp.svg'
import PenIcon from '~/Assets/create_black_24dp.svg';
import { MyPageProps } from '~/Types'
// login
import LoginPage from '~/Pages/LoginPage'
import auth from '@react-native-firebase/auth';
import { SignOut } from '~/Components/Login'; 


const MyPage= ({navigation}:MyPageProps)=>{
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState(); 
    // 로그인상태 확인
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    useEffect(()=>{
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
    return(
        <Container>
            <Header />
            <View style={{flex:1,justifyContent:'center'}}>
                <BoxContainer onPress={()=>navigation.navigate('ManageMyPage')}>
                    <UserIcon style={{marginRight:10}} height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray} />
                    <Text style={Styles.m_m_font}>개인정보 변경</Text>
                </BoxContainer>
                <BoxContainer onPress={()=>navigation.navigate('ScrapListPage')}>
                    <StarIcon style={{marginRight:10}} height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray} />
                    <Text style={Styles.m_m_font}>스크랩 목록</Text>
                </BoxContainer>
                <BoxContainer onPress={()=>navigation.navigate('MyPostPage')}>
                    <PenIcon style={{marginRight:10}} height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray} />
                    <Text style={Styles.m_m_font}>내가 쓴 글</Text>
                </BoxContainer> 
                <TouchableOpacity onPress={()=>SignOut()} style={{alignItems:'flex-end',margin:10}}>
                    <Text style={{color:Color.r_color, fontSize:13}}>
                        다른 아이디로 로그인하기
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>   
    )
}

export default MyPage

const BoxContainer = styled.TouchableOpacity`
    background-color:${Color.artbox}
    border-width:1px;
    border-color:${Color.border};
    border-radius:5px;
    padding:10px;
    margin-vertical:5px;
    flex-direction:row;
    align-items:center;
`