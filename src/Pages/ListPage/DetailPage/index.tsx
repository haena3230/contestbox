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
import {HashTag} from '~/Components/HashTag';
import {ShortBtn} from '~/Components/Btn';
// navi
import { useRoute } from '@react-navigation/native';
import {ListScreenRouteProp} from '~/Types';

// data
import { useQuery, gql } from '@apollo/client';

const DetailPage =()=>{
    // totop
    const scrollRef=useRef<ScrollView>();
    const onPressToTop=()=>{
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        })
    };
    // data
    const route=useRoute<ListScreenRouteProp>();
    const GET_DETAILS= gql`
    query {
        contest(id:${JSON.stringify(route.params.listId)}) {
            posterURL
            title
            hits
            categories{
                id
                label
            }
            types{
                id
                label
            }
            applicationPeriodStartAt
            applicationPeriodEndAt
            siteURL
        }
    }
    `;
    const { loading, error, data } = useQuery(GET_DETAILS);
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error</Text>;
    if(data&&data.contest)
    return(
        <Container>
            <Header />
            <Text>{typeof(route.params.listId)}</Text>
            <Box>
                <ScrollView ref={scrollRef}>
                    <Poster source={require('~/Assets/poster.png')}/>    
                    <Title>2020/21 한국 어학올림피아드</Title>
                    <TextBox>
                        <Text style={Styles.s_font}>조회수 0</Text>
                    </TextBox>
                    <ContentTitle>카테고리</ContentTitle>
                    <TagBox>
                        <HashTag hashtag={'test'} picked={false}/>
                    </TagBox>
                    <ContentTitle>참여조건</ContentTitle>
                    <TagBox>
                        <HashTag hashtag={'test'} picked={false}/>
                    </TagBox>
                    <Period />
                    <View style={{width:'100%',alignItems:'flex-end'}}>
                        <View style={{width:'30%'}}>
                            <ShortBtn text={'홈페이지'} onPress={()=>null}/>
                        </View>
                    </View>
                    <ContentTitle>상세내용</ContentTitle>
                    
                    <ContentTitle>대회 장소</ContentTitle>
                </ScrollView>
            </Box>
            <ToTop onPressToTop={onPressToTop}/>
        </Container>
    )
}

const Period = ()=>{
    return(
        <PeriodContainer>
            <View style={{alignItems:'center'}}>
                <Text>접수시작</Text>
                <Title>10월 20일 (화)</Title>
                <Text style={Styles.ss_font}>2020년   오전 12:00</Text>
            </View>
            <View style={{alignItems:'center'}}>
                <Text>접수마감</Text>
                <Title>11월 20일 (금)</Title>
                <Text style={Styles.ss_font}>2020년   오후 11:59</Text>
            </View>
        </PeriodContainer>
    )
}

// detail page
const Box=styled.ScrollView`
    margin:10px;
    background-color:${Color.w_color};
    border-radius:7px;
    padding-horizontal:10px;
    border-width:1px;
    border-color:${Color.g1_color};
`

const Poster =styled.Image`
    width:100%;
    height:450px;
    resizeMode:contain
    margin-vertical:10px;
`
const TextBox=styled.View`
    margin-vertical:5px;
`
const ContentTitle=styled.Text`
    ${Styles.m_font};
    font-weight:bold;
    margin-top:20px;
    margin-bottom:5px;
`
const TagBox=styled.View`
    flex-direction:row;
    flex-wrap:wrap;
`

const Title=styled.Text`
    ${Styles.b_font};
    font-weight:bold;
    margin-vertical:10px;
`

// period
const PeriodContainer=styled.View`
    flex-direction:row;
    justify-content:space-around;
    background-color:${Color.g2_color};
    border-radius:10px;
    padding:10px;
    margin-vertical:20px;
`
export default DetailPage;