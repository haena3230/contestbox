// scrap list page
import React from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import { MyPageProps } from '~/Types';
// component
import { MenuHeader } from '~/Components/Header';
import { Container } from '~/Styles';
import TextList from '~/Components/TextList';


import moment from 'moment';
let testt = moment()
const test={
    categories:{
        id:'12345',
        label:'카테고리'
    },
    deadline:testt.format(),
    poster:null,
    recruit:'COMPLETED',
    title:'제목이빈다.',
    viewcount:3,
}

const ScrapListPage=({navigation}:MyPageProps)=>{
    return(
        <View>
            <MenuHeader pageName={'스크랩 목록'} onPressClose={()=>navigation.goBack()} onPressSubmit={()=>null}/>
            <Container>
                <TextList 
                    categories={[test.categories]}
                    deadline={test.deadline}
                    poster={test.poster}
                    recruit={test.recruit}
                    title={test.title}
                    viewcount={test.viewcount}
                    onPress={()=>null}
                    />
            </Container>
        </View>
    )
}

export default ScrapListPage