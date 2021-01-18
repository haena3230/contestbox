// category page categotry component
import React from 'react';
import styled from 'styled-components/native';
import {Styles, Color} from '~/Styles';

interface CategoryProps{
    onPress:()=>void;
}
const Category=({onPress}:CategoryProps)=>{
    
    return( 
        <Box onPress={onPress}>
            <Text>test</Text>
        </Box> 
    )
}



const Box = styled.TouchableOpacity`
    background-color:${Color.w_color};
    border-width:1px;
    border-color:${Color.g1_color};
    border-radius:5px;
    margin-vertical:3px;
    
`
const Text = styled.Text`
    ${Styles.m_font};
    color:${Color.g4_color};
    padding:5px;
    margin-left:15px;
`


export default Category;