// FilterPage 카테고리 분류 treeview
// 첫번째 view는 리스트 클릭 -> 2번째 view 보이게
// 버튼 클릭시 -> 버튼 상태 chg
// 두번째 view는 리스트 클릭 -> 버튼 상태 chg

import React,{useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {Color,Styles} from '~/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '~/App';
import {SLCategoryAction} from '~/Store/actions';
// component
import {SortDownBtn,SortUpBtn} from '~/Components/Btn';

// value 들어간 배열로 변환 
export const CategoryStateArray=(array:Array<{id:string,label:string}>)=>{
    let i=0;
    let len=array.length;
    let categories=new Array();
    for(i=0;i<len;i++){
        let tmp=new Array();
        let j=0;
        while(array[i][j]!==undefined){
            tmp.push({
                id:array[i][j].id,
                label:array[i][j].label,
                value:false
            });
            j++;
        }
        categories.push(tmp)
    }
    return categories;
}

interface FilterCategoryProps{
    secondCategories:Array<{id:string,label:string,value:boolean}>
    category:string;
    isSelect:boolean;
    sndIdx:number;
    onPressFirst:()=>void;
    onPressSecond:()=>void;
}
export const FilterCategory=({category,secondCategories,isSelect,sndIdx,onPressFirst,onPressSecond}:FilterCategoryProps)=>{
    const[isView,setIsView]=useState<boolean>(false);
    let categories=useSelector((state:RootState)=>state.query.SLCategoryArray)
    let orgCategories =useSelector((state:RootState)=>state.query.categoriesArray)
    const dispatch=useDispatch();
    const storeSLCategoryNewArray=(Array:Array<string>)=>{
        dispatch(SLCategoryAction(Array))
    }
    
    // data
    return(
        <View>
                {secondCategories.length===1?(
                    <ViewBox>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
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
                            <CategoryText>
                                {category}
                            </CategoryText>
                            {isView?
                            <SortUpBtn />:<SortDownBtn />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressFirst}>
                            <SelectBtn isSelect={isSelect}/>
                        </TouchableOpacity>
                    </ViewBox>
                )}
            
            {isView?(
            <View>
                {secondCategories.slice(1).map((data,index)=>{
                    return(
                        <SecondView 
                            key= {data.id} 
                            category={data.label} 
                            isSelect={data.value} 
                            onPressBtn={()=>{
                                if(categories.length===0){
                                    let tmpArray=CategoryStateArray(orgCategories);
                                    tmpArray[sndIdx][index+1].value=!data.value;
                                    storeSLCategoryNewArray(tmpArray)
                                }
                                else{
                                    let tmpArray=categories;
                                    tmpArray[sndIdx][index+1].value=!data.value;
                                    storeSLCategoryNewArray(tmpArray)
                                }
                                onPressSecond();
                            }}
                             />
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
