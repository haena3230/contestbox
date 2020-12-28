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