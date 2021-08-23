import React from 'react';
import { Color,Styles } from '~/Styles';
import styled from 'styled-components/native'

export const PreRecruit=()=>{
    return(
        <Box bg_color={Color.p_l_color}>
            <DText>접수예정</DText>
        </Box>
    )
}

export const Recruit=()=>{
    return(
        <Box bg_color={Color.p_color}>
            <Text>접수중</Text>
        </Box>
    )
}

export const NoRecruit=()=>{
    return(
        <Box bg_color={Color.gray}>
            <Text>접수마감</Text>
        </Box>
    )
}

export const CancelRecruit=()=>{
    return(
        <Box bg_color={Color.gray}>
            <Text>취소</Text>
        </Box>
    )
}

export const ImmenentRecruit=()=>{
    return(
        <Box bg_color={Color.r_color}>
            <Text>마감임박</Text>
        </Box>
    )
}

interface BoxColor{
    bg_color:string;
}
const Box = styled.View`
    margin-right:15px;
    background-color:${(props:BoxColor)=>props.bg_color};
    border-radius:5px;
    justify-content:center;
    align-items:center;
    padding:2px 5px 2px 5px
`

const Text=styled.Text`
    ${Styles.s_font};
    font-weight:700
    color:${Color.w_color};
`

const DText=styled.Text`
    ${Styles.s_font};
    font-weight:700
    color:${Color.p_color};
`