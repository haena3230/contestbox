// hashtag components
import React from 'react';
import styled from 'styled-components/native';
import {Styles,Color,DWidth,IconSize} from '~/Styles';
import CheckIcon from '~/Assets/check-solid.svg';

interface HashTagProps{
    hashtag:string;
    picked:boolean;
}
export const HashTag=({hashtag,picked}:HashTagProps)=>{
    return(
        picked?(
            <HashTagContainer backgroundColor={Color.background}>
                <CheckIcon height={IconSize.icon} width={IconSize.sicon} color={Color.gray}/>
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
    ${Styles.s_m_font};
    padding-horizontal:3px;
`
interface ContainerProps{
    backgroundColor:string;
}
const HashTagContainer=styled.View`
    justify-content:center;
    align-items:center;
    flex-direction:row;
    border-radius:15px;
    border-width:1px;
    border-color:${Color.border};
    min-width:40px;
    height:25px;
    margin-right:6px;
    background-color:${(props:ContainerProps)=>props.backgroundColor?props.backgroundColor:Color.w_color};
    padding:${DWidth>480? '0 20px 0 20px':'0 10px 0 10px'};
`