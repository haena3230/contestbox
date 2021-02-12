// 1차 카테고리 분류 페이지
import React from 'react';
// styles
import { ScrollView } from 'react-native-gesture-handler';
import {Container, Styles,Color} from '~/Styles';
import styled from 'styled-components/native';

// component
import Category from '~/Components/Category';
import {CategoryPageProps} from '~/Types';

// data
import {useSelector} from 'react-redux';
import {RootState} from '~/App';

const CategoryPage =({navigation}:CategoryPageProps)=>{
    // category data
    const categories= useSelector((state:RootState)=>state.query.firstCategories)
    return(
        <Container>
            <ScrollView style={{padding:10}}>
                <Title>카테고리</Title>
                {categories.map((data)=>{
                    return(
                        <Category key={data.id.toString()} label={data.label} onPress={()=>{
                        navigation.navigate('CategoryListPage',{
                            category:data.label,
                            categoryId:data.id
                        });
                    }}/>
                    )
                })}
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