// list detail Page
import React,{useCallback, useRef} from 'react';
import {View,Text, Linking, Alert} from 'react-native';
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
import { useQuery } from '@apollo/client';
import {GET_DETAILS} from '~/queries';

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
    const { loading, error, data } = useQuery(GET_DETAILS,{
        variables:{id:route.params.listId},
    });
    // link
    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
            await Linking.openURL(url);
            } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);
        
    return <ShortBtn text={children} onPress={handlePress}/>;
    };
    // period
    const PeriodSplit=(At)=>{
        let am;
        let hour;
        let Period =At.split('T');
        let Date=Period[0].split('-');
        let Time=Period[1].split(':',2);
        if(Time[0]>'12'){
            am=false;
            hour=parseInt(Time[0])-12;
        }
        else {
            am= true;
            hour=parseInt(Time[0]);
        }
        return[Date,Time,am,hour];
    }
    let Start = PeriodSplit(data.contest.applicationPeriodStartAt);
    let End = PeriodSplit(data.contest.applicationPeriodEndAt);
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error</Text>;
    if(data&&data.contest)
    return(
        <Container>
            <Header />
            
            <Box>
                <ScrollView ref={scrollRef}>
                    {data.contest.posterURL!==""?(
                        <Poster source={{uri:data.contest.posterURL}}/>    
                    ):(
                        // <Poster source={require('~/Assets/poster.png')}/>
                        null      
                    )}
                    
                    <Title>{data.contest.title}</Title>
                    <TextBox>
                        <Text style={Styles.s_font}>조회수 {data.contest.hits}</Text>
                    </TextBox>
                    {data.contest.categories!==null?(
                        <View>
                            <ContentTitle>카테고리</ContentTitle>
                            <TagBox>
                            {data.contest.categories.map((data)=>{
                                return(
                                    <HashTag key= {data.id} hashtag={data.label} picked={false}/>
                                )
                            })}
                            </TagBox>
                        </View>
                    ):(
                        null
                    )}
                    {data.contest.types!==null?(
                        <View>
                            <ContentTitle>참여조건</ContentTitle>
                            <TagBox>
                                {data.contest.types.map((data)=>{
                                    return(
                                        <HashTag key = {data.id} hashtag={data.label} picked={false}/>
                                    )
                                })}
                            </TagBox>
                        </View>
                    ):(
                        null
                    )}
                    <Period 
                        sY={Start[0][0]} sM={Start[0][1]} sD={Start[0][2]} sH={Start[3]} sm={Start[1][1]} sam={Start[2]}
                        eY={End[0][0]} eM={End[0][1]} eD={End[0][2]} eH={End[3]} em={End[1][1]} eam={End[2]}
                    />
                    {data.contest.siteURL!==""?(
                        <View style={{width:'100%',alignItems:'flex-end'}}>
                            <View style={{width:'30%'}}>
                                <OpenURLButton url={data.contest.siteURL}>홈페이지</OpenURLButton>
                            </View>
                        </View>
                    ):(
                       null
                    )}
                    <ContentTitle>상세내용</ContentTitle>
                    
                    <ContentTitle>대회 장소</ContentTitle>
                </ScrollView>
            </Box>
            <ToTop onPressToTop={onPressToTop}/>
        </Container>
    )
}

interface PeriodProps{
    sam:boolean;
    eam:boolean;
    sY:string;
    sM:string;
    sD:string;
    sH:string;
    sm:string;
    eY:string;
    eM:string;
    eD:string;
    eH:string;
    em:string;
}
const Period = ({sY,sM,sD,sH,sm,eY,eM,eD,eH,em,sam,eam}:PeriodProps)=>{
    return(
        <PeriodContainer>
            <View style={{alignItems:'center'}}>
                <Text>접수시작</Text>
                <Title>{sM}월 {sD}일 (화)</Title>
                <Time>
                    <TimeText>{sY}년</TimeText>
                    {sam?(
                        <TimeText>오전</TimeText>
                    ):(
                        <TimeText>오후</TimeText>
                    )}
                    <TimeText>{sH}:{sm}</TimeText>
                </Time>
                
            </View>
            <View style={{alignItems:'center'}}>
                <Text>접수마감</Text>
                <Title>{eM}월 {eD}일 (금)</Title>
                <Time>
                    <TimeText>{eY}년</TimeText>
                    {eam?(
                        <TimeText>오전</TimeText>
                    ):(
                        <TimeText>오후</TimeText>
                    )}
                    <TimeText>{eH}:{em}</TimeText>
                </Time>
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
const Time=styled.View`
    flex-direction:row;
`
const TimeText =styled.Text`
    ${Styles.ss_font};
    margin-horizontal:3px;

`
export default DetailPage;