// totop btn
import React from 'react';
import TopIcon from '~/Assets/chevron-up-solid.svg';
import {Color,IconSize} from '~/Styles';
import styled from 'styled-components/native';



interface ToTopProps{
    onPressToTop:()=>void;
}
const ToTop=({onPressToTop}:ToTopProps)=>{
    return(
        <Btn onPress={onPressToTop}>
            <TopIcon height={IconSize.icon} width={IconSize.icon} color={Color.w_color} />
        </Btn>
    )
}

const Btn=styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    position:absolute;
    bottom:20px;
    right:20px;
    padding:5px;
    background-color:${Color.p_color};
    border-radius:20px;
    z-index:2;
`



export default ToTop;