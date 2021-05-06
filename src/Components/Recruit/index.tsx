import React from 'react';
import { Color,Styles } from '~/Styles';
import styled from 'styled-components/native'

export const PreRecruit=()=>{
    return(
        <Box color={Color.p_l_color}>
            <DText>접수예정</DText>
        </Box>
    )
}

export const Recruit=()=>{
    return(
        <Box color={Color.p_color}>
            <Text>접수중</Text>
        </Box>
    )
}

export const NoRecruit=()=>{
    return(
        <Box color={Color.gray}>
            <Text>접수마감</Text>
        </Box>
    )
}

export const CancelRecruit=()=>{
    return(
        <Box color={Color.gray}>
            <Text>취소</Text>
        </Box>
    )
}

export const ImmenentRecruit=()=>{
    return(
        <Box color={Color.r_color}>
            <Text>마감임박</Text>
        </Box>
    )
}

interface BoxColor{
    color:string;
}
const Box = styled.View`
    margin-right:15px;
    
    width:60px;
    background-color:${(props:BoxColor)=>props.color};
    border-radius:10px;
    justify-content:center;
    align-items:center;

`

const Text=styled.Text`
    ${Styles.s_font};
    color:${Color.w_color};
`

const DText=styled.Text`
    ${Styles.s_font};
    color:${Color.p_color};
`