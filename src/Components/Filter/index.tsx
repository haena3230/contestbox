// filterpage component
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Styles,Color } from '~/Styles';
import {useNavigation} from '@react-navigation/native';
// components
import {FilterBtn, ShortBtn, SortDownBtn, SortUpBtn} from  '~/Components/Btn';
import {HashTag} from '~/Components/HashTag';
import {SortBtn} from '~/Components/Btn';
import {FilterCategory} from '~/Components/Filter/FilterCategory';

// 필터페이지 헤더
export const FilterHeader=()=>{
    const navigation=useNavigation();
    return(
        <HeaderContainer>
            <HeaderTitle>
                <HeaderBox>
                    <FilterBtn onPressFilter={()=>null}/> 
                </HeaderBox>
                <Text style={Styles.b_font}>필터</Text>
            </HeaderTitle>
            <Close onPressClose={()=>navigation.goBack()}/>
        </HeaderContainer>
    )   
}

// 닫기 버튼
interface CloseBtnProps{
    onPressClose:()=>void;
}
const Close = ({onPressClose}:CloseBtnProps)=>{
    return(
        <TouchableOpacity onPress={onPressClose}>
            <HeaderBox>
                <CloseBtn>닫기</CloseBtn>
            </HeaderBox>
        </TouchableOpacity>
    )
}

// 리스트 메뉴 (종류,참여조건)
interface FilterMenuTypeProps{
    title:string;
}
export const FilterMenuType=({title}:FilterMenuTypeProps)=>{
    const [menu,setMenu]=useState<Boolean>(false);
    return(
        <MenuContainer>
            <MenuBox  onPress={()=>setMenu(!menu)}>
                <MenuTitle>
                    {title}
                </MenuTitle>
                {menu?
                    <SortUpBtn />
                    :<SortDownBtn />
                }
            </MenuBox>
            {menu?(
                <Type>
                    <TagState />
                </Type>
            ):null}
        </MenuContainer>
    )
}

const TagState=()=>{
    const[state,setState]=useState<boolean>(false);
    return(
        <TouchableOpacity onPress={()=>setState(!state)}>
            {state?(
                <HashTag hashtag={'test'} picked={true}/>
            ):(
                <HashTag hashtag={'test'} picked={false}/>
            )}
            
        </TouchableOpacity>
    )
}

// 리스트메뉴 (카테고리)
export const FilterMenuCategory=()=>{
    const [menu,setMenu]=useState<Boolean>(false);
    return(
        <MenuContainer>
            <MenuBox  onPress={()=>setMenu(!menu)}>
                <MenuTitle>
                    카테고리
                </MenuTitle>
                {menu?
                    <SortUpBtn />
                    :<SortDownBtn />
                }
            </MenuBox>
            {menu?(
                <CategoryBox>
                    <FilterCategory />
                </CategoryBox>
            ):null}
        </MenuContainer>
    )
}

// bottom btn
export const FilterBottom=()=>{
    return(
        <BottomContainer>
            <ShortBtn color={Color.g2_color} text={' 초기화 '} onPress={()=>null}/>
            <ShortBtn color={Color.p_color} text={'적용하기'} onPress={()=>null}/>
        </BottomContainer>
    )
}

// header
const HeaderContainer=styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    border-bottom-width:1px;
    border-color:${Color.g2_color};
`
const HeaderTitle=styled.View`
    flex-direction:row;
    align-items:center;
    padding:5px;
`
const HeaderBox=styled.View`
    margin-horizontal:10px;
`
// close
const CloseBtn=styled.Text`
    ${Styles.m_font};
    color:${Color.g3_color};
    font-weight:bold;
`
// filter menu
const MenuContainer=styled.View`
    border-bottom-width:1px;
    border-color:${Color.g2_color};
`
const MenuBox=styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-horizontal:20px;
    padding-vertical:10px;
`
const MenuTitle=styled.Text`
    ${Styles.m_font};
    color:${Color.g4_color};
    font-weight:bold;
`

// 종류
const Type = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    padding:15px;
`
// 카테고리
const CategoryBox =styled.View`
    padding:15px;
`
// bottom
const BottomContainer=styled.View`
    width:100%;
    height:60px;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
    padding:15px;
    border-top-width:1px;
    border-color:${Color.g2_color};
    position:absolute;
    bottom:0;
`
