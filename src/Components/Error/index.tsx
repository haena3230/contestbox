import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import BirdIcon from '~/Assets/kiwi-bird-solid.svg';
import { Color, Container, Styles } from '~/Styles';

interface ErrorProps{
    onPress:()=>void;
}
export const ErrorPage=({onPress}:ErrorProps)=>{    
    return(
    <Container>
        <TouchableOpacity style={{height:'100%',alignItems:'center',justifyContent:'center'}}
            onPress={onPress}
        >
            <BirdIcon width={'30%'} height={'30%'} color={Color.g4_color} />
            <View style={{padding:20}}>
                <Text style={Styles.b_m_font}>Oooooops!</Text>
            </ View>
            <Text style={Styles.b_m_font}>로드하는 중에 오류가 발생했습니다.</Text>
            <Text style={Styles.b_m_font}>탭하여 다시 시도 하세요.</Text>
        </TouchableOpacity>
    </Container>
    )
}
