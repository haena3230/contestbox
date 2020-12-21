// hashtag components
import React from 'react';
import {View,Text} from 'react-native';
import styled from 'styled-components/native';
import {Styles,Color} from '~/Styles';

interface HashTagProps{
    hashtag:string;
}
export const HashTag=({hashtag}:HashTagProps)=>{
    return(
        <Box>
            <BoxText>{hashtag}</BoxText>
        </Box>
    )
}

const Box = styled.View`
    justify-content:center;
    align-items:center;
    border-radius:15px;
    padding:5px;
    border-width:1px;
    border-color:${Color.l_color};
`
const BoxText=styled.Text`
    ${Styles.s_font}
`