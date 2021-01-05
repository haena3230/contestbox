// button components
import React from 'react';
import styled from 'styled-components/native';
import {Color,Styles} from '~/Styles';

export const LongBtn =()=>{
    return(
        <Container>
            <Text>필터 적용하기</Text>
        </Container>
    )
}

interface ShortBtnProps{
    text:string;
    onPress:()=>void;
}
export const ShortBtn=({text,onPress}:ShortBtnProps)=>{
    return(
        <SContainer onPress={onPress}>
            <SText>{text}</SText>
        </SContainer>
    )
}

// long
const Container=styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    background-color:${Color.p_color};
    border-radius:15px;

`
const Text=styled.Text`
    ${Styles.m_font};
    color:${Color.w_color};
    padding:8px;
`

// short
const SContainer=styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    background-color:${Color.g4_color};
    border-radius:10px;
`
const SText=styled.Text`
    ${Styles.m_font};
    font-weight:bold;
    color:${Color.w_color};
    padding:8px;
`