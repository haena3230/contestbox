// SearchFilterPage
import React from 'react';
import {View,Text, ScrollView} from 'react-native';
import {Styles,Color,Container} from '~/Styles';
// components
import {FilterHeader,FilterMenuType,FilterMenuCategory,FilterBottom} from '~/Components/Filter';
import Loading from '~/Components/Loading';
// data
import {GET_FILTER} from '~/queries';
import {useQuery} from '@apollo/client';

const SearchFilterPage =()=>{
    const {loading,error,data}=useQuery(GET_FILTER);
    if(loading) return <Loading />;
    if(error) return <Text>err</Text>;
    if(data)
    return(
        <Container>
            <FilterHeader />
            <ScrollView style={{marginBottom:60}}>
                <FilterMenuType title={'종류'} tagArray={data.types}/>
                <FilterMenuCategory />
                <FilterMenuType title={'참여조건'} tagArray={data.conditions}/>
            </ScrollView>
            <FilterBottom />
        </Container>
        
    )
}

export default SearchFilterPage;