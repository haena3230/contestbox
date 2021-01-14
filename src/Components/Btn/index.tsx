// button components
import React from 'react';
import styled from 'styled-components/native';
import {Color,Styles,IconSize} from '~/Styles';
import {View,TouchableOpacity,Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';

// icon
import FilterIcon from '~/Assets/filter-solid.svg';
import MapIcon from '~/Assets/map-marked-alt-solid.svg';
import SortDown from '~/Assets/sort-down-solid.svg';
import ListIcon from '~/Assets/list-ul-solid.svg';
import SortUp from '~/Assets/sort-up-solid.svg';

export const LongBtn =()=>{
    return(
        <Container>
            <LText>필터 적용하기</LText>
        </Container>
    )
}

interface ShortBtnProps{
    text:string;
    onPress:()=>void;
}
export const ShortBtn=({text,onPress}:ShortBtnProps)=>{
    
    return(
        <SContainer onPress={onPress}>
            <SText>{text}</SText>
        </SContainer>
    )
}

// map btn
interface MapBtnProps{
    onPressMap:()=>void;
}
export const MapBtn = ({onPressMap}:MapBtnProps)=>{
    return(
        <IconBorder onPress={onPressMap}>
            <MapIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
        </IconBorder>
    )
}

// list btn
export const ListBtn=({onPressMap}:MapBtnProps)=>{
    return(
        <IconBorder onPress={onPressMap}>
            <ListIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
        </IconBorder>
    )
}

// filter btn
export const FilterBtn =()=>{
    const navigation=useNavigation()
    const onPressFilter=()=>{
        navigation.navigate('FilterPage');
    }
    return(
        <IconBorder onPress={onPressFilter}>
            <FilterIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
        </IconBorder>   
    )
}

// sort btn
interface SortBtnProps{
    onPressSort:()=>void;
    state:string;
}
export const SortBtn=({onPressSort,state}:SortBtnProps)=>{
    return(
        <TouchableOpacity onPress={onPressSort} style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={Styles.s_font}>{state}</Text>
            <View style={{padding:5,marginBottom:3}}>
            <SortDown width={IconSize.sicon} height={IconSize.sicon} color={Color.g3_color}/>
            </View>
        </TouchableOpacity>
    )
}


export const SortDownBtn=()=>{
    return(
        <View style={{padding:5,marginBottom:3}}>
            <SortDown width={IconSize.sicon} height={IconSize.sicon} color={Color.g3_color}/>
        </View>
    )
}



// long
const Container=styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    background-color:${Color.p_color};
    border-radius:15px;

`
const LText=styled.Text`
    ${Styles.m_font};
    color:${Color.w_color};
    padding:8px;
`

// short
const SContainer=styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    background-color:${Color.g4_color};
    border-radius:10px;
`
const SText=styled.Text`
    ${Styles.m_font};
    font-weight:bold;
    color:${Color.w_color};
    padding:8px;
`

const IconBorder=styled.TouchableOpacity`
    border-width:1px;
    border-color:${Color.g1_color};
    border-radius:5px;
    padding:5px;
    margin:2px;
`