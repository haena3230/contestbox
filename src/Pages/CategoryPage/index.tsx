// 1차 카테고리 분류 페이지
import React from 'react';
// styles
import { ScrollView } from 'react-native-gesture-handler';
import {Container, Styles,Color} from '~/Styles';
import styled from 'styled-components/native';

// component
import Category from '~/Components/Category';
import {CategoryPageProps} from '~/Types';
import {newStateArray,CategoryView} from '~/Components/Filter';
// data
import { useQuery } from '@apollo/client';
import { GET_HOTS } from '~/queries';
import Loading from '~/Components/Loading';
import { Text } from 'react-native-svg';

const CategoryPage =({navigation}:CategoryPageProps)=>{
    // category data
    const {loading, error,data}=useQuery(GET_HOTS,{
        fetchPolicy:'cache-and-network'
    });
    let categoryData=[];
    if(loading) return <Loading />
    if(error) return <Text>err</Text>
    if(data.categories){
        // console.log(CategoryView(data.categories))
        categoryData=CategoryView(data.categories).map((data)=>
            <Category key={data[0].id.toString()} label={data[0].label} onPress={()=>{
                navigation.push('CategoryListPage',{
                    categoryArray:newStateArray(data),
                    typeArray:null,
                    conditionArray:null,
                })
            }}/>
        )
    }
    return(
        <Container>
            <ScrollView style={{padding:10}}>
                <Title>카테고리</Title>
                {categoryData}
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
