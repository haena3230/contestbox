// list detail Page
import React,{useCallback, useRef} from 'react';
import {View,Text, Linking, Alert} from 'react-native';
import moment from 'moment';
// style
import {Color,Container, Styles} from '~/Styles';
import styled from 'styled-components/native';
// components
import Header from '~/Components/Header';
import ToTop from '~/Components/ToTop';
import { ScrollView } from 'react-native-gesture-handler';
import {HashTag} from '~/Components/HashTag';
import {ShortBtn} from '~/Components/Btn';
import Loading from '~/Components/Loading';
// navi
import { useRoute } from '@react-navigation/native';
import {ListScreenRouteProp} from '~/Types';
import {SndMap} from '~/Components/Map';

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
        variables:{id:route.params.listId}
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
        let Period =At.split('T');
        let Date=Period[0].split('-');
        let Day = moment(Period[0]).day();
        let Time=Period[1].split(':',2);
        let New = Date.concat(Day,Time);
        return New
    }
    if (loading) return <Loading />;
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
                    
                    <Period Start={PeriodSplit(data.contest.application.period.startAt)} End={PeriodSplit(data.contest.application.period.endAt)}/>
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
                    <MapBox>
                        <SndMap latitude={37.565051} longitude={126.978567}/>
                    </MapBox>
                </ScrollView>
            </Box>
            <ToTop onPressToTop={onPressToTop}/>
        </Container>
    )
}

interface PeriodProps{
    Start:Array<any>;
    End:Array<any>;
}
// 연/월/일/요일/시간/분
const Period = ({Start,End}:PeriodProps)=>{
    const day=(num)=>{
        if(num===0) return '일';
        if(num===1)return '월';
        if(num===2)return '화';
        if(num===3)return '수';
        if(num===4)return '목';
        if(num===5)return '금';
        if(num===6)return '토';
    }
    const ampm=(time)=>{
        if(parseInt(time)>12)   return '오후';
        else return '오전';
    }
    const hour=(time)=>{
        if(parseInt(time)>12)   return parseInt(time)-12;
        else return time;
    }
    return(
        <PeriodContainer>
            <View style={{alignItems:'center'}}>
                <Text>접수시작</Text>
                <Title>{Start[1]}월 {Start[2]}일 ({day(Start[3])})</Title>
                <Time>
                    <TimeText>{Start[0]}년</TimeText>
                    <TimeText>{ampm(Start[4])}</TimeText>                
                    <TimeText>{hour(Start[4])}:{Start[5]}</TimeText>
                </Time>
                
            </View>
            <View style={{alignItems:'center'}}>
                <Text>접수마감</Text>
                <Title>{End[1]}월 {End[2]}일 ({day(End[3])})</Title>
                <Time>
                    <TimeText>{End[0]}년</TimeText>
                    <TimeText>{ampm(End[4])}</TimeText>
                    <TimeText>{hour(End[4])}:{End[5]}</TimeText>
                </Time>
            </View>
        </PeriodContainer>
    )
}

// detail page
const Box=styled.View`
    margin:10px;
    margin-bottom:50px;
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

const MapBox=styled.View`
    border-width:1px;
    border-radius:10px;
    border-color:${Color.g1_color};
    overflow:hidden;
    height:200px;
    margin-top:10px;
    margin-bottom:30px;
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