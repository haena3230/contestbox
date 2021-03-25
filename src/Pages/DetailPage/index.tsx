// list detail Page
import React,{useRef} from 'react';
import {View,Text} from 'react-native';
import moment from 'moment';
// style
import {Color,Container, Styles,IconSize,DWidth} from '~/Styles';
import styled from 'styled-components/native';
// components
import ToTop from '~/Components/ToTop';
import { ScrollView } from 'react-native-gesture-handler';
import {HashTag} from '~/Components/HashTag';
import Loading from '~/Components/Loading';
import {OpenURLBtn} from '~/Components/Btn';
import MarkIcon from '~/Assets/map-marker-alt-solid.svg';
import Markdown from 'react-native-markdown-display';
// navi
import {DetailPageProps} from '~/Types';
import {SmallMap} from '~/Components/Map';
// data
import { useQuery } from '@apollo/client';
import {GET_DETAILS} from '~/queries';

const DetailPage =(props:DetailPageProps)=>{
    // totop
    const scrollRef=useRef<ScrollView>();
    const onPressToTop=()=>{
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        })
    };
    // data
    const {listId}=props.route.params;
    const { loading, error, data } = useQuery(GET_DETAILS,{
        variables:{id:listId}
    });
    
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
            <Box>
                <ScrollView ref={scrollRef}>
                    {data.contest.posterURL!==null?(
                        <Poster source={{
                            uri:data.contest.posterURL
                        }}/>
                    ):(
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
                            <OpenURLBtn url={data.contest.siteURL}>홈페이지</OpenURLBtn>
                        </View>
                    ):(
                       null
                    )}
                    {data.contest.content!==null?(
                        <View>
                            <ContentTitle>상세내용</ContentTitle>
                            <Markdown
                                style={{
                                    heading1: {
                                        fontSize: DWidth > 480 ? 24 : 20,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.g1_color
                                    },
                                    heading2: {
                                        fontSize: DWidth > 480 ? 22 : 18,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.g1_color
                                    },
                                    heading3: {
                                        fontSize: DWidth > 480 ? 20 : 16,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.g1_color
                                    },
                                    heading4: {
                                        fontSize: DWidth > 480 ? 20 : 16,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.g1_color
                                    },
                                    heading5: {
                                        fontSize: DWidth > 480 ? 18 : 16,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.g1_color
                                    },
                                    heading6: {
                                        fontSize: DWidth > 480 ? 16 : 12,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.g1_color
                                    },
                                    code_block:{
                                        backgroundColor:Color.g2_color,
                                    },
                                    code_inline:{
                                        backgroundColor:Color.g4_color,
                                        color:Color.w_color
                                    }
                                }}    
                            >
                                {data.contest.content}
                            </Markdown>
                        </View>
                    ):null}
                    {data.contest.place!==null?(
                        <MapPart 
                            alias={data.contest.place.alias}
                            place={data.contest.place.fullAddress} 
                            lat={data.contest.place.latLng.lat} 
                            lng={data.contest.place.latLng.lng}
                            />
                    ):(
                        null
                    )}
                    
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
// map part
interface MapPartProps{
    alias:string;
    place:string;
    lat:number;
    lng:number;
}
const MapPart=({alias,place,lat,lng}:MapPartProps)=>{
    return(
        <View style={{marginBottom:30}}>
            <View style={{flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'}}>
                <ContentTitle>대회 장소</ContentTitle>
                <MapText>{alias}</MapText>
            </View>
            <MapBox>
                <SmallMap 
                    latitude={lat} 
                    longitude={lng}
                    title={alias}
                    description={place}
                    />
            </MapBox>
            <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                <MarkIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.g4_color} />
                <MapText>{place}</MapText>
            </View>
        </View>
    )
}

// detail page
const Box=styled.View`
    margin:5px;
    background-color:${Color.w_color};
    border-radius:7px;
    padding:10px;
    border-width:1px;
    border-color:${Color.g1_color};
`

const Poster =styled.Image`
    width:100%;
    aspect-ratio:0.7;
    border-radius:10px;
    overflow:hidden;
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

// map
const MapText=styled.Text`
    ${Styles.s_font};
    color:${Color.g4_color};
    margin-horizontal:3px;
`
export default DetailPage;