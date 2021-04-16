// 1차 카테고리 분류 페이지
import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
// styles
import { ScrollView } from 'react-native-gesture-handler';
import {Container, Styles,Color} from '~/Styles';
import styled from 'styled-components/native';

// component
import {CategoryPageProps} from '~/Types';
import {newStateArray,CategoryView} from '~/Components/Filter';
// data
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '~/queries';
import Loading from '~/Components/Loading';
import { ErrorPage } from '~/Components/Error';

const CategoryPage =({navigation}:CategoryPageProps)=>{
    useEffect(()=>{
        console.log('categoryPage')
    },[])
    // category data
    const {loading, error,data,refetch}=useQuery(GET_CATEGORIES,{
        fetchPolicy:'cache-and-network'
    });
    let categoryData=[];
    if(loading) return <Loading />
    if(error) return <ErrorPage onPress={async ()=>{
    try{
        await refetch()
        console.log('refetch')
    } catch(e){
        console.log('refetch err')
    }}} />
    if(data.categories){
        // console.log(CategoryView(data.categories))
        categoryData=CategoryView(data.categories).map((data)=>
        <Box  key={data[0].id.toString()} onPress={()=>{
            navigation.push('CategoryListPage',{
                    categoryArray:newStateArray(data),
                    typeArray:null,
                    conditionArray:null,
                })
        }}>
            <CateText>{data[0].label}</CateText>
        </Box>
        )
    }
    return(
        <Container>
            <Title>카테고리</Title>
            <ScrollView style={{padding:10}}>
                <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
                    {categoryData}
                </View>
            </ScrollView>
        </Container>
    )
}


export default CategoryPage;

const Title=styled.Text`
    ${Styles.m_b_font};
    padding:30px;
`

const Box = styled.TouchableOpacity`
    width:48%;
    padding-horizontal:8px;
    background-color:${Color.w_color};
    border-width:1px;
    border-color:${Color.g1_color};
    border-radius:5px;
    margin:3px;
`
const CateText = styled.Text`
    ${Styles.m_m_font};
    padding:5px;
`
