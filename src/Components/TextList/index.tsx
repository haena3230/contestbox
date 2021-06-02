// 대회 리스트
import React, { useEffect } from 'react';
import {View,Text} from 'react-native';
import styled from 'styled-components/native'
// 접수예정,접수중,접수마감,취소,마감임박
import {PreRecruit,Recruit,NoRecruit,CancelRecruit,ImmenentRecruit} from '~/Components/Recruit';
import {Styles,Color} from '~/Styles';
import moment from 'moment';
import {HashTag, ListBoxCategory} from '~/Components/HashTag';

interface TextListProps{
    recruit:string;
    deadline:string;
    title:string;
    viewcount:number;
    categories:Array<{id:string,label:string}>;
    poster:string;
    onPress:()=>void;
}
export const status=(status,deadline)=>{
    // 현재로부터 7일 미만이면 마감임박
    let now = moment();        
    let after = moment(now).add(7,'days');
    
    switch(status){
        case 'NOTSTARTED':
            return <PreRecruit />;
        case 'INPROGRESS':
            if(moment(now).isBefore(deadline)&&moment(after).isAfter(deadline))       
                return <ImmenentRecruit />;
            else return <Recruit />;
        case 'COMPLETED':
            return <NoRecruit />;
    }
}
const TextList=({recruit,deadline,title,viewcount,categories,poster,onPress}:TextListProps)=>{
    
    return(
        <ListBox onPress={onPress}>
            <View style={{width:'75%',padding:10}}>
                <Recruitbox>
                    {status(recruit,deadline)}
                </Recruitbox>
                <Title numberOfLines={1}>{title}</Title>
                <ViewCount>조회수 {viewcount}</ViewCount>
                {!categories?null:(
                    <TagBox>
                        {categories.slice(0,2).map((tag)=>
                        <ListBoxCategory key={tag.id.toString()} category={tag.label}/>
                        )}
                        {categories.length>2?(
                        <ListBoxCategory category={'+'+ (categories.length-2)}/>
                        ):null}
                    </TagBox>
                    )}
            </View>
            <View style={{width:'25%',justifyContent:'center'}}>
            {!poster?null:(
                <Poster source={{
                    uri:`${poster},w_594,h_840`
                }}/>      
            )}
            </View>
        </ListBox>
    )
}


export const ListBox = styled.TouchableOpacity`
    background-color:white;
    border-radius:10px;
    border-width:1px;
    border-color:${Color.border};
    margin-vertical:5px;
    flex-direction:row;  
    justify-content:space-between;
    padding:5px;
`

export const TagBox=styled.View`
  flex-direction:row;
  flex-wrap:wrap;
  margin-top:15px;
`
export const Poster =styled.Image`
    aspect-ratio:0.7;
    border-radius:5px;
    overflow:hidden;
    right:0;
    width:22%;
`
const Recruitbox=styled.View`
    flex-direction:row;
`
const Title=styled.Text`
    ${Styles.m_b_font};

`
const ViewCount=styled.Text`
    ${Styles.ss_font};
`
export default TextList;
