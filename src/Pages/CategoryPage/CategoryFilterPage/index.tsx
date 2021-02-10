// CategoryFilterPage
import React from 'react';
import {Container} from '~/Styles';
// component
import {FilterHeader,FilterMenuType,FilterBottom} from '~/Components/Filter';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '~/Components/Loading';
// data
import { useQuery } from '@apollo/client';
import {GET_FILTER} from '~/queries';

const CategoryFilterPage =()=>{
    // filter 종류
    const { loading, error, data } = useQuery(GET_FILTER);
    if (loading) return <Loading />;
    if (error){
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(error.graphQLErrors)
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    }
    if(data)
    return(
        <Container>
            <FilterHeader />
            <ScrollView>
                <FilterMenuType title={'종류'} tagArray={data.types}/>
                <FilterMenuType title={'참여조건'} tagArray={data.conditions}/>
            </ScrollView>
            <FilterBottom />
        </Container>
    )
}

export default CategoryFilterPage;