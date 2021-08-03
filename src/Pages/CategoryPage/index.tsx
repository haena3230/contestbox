// 1차 카테고리 분류 페이지
import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
// styles
import { ScrollView } from 'react-native-gesture-handler';
import {Container, Styles,Color,SectionTitle, PointText, Title} from '~/Styles';
import styled from 'styled-components/native';

// component
import {CategoryPageProps} from '~/Types';
import {newStateArray,newStateArrayHot, pickedIdArray} from '~/Components/Filter';
import {CategoryDesign, CategoryIT, CategoryMusic, CategorySport, CategoryStudy, CategoryUCC} from '~/Components/CategoryBtn';
// data
import { treeCategoriesVar } from '~/global';

const CategoryPage =({navigation}:CategoryPageProps)=>{
    useEffect(()=>{
        console.log('categoryPage')
    },[])
    // category data
    const treeCategories = treeCategoriesVar()
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
                <SectionTitle>인기 카테고리</SectionTitle>
                <View style={{flexWrap:'wrap',flexDirection:'row', justifyContent:'space-between'}}>
              {treeCategories.map((group)=>{
              if(group[0].label=="스포츠") return(
                  <CategorySport key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              else if(group[0].label=="IT") return(
                  <CategoryIT key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              else if(group[0].label=="학습") return(
                  <CategoryStudy key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              else if(group[0].label=="UCC") return(
                  <CategoryUCC key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              else if(group[0].label=="음악") return(
                  <CategoryMusic key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              else if(group[0].label=="미술")return(
                  <CategoryDesign key = {group[0].id} onPress={()=>navigation.navigate('CategoryListPage',{
                    categoryArray:newStateArrayHot(group),
                    categoryIdArr:[group[0].id]
                  })}/>)
              })}
              
            </View>
                <SectionTitle>
                    <PointText>카테고리</PointText>
                    <Title>를 통해 둘러보세요</Title>
                </SectionTitle>
                <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
                    {treeCategories.map((group)=>{
                        return(
                        group.map((data)=>{
                            return(
                            <Box  key={data.id} onPress={()=>{
                                navigation.push('CategoryListPage',{
                                        categoryArray:newStateArray(group,data.id),
                                        categoryIdArr:pickedIdArray(newStateArray(group,data.id))
                                    })}}>
                                <CateText>{data.label}</CateText>
                            </Box>
                        )}))
                    })}
                </View>
            </Container>
        </ScrollView>
    )
}


export default CategoryPage;


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
