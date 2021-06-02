// my page
import React from 'react'
import { Text, View } from 'react-native'
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

const MyPage= ({navigation}:MyPageProps)=>{
    return(
        <View style={{flex:1}}>
            <Header />
            <Container style={{justifyContent:'center'}}>
                <BoxContainer onPress={()=>navigation.navigate('ManageMyPage')}>
                    <UserIcon style={{marginRight:10}} height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray} />
                    <Text style={Styles.m_m_font}>개인정보 변경</Text>
                </BoxContainer>
                <BoxContainer>
                    <StarIcon style={{marginRight:10}} height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray} />
                    <Text style={Styles.m_m_font}>스크랩 목록</Text>
                </BoxContainer>
                <BoxContainer>
                    <PenIcon style={{marginRight:10}} height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray} />
                    <Text style={Styles.m_m_font}>내가 쓴 글</Text>
                </BoxContainer>            
            </Container>    
        </View>
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