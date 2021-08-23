// 헤더 
import React from 'react';
// icon
import Flame from '~/Assets/fire-solid.svg';
import BackIcon from '~/Assets/chevron-left-solid.svg';
import MenuIcon from '~/Assets/more_horiz_black_24dp.svg'
// style
import {Color,Styles,IconSize} from '~/Styles'
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { FilterBtn } from '../Btn';

const Header=()=>{
    return(
        <HeaderContainer>
                <Flame height={IconSize.icon} width={IconSize.icon} color={Color.p_color} />
            <Item>
                <HeaderText>Contest Box</HeaderText>
            </Item>
        </HeaderContainer>
    )
}
interface PageHeaderProps{
    pageName:string;
    onPressClose:()=>void;
}
export const PageHeader = ({pageName,onPressClose}:PageHeaderProps)=>{
    return(
        <HeaderContainer>
            <BackIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.gray} onPress={onPressClose}/>
            <Item>
                <HeaderText>{pageName}</HeaderText>
            </Item>
        </HeaderContainer>
    )
}

// 완료 버튼 있는 header
interface SubmitHeaderProps{
    pageName:string;
    onPressClose:()=>void;
    onPressSubmit:()=>void;
}
export const SubmitHeader = ({pageName,onPressClose,onPressSubmit}:SubmitHeaderProps)=>{
    return(
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%', backgroundColor:Color.background}}>
            <SubmitHeaderContainer>
                <Item>
                    <BackIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.gray} onPress={onPressClose}/>
                </Item>
                <Item>
                    <HeaderText>{pageName}</HeaderText>
                </Item>
            </SubmitHeaderContainer>
            <TouchableOpacity onPress={onPressSubmit} style={{marginRight:10}}>
                <HeaderText>완료</HeaderText>
            </TouchableOpacity>
        </View>
    )
}

// 메뉴버튼 있는 header
interface SubmitHeaderProps{
    pageName:string;
    onPressClose:()=>void;
    onPressSubmit:()=>void;
}
export const MenuHeader = ({pageName,onPressClose,onPressSubmit}:SubmitHeaderProps)=>{
    return(
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%', backgroundColor:Color.background}}>
            <SubmitHeaderContainer>
                <BackIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.gray} onPress={onPressClose}/>
                <Item>
                    <HeaderText>{pageName}</HeaderText>
                </Item>
            </SubmitHeaderContainer>
            <TouchableOpacity onPress={onPressSubmit}>
                <MenuIcon width={IconSize.icon} height={IconSize.icon} fill={Color.gray}/>
            </TouchableOpacity>
        </View>
    )
}

// filter btn 있는 header
interface FilterHeaderProps{
    pageName:string;
    onPressClose:()=>void;
    onPressFilter:()=>void;
    filterNum:number
}
export const FilterHeader = ({pageName,onPressClose,onPressFilter,filterNum}:FilterHeaderProps)=>{
    return(
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%', backgroundColor:Color.background}}>
            <SubmitHeaderContainer>
                <BackIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.gray} onPress={onPressClose}/>
                <Item>
                    <HeaderText>{pageName}</HeaderText>
                </Item>
            </SubmitHeaderContainer>
            
            <FilterBtn number={filterNum} onPressFilter={onPressFilter}/>
        </View>
    )
}

const HeaderContainer=styled.View`
    width:100%;
    flex-direction:row;
    align-items:center;
    background-color:${Color.background}
    padding-bottom:10px;
`

const SubmitHeaderContainer=styled.View`
    flex-direction:row;
    align-items:center;
`
const HeaderText=styled.Text`
    ${Styles.mb_font};
    color:${Color.b_color};
    font-weight:700;
`
const Item=styled.View`
    padding-left:10px;
`

export default Header