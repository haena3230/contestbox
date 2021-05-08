// 헤더 
import React from 'react';
// icon
import Flame from '~/Assets/fire-solid.svg';
import BackIcon from '~/Assets/chevron-left-solid.svg';
// style
import {Color,Styles,IconSize} from '~/Styles'
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';



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


// 닫기 버튼
interface CloseBtnProps{
    onPressClose:()=>void;
}
const Close = ({onPressClose}:CloseBtnProps)=>{
    return(
        <TouchableOpacity onPress={onPressClose}>
                <CloseBtn>닫기</CloseBtn>
        </TouchableOpacity>  
    )
}

const HeaderContainer=styled.View`
    width:100%;
    flex-direction:row;
    align-items:center;
    padding-vertical:5px;
`
const HeaderText=styled.Text`
    ${Styles.b_b_font};
`
const Item=styled.View`
    padding-left:10px;
`
// close
const CloseBtn=styled.Text`
    ${Styles.m_font};
    padding-right:15px;
`

export default Header