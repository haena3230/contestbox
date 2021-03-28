// 헤더 
import React from 'react';
import {Text} from 'react-native';
// icon
import Flame from '~/Assets/fire-solid.svg';
import Search from '~/Assets/search-solid.svg';
import FilterIcon from '~/Assets/filter-solid.svg';
// style
import {Color,Styles,IconSize} from '~/Styles'
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Header=()=>{
    return(
        <HeaderContainer backgroundColor={Color.l_color}>
            <Box>
                <Item>
                    <Flame height={IconSize.icon} width={IconSize.icon} color={Color.p_color} />
                </Item>
                <Item>
                    <Text style={Styles.b_font}>Contest Box</Text>
                </Item>
            </Box>
        </HeaderContainer>
    )
}
interface FilterHeaderProps{
    onPress:()=>void;
}
export const FilterHeader = ({onPress}:FilterHeaderProps)=>{
    return(
        <HeaderContainer backgroundColor={Color.w_color}>
            <Box>
                <Item>
                    <FilterIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
                </Item>
                <Item>
                    <Text style={Styles.m_font}>필터</Text>
                </Item>
            </Box>
            <Box>
                <Item>
                    <TouchableOpacity onPress={onPress}>
                        <Exit>닫기</Exit>
                    </TouchableOpacity>
                </Item>
            </Box>
        </HeaderContainer>
    )
}

interface HeaderContainerProps{
    backgroundColor:string;
}
const HeaderContainer=styled.View`
    width:100%;
    padding-vertical:15px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    background-color:${(props:HeaderContainerProps)=>props.backgroundColor};
`
const Box = styled.View`
    flex-direction:row;
    align-items:center;
`
const Item=styled.View`
    padding-horizontal:10px;
`
const Exit=styled.Text`
    ${Styles.m_font};
    color:${Color.g3_color};
`

export default Header