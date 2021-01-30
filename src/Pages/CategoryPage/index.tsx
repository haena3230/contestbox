// 1차 카테고리 분류 페이지
import React from 'react';
// styles
import { ScrollView } from 'react-native-gesture-handler';
import {Container, Styles,Color} from '~/Styles';
import styled from 'styled-components/native';

// component
import Category from '~/Components/Category';
import {CategoryPageProps} from '~/Types';

const CategoryPage =({navigation}:CategoryPageProps)=>{
    return(
        <Container>
            <ScrollView style={{padding:10}}>
                <Title>카테고리</Title>
                <Category onPress={()=>{
                    navigation.navigate('CategoryListPage',{
                        category:'test'
                    });
                }}/>
                
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