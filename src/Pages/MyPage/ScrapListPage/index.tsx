// scrap list page
import React, { useState } from 'react';
import { View,ScrollView,TouchableOpacity } from 'react-native';
import { MyPageProps } from '~/Types';
// component
import { PageHeader } from '~/Components/Header';
import { Color, Container, IconSize } from '~/Styles';
import TextList from '~/Components/TextList';


import moment from 'moment';
let testt = moment()
const test={
    categories:{
        id:'12345',
        label:'카테고리'
    },
    deadline:testt.format(),
    poster:'~/Assets/poster.png',
    recruit:'COMPLETED',
    title:'제목이빈다.',
    host:'국립지방뭐시기',
    viewcount:3,
}


const ScrapListPage=({navigation}:MyPageProps)=>{
    const[menu,setMenu]=useState<boolean>(false)
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
                <PageHeader pageName={'스크랩 목록'} onPressClose={()=>navigation.goBack()} />
                <View style={{marginVertical:10}}>
                   <TextList 
                        categories={[test.categories]}
                        deadline={test.deadline}
                        onPress={()=>null}
                        poster={test.poster}
                        recruit={test.recruit}
                        title={test.title}
                        host={test.host}
                        viewcount={test.viewcount}
                        viewScrap={true}
                        isScrap={true}
                   />
                </View>
            </Container>
        </ScrollView>
    )
}


export default ScrapListPage