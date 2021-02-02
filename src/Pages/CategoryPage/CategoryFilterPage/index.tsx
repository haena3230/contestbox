// CategoryFilterPage
import React from 'react';
import {View,Text} from 'react-native';
import {Container} from '~/Styles';
// component
import {FilterHeader,FilterMenuType,FilterBottom} from '~/Components/Filter';
import { ScrollView } from 'react-native-gesture-handler';

const CategoryFilterPage =()=>{
    return(
        <Container>
            <FilterHeader />
            <ScrollView>
                <FilterMenuType title={'종류'}/>
                <FilterMenuType title={'참여조건'}/>
            </ScrollView>
            <FilterBottom />
        </Container>
    )
}

export default CategoryFilterPage;