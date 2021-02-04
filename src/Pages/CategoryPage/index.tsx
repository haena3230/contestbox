// 1차 카테고리 분류 페이지
import React from 'react';
// styles
import { ScrollView } from 'react-native-gesture-handler';
import {Container, Styles,Color} from '~/Styles';
import styled from 'styled-components/native';

// component
import Category from '~/Components/Category';
import {CategoryPageProps} from '~/Types';
import Loading from '~/Components/Loading';

// data
import {GET_HOTS} from '~/queries';
import {useQuery} from '@apollo/client';

const CategoryPage =({navigation}:CategoryPageProps)=>{
    // category data
    let categories='';
    const {loading,error,data} = useQuery(GET_HOTS);
    if(loading) return <Loading />
    if(error) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(error.networkError.message)
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    }       
    if(data&&data.categories){
        categories=data.categories.map((data)=>
            <Category key={data.id.toString()} label={data.label} onPress={()=>{
                navigation.navigate('CategoryListPage',{
                    category:data.label,
                    categoryId:data.id
                });
            }}/>
        )
    }
    return(
        <Container>
            <ScrollView style={{padding:10}}>
                <Title>카테고리</Title>
                {categories}
            </ScrollView>
        </Container>
    )
}

export default CategoryPage;

const Title=styled.Text`
    ${Styles.m_font};
    font-weight:bold;
    color:${Color.g4_color};
    margin-vertical:10px;
    padding:10px;
`