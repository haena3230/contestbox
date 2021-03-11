// 1차 카테고리 분류 페이지
import React from 'react';
// styles
import { ScrollView } from 'react-native-gesture-handler';
import {Container, Styles,Color} from '~/Styles';
import styled from 'styled-components/native';

// component
import Category from '~/Components/Category';
import {CategoryPageProps} from '~/Types';
import {newStateArray} from '~/Components/Filter';
// data
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '~/App';
import { CLCategoryAction } from '~/Store/actions';

const CategoryPage =({navigation}:CategoryPageProps)=>{
    // category data
    const categories= useSelector((state:RootState)=>state.query.categoriesArray);
    const dispatch = useDispatch();
    const storeNewArrayCategories=(Array:Array<any>)=>{
        dispatch(CLCategoryAction(Array))
    }
    return(
        <Container>
            <ScrollView style={{padding:10}}>
                <Title>카테고리</Title>
                {categories.map((data)=>{
                    return(
                        <Category key={data[0].id.toString()} label={data[0].label} onPress={()=>{
                            navigation.navigate('CategoryListPage'),
                            storeNewArrayCategories(newStateArray(data));
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
