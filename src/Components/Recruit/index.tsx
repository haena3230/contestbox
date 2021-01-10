import React from 'react';
import {View,Text} from 'react-native';
import { Color } from '~/Styles';
import styled from 'styled-components/native'

export const PreRecruit=()=>{
    return(
        <Box color={'#86C2FF'}>
            <Text style={{color:Color.w_color,fontSize:10}}>접수예정</Text>
        </Box>
    )
}

export const Recruit=()=>{
    return(
        <Box color={Color.p_color}>
            <Text style={{color:Color.w_color,fontSize:10}}>접수중</Text>
        </Box>
    )
}

export const NoRecruit=()=>{
    return(
        <Box color={Color.g4_color}>
            <Text style={{color:Color.w_color,fontSize:10}}>접수마감</Text>
        </Box>
    )
}

export const CancelRecruit=()=>{
    return(
        <Box color={Color.g4_color}>
            <Text style={{color:Color.w_color,fontSize:10}}>취소</Text>
        </Box>
    )
}

export const ImmenentRecruit=()=>{
    return(
        <Box color={Color.r_color}>
            <Text style={{color:Color.w_color,fontSize:10}}>마감임박</Text>
        </Box>
    )
}

interface BoxColor{
    color:string;
}
const Box = styled.View`
    margin-right:15px;
    width:60px;
    height:15px
    background-color:${(props:BoxColor)=>props.color};
    border-radius:10px;
    justify-content:center;
    align-items:center;

`