// 헤더 
import React from 'react';
// icon
import Flame from '~/Assets/fire-solid.svg';
import BackIcon from '~/Assets/chevron-left-solid.svg';
// style
import {Color,Styles,IconSize} from '~/Styles'
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';

const Header=()=>{
    return(
        <HeaderContainer>
            <Item>
                <Flame height={IconSize.icon} width={IconSize.icon} color={Color.p_color} />
            </Item>
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
            <Item>
                <BackIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.gray} onPress={onPressClose}/>
            </Item>
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
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
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

const HeaderContainer=styled.View`
    width:100%;
    flex-direction:row;
    align-items:center;
`

const SubmitHeaderContainer=styled.View`
    flex-direction:row;
    align-items:center;
`
const HeaderText=styled.Text`
    ${Styles.mb_b_font};
`
const Item=styled.View`
    padding-left:10px;
`

export default Header