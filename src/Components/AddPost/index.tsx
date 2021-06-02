// add post btn
import React from 'react';
import PenIcon from '~/Assets/create_black_24dp.svg';
import {Color,IconSize} from '~/Styles';
import { TouchableOpacity, View } from 'react-native';



interface AddBtnProps{
    onPressAddBtn:()=>void;
}
const AddBtn=({onPressAddBtn}:AddBtnProps)=>{
    return(
        <TouchableOpacity 
        onPress={onPressAddBtn}    
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
            <PenIcon height={IconSize.sicon} width={IconSize.sicon} fill={Color.w_color} />
        </TouchableOpacity>
    )
}






export default AddBtn;