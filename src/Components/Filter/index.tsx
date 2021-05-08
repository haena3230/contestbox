// filterpage component
import React from 'react';
import styled from 'styled-components/native';
import { Styles,Color } from '~/Styles';

// components
import {Btn} from  '~/Components/Btn';

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
    if(!array){
        return []
    }
    else{
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
}

// 선택된 id만 포함된 배열
export const pickedIdArray=(array:Array<any>)=>{
    if(!array){
        return []
    }
    else{
        let idArray=[];
        let result=array.filter(d=>{
        return d.value===true
        });
        result.forEach((e)=>{
            idArray.push(e.id)
        });
        return(idArray);
    }
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


// bottom btn
interface FilterBottomProps{
    onPressReset:()=>void;
    onPressConfirm:()=>void;
}
export const FilterBottom=({onPressReset,onPressConfirm}:FilterBottomProps)=>{
    return(
        <BottomContainer>
            <Btn color={Color.gray} text={' 초기화 '} onPress={onPressReset} widthPercent={30}/>
            <Btn color={Color.p_color} text={'적용하기'} onPress={onPressConfirm} widthPercent={60}/>
        </BottomContainer>
    )
}


// filter menu
export const MenuContainer=styled.View`
    border-bottom-width:1px;
    border-color:${Color.border};
`
export const MenuBox=styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-horizontal:20px;
    padding-vertical:10px;
`
export const MenuTitle=styled.Text`
    ${Styles.m_m_font};
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
    border-color:${Color.border};
    position:absolute;
    bottom:0;
`


