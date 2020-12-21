// 헤더 
import React from 'react';
import {View, Text} from 'react-native';
import Flame from '~/Assets/Flame.svg';
import Search from '~/Assets/Search.svg';
import Person from '~/Assets/Person.svg';
import Setting from '~/Assets/Settings.svg';
import {Color,Styles} from '~/Styles'
import styled from 'styled-components/native';



const Header=()=>{
    return(
        <HeaderContainer>
            <Small>
                <Flame height={20} width={20} fill={Color.p_color} />
            </Small>
            <Title>
                <Text style={Styles.m_font}>Contest Box</Text>
            </Title>
            <Small>
                <Search height={20} width={20} color={Color.g_color} />
            </Small>
            <Small>
                <Person height={20} width={20} fill={Color.g_color} />
            </Small>
            <Small>
                <Setting height={20} width={20} fill={Color.g_color} />
            </Small>
        </HeaderContainer>
    )
}

const HeaderContainer=styled.View`
    width:100%;
    height:50px;
    flex-direction:row;
    align-items:center;
`
const Small=styled.View`
    width:10%;
    align-items:center;
`
const Title=styled.View`
    width:60%;
`

export default Header