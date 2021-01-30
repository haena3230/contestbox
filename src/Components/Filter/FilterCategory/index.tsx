// FilterPage 카테고리 분류 treeview
// 첫번째 view는 리스트 클릭 -> 2번째 view 보이게
// 버튼 클릭시 -> 버튼 상태 chg
// 두번째 view는 리스트 클릭 -> 버튼 상태 chg

import React,{useState} from 'react';
import {View,Text} from 'react-native';
import styled from 'styled-components/native';
import {Color,Styles} from '~/Styles';
// component
import {SortDownBtn,SortUpBtn} from '~/Components/Btn';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const FilterCategory=()=>{
    return(
        <View>
            <FirstView />      
        </View>
    )
}

// 첫번째 뷰
const FirstView=()=>{
    const[isView,setIsView]=useState<boolean>(false);
    const[isSelect,setIsSelect]=useState<boolean>(false);
    return(
        <ViewBox onPress={()=>setIsView(!isView)}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                {isView?
                <SortUpBtn />:<SortDownBtn />
                }
                <CategoryText>
                    스포츠
                </CategoryText>
            </View>
            <TouchableOpacity onPress={()=>setIsSelect(!isSelect)}>
                {isSelect?
                <SelectBtn isSelect={true}/>:<SelectBtn isSelect={false}/>    
                }
            </TouchableOpacity>
        </ViewBox>
    )
}

// 두번째 뷰
const SecondView=()=>{
    return(
        <TouchableOpacity>
            <ViewBox>
                
            </ViewBox>
        </TouchableOpacity>
    )
}

// 선택 버튼
interface SelectBtnProps{
    isSelect:boolean;
}
const SelectBtn=({isSelect}:SelectBtnProps)=>{
    return(
        <View>
            {isSelect?(
                <SelectBtnBox backgroundColor={Color.p_color} />
            ):(
                <SelectBtnBox backgroundColor={Color.w_color}/>
            )}
        </View>
    )
}

// 텍스트
const CategoryText=styled.Text`
    ${Styles.m_font};
    color:${Color.g4_color};
    margin-left:5px;
`

// 첫번째 뷰
const ViewBox=styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`

// 버튼 박스
interface SelectBtnBoxProps{
    backgroundColor:string;
}
const SelectBtnBox=styled.View`
    width:20px;
    height:20px;
    border-width:1px;
    border-color:${Color.g1_color};
    border-radius:3px;
    background-color:${(props:SelectBtnBoxProps)=>props.backgroundColor};
    margin-right:5px;
`

