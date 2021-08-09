
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Styles,IconSize,Color} from '~/Styles';
import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';
import { GET_CATEGORIES } from '~/queries';
import { treeCategoriesVar } from '~/global';
import { CategoryView, newStateArrayHot } from '../Filter';
import { useQuery } from '@apollo/client';
import Loading from '../Loading';

import Run from '~/Assets/directions_run_black_24dp.svg';
import PC from '~/Assets/computer_black_24dp.svg';
import Study from '~/Assets/local_library_black_24dp.svg';
import Movie from '~/Assets/movie_creation_black_24dp.svg';
import Music from '~/Assets/music_note_black_24dp.svg';
import Design from '~/Assets/brush_black_24dp.svg';

import Trophy from '~/Assets/emoji_events_black_24dp.svg';
import Group from '~/Assets/groups_black_24dp.svg';
import Bulb from '~/Assets/emoji_objects_black_24dp.svg';




// hot category
export const HotCategory = () =>{
  const navigation = useNavigation()
  const { loading, data } = useQuery(GET_CATEGORIES);
  let categories = []
  // hot category
  if(loading) return <Loading />
  if(data){
    categories = CategoryView(data.categories).map((group)=>{
      if(group[0].label=="스포츠")
        return(
           <CategorySport key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
             categoryArray:newStateArrayHot(group),
             categoryIdArr:[group[0].id]
           })}/>
        )
      else if(group[0].label=="IT")
        return(
           <CategoryIT key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
             categoryArray:newStateArrayHot(group),
             categoryIdArr:[group[0].id]
           })}/>
        )
      else if(group[0].label=="학습")
        return(
           <CategoryStudy key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
             categoryArray:newStateArrayHot(group),
             categoryIdArr:[group[0].id]
           })}/>
        )
      else if(group[0].label=="UCC")
        return(
           <CategoryUCC key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
             categoryArray:newStateArrayHot(group),
             categoryIdArr:[group[0].id]
           })}/>
        )
      else if(group[0].label=="음악")
        return(
           <CategoryMusic key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
             categoryArray:newStateArrayHot(group),
             categoryIdArr:[group[0].id]
           })}/>
        )
      else if(group[0].label=="미술")
        return(
           <CategoryDesign key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
             categoryArray:newStateArrayHot(group),
             categoryIdArr:[group[0].id]
           })}/>
        )
    })
    treeCategoriesVar(CategoryView(data.categories))
  }
  return(
    <View style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-between'}}>
      {categories}
    </View>
  )
}

// contest category btn
interface HotCategoryBtnProps{
    onPress:()=>void;
}
export const CategorySport =({onPress}:HotCategoryBtnProps)=>{
    return(
        <TouchableOpacity style={{alignItems:'center'}} onPress={onPress}>
            <CategoryBtnBox>
                <Run height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>스포츠</CategoryBtnText>
        </TouchableOpacity>
    )
}
export const CategoryIT =({onPress}:HotCategoryBtnProps)=>{
    return(
        <TouchableOpacity style={{alignItems:'center'}} onPress={onPress}>
            <CategoryBtnBox>
                <PC height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>IT</CategoryBtnText>
        </TouchableOpacity>
    )
}
export const CategoryStudy =({onPress}:HotCategoryBtnProps)=>{
    return(
        <TouchableOpacity style={{alignItems:'center'}} onPress={onPress}>
            <CategoryBtnBox>
                <Study height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>학습</CategoryBtnText>
        </TouchableOpacity>
    )
}
export const CategoryUCC =({onPress}:HotCategoryBtnProps)=>{
    return(
        <TouchableOpacity style={{alignItems:'center'}} onPress={onPress}>
            <CategoryBtnBox>
                <Movie height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>UCC</CategoryBtnText>
        </TouchableOpacity>
    )
}
export const CategoryMusic =({onPress}:HotCategoryBtnProps)=>{
    return(
        <TouchableOpacity style={{alignItems:'center'}} onPress={onPress}>
            <CategoryBtnBox>
                <Music height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>음악</CategoryBtnText>
        </TouchableOpacity>
    )
}
export const CategoryDesign =({onPress}:HotCategoryBtnProps)=>{
    return(
        <TouchableOpacity style={{alignItems:'center'}} onPress={onPress}>
            <CategoryBtnBox>
                <Design height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>미술</CategoryBtnText>
        </TouchableOpacity>
    )
}

// contest type btn
export const TypeFirst =()=>{
    return(
        <TypeBtnBox>
            <Trophy height={IconSize.bbicon} width={IconSize.bbicon} fill={Color.gray}/>
            <CategoryBtnText>경시대회</CategoryBtnText>
        </TypeBtnBox>
    )
}

export const TypeSecond =()=>{
    return(
        <TypeBtnBox>
            <Group height={IconSize.bbicon} width={IconSize.bbicon} fill={Color.gray}/>
            <CategoryBtnText>경진대회</CategoryBtnText>
        </TypeBtnBox>
    )
}

export const TypeThird =()=>{
    return(
        <TypeBtnBox>
            <Bulb height={IconSize.bbicon} width={IconSize.bbicon} fill={Color.gray}/>
            <CategoryBtnText>공모전</CategoryBtnText>
        </TypeBtnBox>
    )
}

// contest condition btn
interface CondiitonProps{
    text:string
}
export const ConditionBtn =({text}:CondiitonProps)=>{
    return(
        <ConditionBox>
            <ConditionText>{text}</ConditionText>
        </ConditionBox>
    )
}


// category Btn
const CategoryBtnBox=styled.View`
    background-color:${Color.artbox};
    border-width:1px;
    border-color:${Color.border};
    borderRadius:30px;
    padding:10px;
`
const CategoryBtnText=styled.Text`
    ${Styles.s_b_font};
    color:${Color.gray};
    font-weight:bold;
    padding:3px;
`

// type Btn
const TypeBtnBox = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    width:90px;
    height:90px;
    background-color:${Color.artbox};
    border-width:1px;
    border-color:${Color.border};
    borderRadius:10px;
`

// condition box
const ConditionBox = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    padding-horizontal:10px;
    background-color:${Color.artbox};
    border-width:1px;
    border-color:${Color.border};
    borderRadius:10px;
`
const ConditionText = styled.Text`
    ${Styles.s_b_font};
    color:${Color.gray};

`