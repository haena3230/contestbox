// SearchFilterPage
import React from 'react';
import {View,Text, ScrollView} from 'react-native';
// components
import {FilterHeader,FilterMenuType,FilterMenuCategory,FilterBottom} from '~/Components/Filter';
// style
import {Styles,Color,Container} from '~/Styles';

const SearchFilterPage =()=>{
    return(
        <Container>
            <FilterHeader />
            <ScrollView style={{marginBottom:60}}>
                <FilterMenuType title={'종류'}/>
                <FilterMenuCategory />
                <FilterMenuType title={'참여조건'}/>
            </ScrollView>
            <FilterBottom />
        </Container>
        
    )
}

export default SearchFilterPage;