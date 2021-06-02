// totop btn
import React from 'react';
import TopIcon from '~/Assets/chevron-up-solid.svg';
import {Color,IconSize} from '~/Styles';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';



interface ToTopProps{
    onPressToTop:()=>void;
}
const ToTop=({onPressToTop}:ToTopProps)=>{
    return(
        <TouchableOpacity 
        onPress={onPressToTop}    
        style={{
            elevation: 3,
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            bottom:20,
            right:20,
            padding:5,
            backgroundColor:Color.p_color,
            borderRadius:20,
        }}>
            <TopIcon height={IconSize.sicon} width={IconSize.sicon} color={Color.w_color} />
        </TouchableOpacity>
    )
}






export default ToTop;