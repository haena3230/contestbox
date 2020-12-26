// 헤더 
import React from 'react';
import {View, Text} from 'react-native';
import Flame from '~/Assets/fire-solid.svg';
import Search from '~/Assets/search-solid.svg';
import Person from '~/Assets/user-solid.svg';
import Setting from '~/Assets/Settings.svg';
import {Color,Styles,IconSize} from '~/Styles'
import styled from 'styled-components/native';



const Header=()=>{
    return(
        <HeaderContainer>
            <Small>
                <Flame height={IconSize.icon} width={IconSize.icon} color={Color.p_color} />
            </Small>
            <Title>
                <Text style={Styles.m_font}>Contest Box</Text>
            </Title>
            <Small>
                <Search height={IconSize.icon} width={IconSize.icon} color={Color.g2_color} />
            </Small>
            <Small>
                <Person height={IconSize.icon} width={IconSize.icon} color={Color.g2_color} />
            </Small>
            <Small>
                <Setting height={IconSize.icon} width={IconSize.icon} fill={Color.g2_color} />
            </Small>
        </HeaderContainer>
    )
}

const HeaderContainer=styled.View`
    width:100%;
    height:50px;
    flex-direction:row;
    align-items:center;
    background-color:${Color.l_color};
`
const Small=styled.View`
    width:10%;
    align-items:center;
`
const Title=styled.View`
    width:60%;
`

export default Header