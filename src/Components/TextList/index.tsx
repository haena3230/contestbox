// 대회 리스트
import React, { useEffect } from 'react';
import {View,Text} from 'react-native';
import styled from 'styled-components/native'
// 접수예정,접수중,접수마감,취소,마감임박
import {PreRecruit,Recruit,NoRecruit,CancelRecruit,ImmenentRecruit} from '~/Components/Recruit';
import {Styles} from '~/Styles';
import moment from 'moment';

interface TextListProps{
    recruit:string;
    deadline:string;
    title:string;
    viewcount:number;
}
const TextList=({recruit,deadline,title,viewcount}:TextListProps)=>{
    const status=(status)=>{
        switch(status){
            case 'NOTSTARTED':
                return <PreRecruit />;
            case 'INPROGRESS':
                return <Recruit />;
            case 'COMPLETED':
                return <NoRecruit />;
        }
    }
    const Immenent=(deadline)=>{
        // 현재로부터 7일 미만이면 마감임박
        let now = moment();        
        let after = moment(now).add(7,'days');
        if(moment(now).isBefore(deadline)&&moment(after).isAfter(deadline))       
        return <ImmenentRecruit />;
    }
    return(
        <View>
            <Recruitbox>
                {status(recruit)}
                {Immenent(deadline)}
            </Recruitbox>
            <Title numberOfLines={1}>{title}</Title>
            <ViewCount>조회수 {viewcount}</ViewCount>
        </View>
    )
}
const Recruitbox=styled.View`
    flex-direction:row;
`
const Title=styled.Text`
    margin-top:10px;
    ${Styles.m_font};

`
const ViewCount=styled.Text`
    margin-top:5px;
    ${Styles.ss_font};
`
export default TextList;