import React from 'react';
import {View, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// styles
import {Container, Styles,Color} from '~/Styles';
import styled from 'styled-components/native';

// componenet
import {Filter} from '~/Components/Filter';
import { useNavigation } from '@react-navigation/native';


const CategoryPage =()=>{
    return(
        <Container>
            <ScrollView style={{padding:15}}>
                <Title>카테고리</Title>
                <Filter/>
            </ScrollView>
        </Container>
    )
}

export default CategoryPage;

const Title=styled.Text`
    ${Styles.m_font};
    font-weight:bold;
    color:${Color.g4_color};
    padding-vertical:10px;
`