import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {Styles,Color,IconSize,DWidth} from '~/Styles';

import SortDown from '~/Assets/sort-down-solid.svg';
import SortUp from '~/Assets/sort-up-solid.svg';

interface FilterListProps{
    title:string;
    isPicked:boolean;
    onPress:()=>void;
}
export const FilterList =({title,isPicked,onPress}:FilterListProps)=>{
    return(
        <TouchableOpacity onPress={onPress}>
            <ListBox>
                <ListTitle>
                    {title}
                </ListTitle>
                <ListBtn>
                    {isPicked?(
                        <View style={{marginTop:5}}>
                            <SortUp width={IconSize.sicon} height={IconSize.sicon} color={Color.g3_color}/>
                        </View>
                        
                    ):(
                        <SortDown width={IconSize.sicon} height={IconSize.sicon} color={Color.g3_color}/>
                    )}
                    
                </ListBtn>
            </ListBox>   
        </TouchableOpacity>
    )
}

// 카테고리 상위
interface CategoryListProps{
    title:string;
    subTitle:Array<string>;
}
export const CategoryList=({title,subTitle}:CategoryListProps)=>{
    const[isPicked,setIsPicked]=useState(false);
    return(
        <View>
            <ListBox>
                <TouchableOpacity onPress={()=>setIsPicked(!isPicked)} style={{flexDirection:'row',alignItems:'center'}}>
                    <ListBtn>
                        {isPicked?(
                                <View style={{marginTop:5}}>
                                    <SortUp width={IconSize.sicon} height={IconSize.sicon} color={Color.g3_color}/>
                                </View>
                        ):(
                            <View style={{marginBottom:5}}>
                                <SortDown width={IconSize.sicon} height={IconSize.sicon} color={Color.g3_color}/>   
                            </View>
                        )}
                    </ListBtn>
                    <CategoryTitle>
                        {title}
                    </CategoryTitle>
                </TouchableOpacity>
                <CheckBox/>
            </ListBox>
            {isPicked?(
                <View style={{alignItems:'flex-end'}}>
                    {subTitle.map((data)=>{
                        return(
                            <CategoryListSe key = {data} subTitle={data}/>
                        )
                    })}
                </View>
            ):(
                null
            )}
            
        </View>
    )
}
// 하위 카테고리
interface CategoryListSeProps{
    subTitle:string;
}
const CategoryListSe=({subTitle}:CategoryListSeProps)=>{
    return(
        <CategoryBox>
            <CategoryTitle>{subTitle}</CategoryTitle>
            <CheckBox/>
        </CategoryBox>
    )
}
// 체크박스
const CheckBox=()=>{
    const[picked,setPicked]=useState(false);
    const onPressCheckBox=()=>{
        setPicked(!picked);
    }
    return(
        <TouchableOpacity style={{margin:15}}  onPress={onPressCheckBox}>
            {picked?(
                <CheckBoxStyle backgroundColor={Color.p_color} />
            ):(
                <CheckBoxStyle backgroundColor={Color.w_color} />
            )}
            
        </TouchableOpacity>
    )
}

const ListBox=styled.View`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`
const CategoryBox=styled.View`
    width:80%;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`
const ListTitle =styled.Text`
    padding:15px;
    ${Styles.m_font};
`
const CategoryTitle=styled.Text`
    ${Styles.s_font};
`
const ListBtn=styled.View`
    padding:15px;
`
interface CheckBoxStyleProps{
    backgroundColor:string
}
const CheckBoxStyle=styled.View`
    width:12px;
    height:12px;
    background-color:${(props:CheckBoxStyleProps)=>props.backgroundColor};
    border-width:1px;
    border-color:${Color.g1_color};
`


 const style=StyleSheet.create({
    IconBorder:{
      borderWidth:1,
      borderColor:Color.g1_color,
      borderRadius:5,
      padding:5,
      margin:2,
    },
 })