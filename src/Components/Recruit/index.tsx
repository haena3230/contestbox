import React from 'react';
import {View,Text} from 'react-native';
import { Color } from '~/Styles';

export const Recruit=()=>{
    return(
        <View style={{width:60,height:15, backgroundColor:Color.p_color,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:Color.w_color,fontSize:10}}>접수중</Text>
        </View>
    )
}

export const NoRecruit=()=>{
    return(
        <View style={{width:60,height:15, backgroundColor:Color.g_color,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:Color.w_color,fontSize:10}}>접수마감</Text>
        </View>
    )
}