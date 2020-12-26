// 대회 리스트
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native'
import {Recruit,NoRecruit} from '~/Components/Recruit';
import {HashTag} from '~/Components/HashTag';
import {Styles} from '~/Styles';

interface TextListProps{
    recruit:boolean;
    tags:Array<string>;
    title:string;
    viewcount:number;
}
const TextList=({recruit,tags,title,viewcount}:TextListProps)=>{
    return(
        <Container>
            {recruit?(
                <Recruit />
            ):(
                <NoRecruit />
            )}
            <Title>{title}</Title>
            <ViewCount>조회수 {viewcount}</ViewCount>
            <View style={{flexDirection:'row', flexWrap:'wrap',marginVertical:10}}>
                {tags.map((tag)=>{
                    return(
                        <HashTag key={tag} hashtag={tag} picked={false}/>
                    )
                })}
            </View>
        </Container>
    )
}

const Container = styled.View`
    width:100%;
    background-color:white;
    border-radius:10px;
    padding:20px;
    margin-vertical:5px;
`
const Title=styled.Text`
    margin-top:10px;
    ${Styles.s_font};
`
const ViewCount=styled.Text`
    margin-top:5px;
    ${Styles.ss_font};
`
export default TextList;