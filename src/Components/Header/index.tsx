// 헤더 
import React from 'react';
// icon
import Flame from '~/Assets/fire-solid.svg';
import FilterIcon from '~/Assets/filter-solid.svg';
// style
import {Color,Styles,IconSize} from '~/Styles'
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Header=()=>{
    return(
        <HeaderContainer>
            <Box>
                <Item>
                    <Flame height={IconSize.icon} width={IconSize.icon} color={Color.p_color} />
                </Item>
                <Item>
                    <HeaderText>Contest Box</HeaderText>
                </Item>
            </Box>
        </HeaderContainer>
    )
}
interface FilterHeaderProps{
    onPressClose:()=>void;
}
export const FilterHeader = ({onPressClose}:FilterHeaderProps)=>{
    return(
        <FilterHeaderContainer backgroundColor={Color.w_color}>
            <Box>
                <Item>
                    <IconBorder>
                        <FilterIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.gray} />
                    </IconBorder>
                </Item>
                <Item>
                    <HeaderText>필터</HeaderText>
                </Item>
            </Box>
            <Close onPressClose={onPressClose} />
        </FilterHeaderContainer>
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
    justify-content:space-between;
    align-items:center;
`

const FilterHeaderContainer=styled.View`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    border-bottom-width:1px;
    border-color:${Color.border};
`
const HeaderText=styled.Text`
    ${Styles.m_b_font};
`
const Box = styled.View`
    flex-direction:row;
    align-items:center;
    padding-vertical:5px;
`
const Item=styled.View`
    padding-left:10px;
`

const IconBorder=styled.View`
    border-width:1px;
    border-color:${Color.border};
    border-radius:5px;
    padding:7px;
    margin:2px;
`
// close
const CloseBtn=styled.Text`
    ${Styles.m_font};
    padding-right:15px;
`

export default Header