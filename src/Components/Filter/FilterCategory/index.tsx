// FilterPage 카테고리 분류 treeview
// 첫번째 view는 리스트 클릭 -> 2번째 view 보이게
// 버튼 클릭시 -> 버튼 상태 chg
// 두번째 view는 리스트 클릭 -> 버튼 상태 chg

import React,{useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {Color,Styles} from '~/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
// component
import {SortDownBtn,SortUpBtn} from '~/Components/Btn';

interface FilterCategoryProps{
    secondCategories:Array<{id:string,label:string,value:boolean}>
    category:string;
    isSelect:boolean;
    onPressFirst:()=>void;
    onPressSecond:()=>void;
}
export const FilterCategory=({category,secondCategories,isSelect,onPressFirst,onPressSecond}:FilterCategoryProps)=>{
    const[isView,setIsView]=useState<boolean>(false);
    // data
    return(
        <View>
                {secondCategories.length===1?(
                    <ViewBox>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <ListBar />
                            <CategoryText>
                                {category}
                            </CategoryText>
                        </View>
                        <TouchableOpacity onPress={onPressFirst}>
                            <SelectBtn isSelect={isSelect}/>
                        </TouchableOpacity>
                    </ViewBox>
                ):(
                    <ViewBox>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
                                onPress={()=>setIsView(!isView)}> 
                            {isView?
                            <SortUpBtn />:<SortDownBtn />
                            }
                            <CategoryText>
                                {category}
                            </CategoryText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressFirst}>
                            <SelectBtn isSelect={isSelect}/>
                        </TouchableOpacity>
                    </ViewBox>
                )}
            
            {isView?(
            <View>
                {secondCategories.slice(1).map((data)=>{
                    return(
                        <SecondView key= {data.id} category={data.label} isSelect={data.value} onPressBtn={onPressSecond} />
                    )
                })}
            </View>
            ):(
                null
            )}
        </View>
    )
}

// 두번째 뷰
interface SecondViewProps{
    category:string;
    isSelect:boolean;
    onPressBtn:()=>void;
}
const SecondView=({category,isSelect,onPressBtn}:SecondViewProps)=>{
    return(
        <TouchableOpacity onPress={onPressBtn}>
            <ViewBox>
                <CategoryText style={{marginLeft:'15%'}}>
                    {category}
                </CategoryText>
                <SelectBtn isSelect={isSelect}/>
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
const ViewBox=styled.View`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    margin-vertical:5px;
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

// 하위 리스트 없을때 
const ListBar=styled.View`
    width:8px;
    height:2px;
    background-color:${Color.g3_color};
    margin-horizontal:8px;
`
