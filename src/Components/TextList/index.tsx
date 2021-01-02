// 대회 리스트
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native'
import {Recruit,NoRecruit} from '~/Components/Recruit';
import {Styles} from '~/Styles';

interface TextListProps{
    recruit:boolean;
    title:string;
    viewcount:number;
}
const TextList=({recruit,title,viewcount}:TextListProps)=>{
    return(
        <View>
            {recruit?(
                <Recruit />
            ):(
                <NoRecruit />
            )}
            <Title>{title}</Title>
            <ViewCount>조회수 {viewcount}</ViewCount>
        </View>
    )
}

const Title=styled.Text`
    margin-top:10px;
    ${Styles.s_font};
`
const ViewCount=styled.Text`
    margin-top:5px;
    ${Styles.ss_font};
`
export default TextList;