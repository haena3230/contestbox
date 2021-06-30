// hashtag components
import React from 'react';
import styled from 'styled-components/native';
import {Styles,Color,DWidth, IconSize} from '~/Styles';

import CloseIcon from '~/Assets/cancel_black_24dp.svg';


// category tag of list box
interface ListBoxCategoryProps{
    category:string;
}

export const ListBoxCategory=({category}:ListBoxCategoryProps)=>{
    return(
        <ListBoxCategoryBox>
            <BoxText>{category}</BoxText>
        </ListBoxCategoryBox>
    )
}

// hashtag(filter btn)
interface HashTagProps{
    hashtag:string;
    picked:boolean;
}
export const HashTag=({hashtag,picked}:HashTagProps)=>{
    return(
        picked?(
            <HashTagContainer backgroundColor={Color.p_color}>
                <PickedBoxText>{hashtag}</PickedBoxText>
            </HashTagContainer>
        ):(
            <HashTagContainer backgroundColor={Color.artbox}>
                <BoxText>{hashtag}</BoxText>
            </HashTagContainer>
        )
        
    )
}

// filter picked btn
interface FilterPickedTagProps{
    text:string
}

export const FilterPickedTag = ({text}:FilterPickedTagProps)=>{
    return(
        <FilterPickedTagBox>
            <BoxText>
                {text}
            </BoxText>
            <CloseIcon width={IconSize.ssicon} height={IconSize.ssicon} fill={Color.p_color} />
        </FilterPickedTagBox>
    )
}

// category list page tag
interface CategoryListTagProps{
    picked:boolean;
    text:string
}

export const CategoryListTag = ({picked,text}:CategoryListTagProps)=>{
    return(
        picked?(
            <CategoryListTagBox backgroundColor={Color.p_color}>
                <PickedBoxText>{text}</PickedBoxText>
            </CategoryListTagBox>
        ):(
            <CategoryListTagBox backgroundColor={Color.border}>
                <BoxText>{text}</BoxText>
            </CategoryListTagBox>
        )
        
    )
}


// category tag of list box
const ListBoxCategoryBox = styled.View`
    justify-content:center;
    align-items:center;
    background-color:${Color.border};
    border-radius:5px;
    min-width:40px;
    padding:${DWidth>480? '3px 10px 3px 10px':'2px 5px 2px 5px'};
    margin-right:6px;
`


// hashtag(filter btn)
const BoxText=styled.Text`
    ${Styles.s_font};
    font-weight:700;
    color:${Color.gray}
    padding-horizontal:3px;
`
const PickedBoxText=styled.Text`
    ${Styles.s_m_font};
    color:${Color.w_color};
    padding-horizontal:3px;
`
interface ContainerProps{
    backgroundColor:string;
}
const HashTagContainer=styled.View`
    justify-content:center;
    align-items:center;
    flex-direction:row;
    border-radius:10px;
    border-width:1px;
    border-color:${Color.border};
    min-width:40px;
    height:30px;
    margin-right:6px;
    background-color:${(props:ContainerProps)=>props.backgroundColor?props.backgroundColor:Color.w_color};
    padding:${DWidth>480? '0 20px 0 20px':'0 10px 0 10px'};
`

// filter picked btn
const FilterPickedTagBox=styled.View`
    background-color:${Color.w_color};
    border-width:1px;
    border-color:${Color.p_color};
    border-radius:15px;
    min-width:40px;
    height:30px;
    flex-direction:row;
    align-items:center;
    margin-right:6px;
    padding:${DWidth>480? '0 20px 0 20px':'0 10px 0 10px'};
`

// category list tag
const CategoryListTagBox=styled.View`
    background-color:${(props:ContainerProps)=>props.backgroundColor?props.backgroundColor:Color.border};
    border-radius:15px;
    min-width:40px;
    height:30px;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    margin-right:6px;
    padding:${DWidth>480? '0 20px 0 20px':'0 10px 0 10px'};
`