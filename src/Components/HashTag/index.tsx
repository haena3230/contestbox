// hashtag components
import React from 'react';
import styled from 'styled-components/native';
import {Styles,Color,DWidth} from '~/Styles';

interface HashTagProps{
    hashtag:string;
    picked:boolean;
}
export const HashTag=({hashtag,picked}:HashTagProps)=>{
    return(
        picked?(
            <HashTagContainer backgroundColor={Color.g2_color}>
                <BoxText>{hashtag}</BoxText>
            </HashTagContainer>
        ):(
            <HashTagContainer backgroundColor={Color.w_color}>
                <BoxText>{hashtag}</BoxText>
            </HashTagContainer>
        )
        
    )
}

const BoxText=styled.Text`
    ${Styles.s_font};
    padding:${DWidth>480? '25px':'15px'};
`
interface ContainerProps{
    backgroundColor:string;
}
const HashTagContainer=styled.View`
    justify-content:center;
    align-items:center;
    border-radius:15px;
    border-width:1px;
    border-color:${Color.g1_color};
    min-width:40px;
    height:${DWidth>480? '35px':'25px'};
    margin:3px;
    background-color:${(props:ContainerProps)=>props.backgroundColor?props.backgroundColor:Color.w_color};
`