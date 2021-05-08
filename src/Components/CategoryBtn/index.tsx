
import React from 'react';
import {View} from 'react-native';
import {Styles,IconSize,Color} from '~/Styles';
import styled from 'styled-components/native';

import Run from '~/Assets/directions_run_black_24dp.svg';
import PC from '~/Assets/computer_black_24dp.svg';
import Study from '~/Assets/local_library_black_24dp.svg';
import Movie from '~/Assets/movie_creation_black_24dp.svg';
import Music from '~/Assets/music_note_black_24dp.svg';
import Design from '~/Assets/brush_black_24dp.svg';

import Trophy from '~/Assets/emoji_events_black_24dp.svg';
import Group from '~/Assets/groups_black_24dp.svg';
import Bulb from '~/Assets/emoji_objects_black_24dp.svg';


// contest category btn
export const CategotySport =()=>{
    return(
        <View style={{alignItems:'center'}}>
            <CategoryBtnBox>
                <Run height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>스포츠</CategoryBtnText>
        </View>
    )
}
export const CategotyIT =()=>{
    return(
        <View style={{alignItems:'center'}}>
            <CategoryBtnBox>
                <PC height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>IT</CategoryBtnText>
        </View>
    )
}
export const CategotyStudy =()=>{
    return(
        <View style={{alignItems:'center'}}>
            <CategoryBtnBox>
                <Study height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>학습</CategoryBtnText>
        </View>
    )
}
export const CategotyUCC =()=>{
    return(
        <View style={{alignItems:'center'}}>
            <CategoryBtnBox>
                <Movie height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>UCC</CategoryBtnText>
        </View>
    )
}
export const CategotyMusic =()=>{
    return(
        <View style={{alignItems:'center'}}>
            <CategoryBtnBox>
                <Music height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>음악</CategoryBtnText>
        </View>
    )
}
export const CategotyDesign =()=>{
    return(
        <View style={{alignItems:'center'}}>
            <CategoryBtnBox>
                <Design height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray}/>
            </CategoryBtnBox>
            <CategoryBtnText>미술</CategoryBtnText>
        </View>
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


// category Btn
const CategoryBtnBox=styled.TouchableOpacity`
    background-color:${Color.artbox};
    border-width:1px;
    border-color:${Color.border};
    borderRadius:30px;
    padding:10px;
`
const CategoryBtnText=styled.Text`
    ${Styles.m_font};
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