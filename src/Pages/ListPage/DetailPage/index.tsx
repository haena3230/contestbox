// list detail Page
import React,{useRef} from 'react';
import {View,Text} from 'react-native';
// style
import {Color,Container, Styles} from '~/Styles';
import styled from 'styled-components/native';
// components
import Header from '~/Components/Header';
import ToTop from '~/Components/ToTop';
import { ScrollView } from 'react-native-gesture-handler';

const DetailPage =()=>{
    // totop
    const scrollRef=useRef<ScrollView>();
    const onPressToTop=()=>{
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        })
    };
    return(
        <Container>
            <Header />
            <Box>
                <ScrollView ref={scrollRef}>
                    <Text>detail</Text>
                </ScrollView>
            </Box>
            <ToTop onPressToTop={onPressToTop}/>
        </Container>
    )
}

const Box=styled.ScrollView`
    margin:10px;
    background-color:${Color.w_color};
    border-radius:7px;
`

export default DetailPage;