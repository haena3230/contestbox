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
import Loading from '~/Components/Loading';
import { ErrorPage } from '~/Components/Error';
import { CategotyDesign, CategotyIT, CategotyMusic, CategotySport, CategotyStudy, CategotyUCC } from '~/Components/CategoryBtn';
// data
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '~/queries';

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
                    categoryIdArr:[data[0].id]
                })
        }}>
            <CateText>{data[0].label}</CateText>
        </Box>
        )
    }
    return(
        <ScrollView>
            <Container>
                <Title>
                    <Text style={Styles.m_b_font}>인기 카테고리</Text>
                </Title>
                <View style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-between'}}>
                    <CategotySport />
                    <CategotyIT />
                    <CategotyStudy />
                    <CategotyUCC />
                    <CategotyMusic />
                    <CategotyDesign />
                </View>
                <Title>
                    <Point>카테고리</Point>
                    <Text style={Styles.mb_b_font}>를 통해 둘러보세요</Text>
                </Title>
                <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
                    {categoryData}
                </View>

            </Container>
        </ScrollView>
    )
}


export default CategoryPage;

const Title=styled.Text`
  margin:20px 0 15px 0;
`

const Point = styled.Text`
  ${Styles.mb_b_font};
  color:${Color.p_color};
`

const Box = styled.TouchableOpacity`
    width:49%;
    padding-horizontal:8px;
    background-color:${Color.w_color};
    border-width:1px;
    border-color:${Color.border};
    border-radius:5px;
    margin-bottom:5px;
`
const CateText = styled.Text`
    ${Styles.m_m_font};
    padding-horizontal:10px;
`
