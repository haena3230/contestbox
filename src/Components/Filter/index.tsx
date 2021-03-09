// filterpage component
import React, { useState } from 'react';
import { Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import { Styles,Color } from '~/Styles';

// components
import {FilterBtn, ShortBtn} from  '~/Components/Btn';

// 함수

// category treeview 저장
export const CategoryView=(array:Array<{id,label,parentID}>)=>{
  let i=0;
  let categories = new Array();
  while(array[i]!==undefined){
    let tmp = new Array();
    let j=0;
    if(array[i].parentID===null){
      tmp.push(array[i]);
      while(array[j]!==undefined){
        if(array[i].id===array[j].parentID){
          tmp.push(array[j]);
        } j++;
      }
      categories.push(tmp);
    }
    i++
  }
  return categories;
}
// value 들어간 배열 생성함수
export const newStateArray=(array:Array<any>)=>{
    let i=0;
    let state=[]
    for(i=0;i<array.length;i++){
        state.push({
            id:array[i].id,
            label:array[i].label,
            value:false
        })
    }
    return state;
}

// 선택된 id만 포함된 배열
export const pickedIdArray=(array:Array<any>)=>{
    let idArray=[];
    let result=array.filter(d=>{
    return d.value===true
    });
    result.forEach((e)=>{
        idArray.push(e.id)
    });
    return(idArray);
}

// 선택된 id만 포함된 배열(다차원)
export const pickedIdArraies=(array:Array<any>)=>{
    let idArray=[];
    let i=0;
    while(array[i]!=undefined){
        let result=array[i].filter(d=>{
        return d.value===true
        });
        result.forEach((e)=>{
            idArray.push(e.id)
        });
        i++;
    };
    return(idArray);
}


// 필터페이지 헤더
export const FilterHeader=()=>{
    return(
        <HeaderContainer>
            <HeaderTitle>
                <HeaderBox>
                    <FilterBtn onPressFilter={()=>null} number={0}/> 
                </HeaderBox>
                <Text style={Styles.b_font}>필터</Text>
            </HeaderTitle>
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

// bottom btn
interface FilterBottomProps{
    onPressReset:()=>void;
    onPressConfirm:()=>void;
}
export const FilterBottom=({onPressReset,onPressConfirm}:FilterBottomProps)=>{
    return(
        <BottomContainer>
            <ShortBtn color={Color.g2_color} text={' 초기화 '} onPress={onPressReset}/>
            <ShortBtn color={Color.p_color} text={'적용하기'} onPress={onPressConfirm}/>
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
export const MenuContainer=styled.View`
    border-bottom-width:1px;
    border-color:${Color.g2_color};
`
export const MenuBox=styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-horizontal:20px;
    padding-vertical:10px;
`
export const MenuTitle=styled.Text`
    ${Styles.m_font};
    color:${Color.g4_color};
    font-weight:bold;
`
// 종류
export const Type = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
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

