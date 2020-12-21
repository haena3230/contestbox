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
        <View style={{
            justifyContent:'center',
            alignItems:'center',
            borderRadius:15,
            padding:5,
            borderWidth:1,
            borderColor:Color.l_color,
            width:hashtag.length*20,
            minWidth:40,
            height:35,
            margin:3,
        }}>
            <BoxText>{hashtag}</BoxText>
        </View>
    )
}

export const HashTagButton=({hashtag}:HashTagProps)=>{
    return(
        <View style={{
            justifyContent:'center',
            alignItems:'center',
            borderRadius:15,
            padding:5,
            borderWidth:1,
            borderColor:Color.l_color,
            width:hashtag.length*20,
            minWidth:60,
            height:35,
            margin:3,
        }}>
            <BoxText>{hashtag}</BoxText>
        </View>
    )
}

const BoxText=styled.Text`
    ${Styles.s_font}
`