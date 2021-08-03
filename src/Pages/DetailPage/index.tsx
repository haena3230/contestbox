// list detail Page
import React,{ useRef, useState} from 'react';
import {View,Text} from 'react-native';
// library
import moment from 'moment';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
// style
import {Color,Container, Styles,IconSize,DWidth} from '~/Styles';
import styled from 'styled-components/native';
// components
import ToTop from '~/Components/ToTop';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {CategoryListTag} from '~/Components/HashTag';
import Loading from '~/Components/Loading';
import {BottomOpenURLBtn, OpenURLBtn} from '~/Components/Btn';
import MarkIcon from '~/Assets/map-marker-alt-solid.svg';
import Markdown from 'react-native-markdown-display';
import Star from '~/Assets/star_outline_black_24dp.svg'
// navi
import {DetailPageProps} from '~/Types';
import {SmallMap} from '~/Components/Map';
// data
import { useQuery } from '@apollo/client';
import {GET_DETAILS} from '~/queries';
import { ErrorPage } from '~/Components/Error';


const DetailPage =(props:DetailPageProps)=>{
    // image viewer
    const[imgModal,setImgModal]=useState<boolean>(false);
    // totop
    const scrollRef=useRef<ScrollView>();
    const[totop,setTotop]=useState<Boolean>(false);
    const onPressToTop=()=>{
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        })
    };
    // data
    const {listId}=props.route.params;
    const { loading, error, data,refetch } = useQuery(GET_DETAILS,{
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
    if (error) return <ErrorPage onPress={async ()=>{
        try{
            await refetch({id:listId})
            console.log('refetch')
        } catch(e){
            console.log('refetch err')
        }}} />
    if(data&&data.contest)
    
    return(
        <View>
            <ScrollView 
            ref={scrollRef}
            onScroll={(e)=>{
                if (e.nativeEvent.contentOffset.y===0){
                    setTotop(false);
                }                            
            }}
            onScrollBeginDrag={()=>setTotop(true)}
            showsVerticalScrollIndicator={false}
            ><Container>
                <Box>
                    {!data.contest.posterURL?null:(
                        <TouchableOpacity onPress={()=>setImgModal(!imgModal)}>
                            <Poster source={{
                                uri:`${data.contest.posterURL},w_594,h_840`
                            }}/>      
                            <Modal isVisible={imgModal} backdropOpacity={1} onBackdropPress={()=>setImgModal(!imgModal)}>
                                <ImageViewer 
                                imageUrls={[{url: `${data.contest.posterURL},w_594,h_840`}]} 
                                enableSwipeDown={true} 
                                onSwipeDown={()=>setImgModal(!imgModal)} />
                            </Modal>
                        </TouchableOpacity>
                    )}
                    <ComponentBox>
                        <Title>{data.contest.title}</Title>
                        <Text style={Styles.s_font}>조회수 {data.contest.hits}</Text>
                    </ComponentBox>
                    {!data.contest.categories?null:(
                        <ComponentBox>
                            <ContentTitle>카테고리</ContentTitle>
                            <TagBox>
                            {data.contest.categories.map((data)=>{
                                return(
                                    <TouchableOpacity onPress={()=>
                                        props.navigation.navigate('SearchListPage',{
                                            search:data.label,
                                            typeArray:null,
                                            conditionArray:null,
                                            })}
                                        key= {data.id}
                                        style={{paddingBottom:10}}
                                        >
                                        <CategoryListTag text={data.label} picked={false}/>
                                    </TouchableOpacity>
                                )
                            })}
                            </TagBox>
                        </ComponentBox>
                    )}
                    {!data.contest.types?null:(
                        <ComponentBox>
                            <ContentTitle>참여조건</ContentTitle>
                            <TagBox>
                                {data.contest.types.map((data)=>{
                                    return(
                                        <TouchableOpacity onPress={()=>
                                            props.navigation.navigate('SearchListPage',{
                                                search:data.label,
                                                typeArray:null,
                                                conditionArray:null,
                                                })}
                                            key= {data.id}
                                            style={{paddingBottom:10}}>
                                            <CategoryListTag text={data.label} picked={false}/>
                                        </TouchableOpacity>
                                    )
                                })}
                            </TagBox>
                        </ComponentBox>
                    )}
                    <ComponentBox>
                        <Period Start={PeriodSplit(data.contest.application.period.startAt)} End={PeriodSplit(data.contest.application.period.endAt)}/>
                        {!data.contest.siteURL?null:(
                        <View style={{width:'100%',alignItems:'flex-end', paddingTop:10}}>
                            <OpenURLBtn url={data.contest.siteURL}>홈페이지</OpenURLBtn>
                        </View>
                        )}
                    </ComponentBox>
                    {!data.contest.content?null:(
                        <ComponentBox>
                            <ContentTitle>상세내용</ContentTitle>
                            <Markdown
                                style={{
                                    heading1: {
                                        fontSize: DWidth > 480 ? 24 : 20,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.border
                                    },
                                    heading2: {
                                        fontSize: DWidth > 480 ? 22 : 18,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.border
                                    },
                                    heading3: {
                                        fontSize: DWidth > 480 ? 20 : 16,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.border
                                    },
                                    heading4: {
                                        fontSize: DWidth > 480 ? 20 : 16,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.border
                                    },
                                    heading5: {
                                        fontSize: DWidth > 480 ? 18 : 16,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.border
                                    },
                                    heading6: {
                                        fontSize: DWidth > 480 ? 16 : 12,
                                        fontWeight:'bold',
                                        marginVertical:10,
                                        paddingVertical:10,
                                        borderTopWidth:2,
                                        borderColor:Color.border
                                    },
                                    code_block:{
                                        backgroundColor:Color.artbox,
                                    },
                                    code_inline:{
                                        backgroundColor:Color.artbox,
                                        color:Color.w_color
                                    }
                                }}    
                            >
                                {data.contest.content}
                            </Markdown>
                        </ComponentBox>
                    )}
                    {!data.contest.place?null:(
                        <ComponentBox>
                        <MapPart 
                            alias={data.contest.place.alias}
                            place={data.contest.place.fullAddress} 
                            lat={data.contest.place.latLng.lat} 
                            lng={data.contest.place.latLng.lng}
                            /></ComponentBox>
                    )}
                </Box>
            </Container>
            </ScrollView>
            {totop?
            <View style={{bottom:40}}><ToTop onPressToTop={onPressToTop}/></View>:null}
            <BottomBtn url={data.contest.siteURL} onPressScrab={()=>null}/>
        </View>
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
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
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
                <MarkIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.gray} />
                <MapText>{place}</MapText>
            </View>
        </View>
    )
}

// bottom btn
interface BottomBtnProps{
    onPressScrab:()=>void;
    url:string;
}
const BottomBtn = ({onPressScrab,url}:BottomBtnProps)=>{
    return(
        <BottomBtnContainer>
            <BottomOpenURLBtn url={url}/>
            <BottomBtnBox style={{padding:10,flexDirection:'row'}} onPress={onPressScrab}>
                <Star width={IconSize.sicon} height={IconSize.sicon} fill={Color.gray}/>
                <BottomBoxText>스크랩</BottomBoxText>
            </BottomBtnBox>
        </BottomBtnContainer>
    )
}

// detail page
const Box=styled.View`
    background-color:${Color.w_color};
    border-radius:7px;
    padding:10px;
    border-width:1px;
    border-color:${Color.border};
    margin-bottom:60px;
`
const ComponentBox=styled.View`
    margin-top:30px;
`
const Poster =styled.Image`
    width:100%;
    aspect-ratio:0.7;
    border-radius:10px;
    overflow:hidden;
    background-color:gray;
`
const ContentTitle=styled.Text`
    ${Styles.m_b_font};
`
const TagBox=styled.View`
    flex-direction:row;
    flex-wrap:wrap;
`

const Title=styled.Text`
    ${Styles.b_b_font};
`

const MapBox=styled.View`
    border-width:1px;
    border-radius:10px;
    border-color:${Color.border};
    overflow:hidden;
    height:200px;
    margin-vertical:10px;
`

// period
const PeriodContainer=styled.View`
    flex-direction:row;
    justify-content:space-around;
    background-color:${Color.border};
    border-radius:10px;
    padding:20px;
`
const Time=styled.View`
    flex-direction:row;
`
const TimeText =styled.Text`
    ${Styles.s_m_font};
    margin-horizontal:3px;
`

// map
const MapText=styled.Text`
    ${Styles.s_font};
    color:${Color.gray};
    margin-horizontal:3px;
`

// bottom btn
const BottomBtnContainer = styled.View`
    background-color:${Color.artbox};
    border-width:1px;
    border-color:${Color.p_color};
    border-radius:10px;
    flex-direction:row;
    width:100%;
    position:absolute;
    margin:10px;
    bottom:0;
    justify-content:center;
`
const BottomBtnBox = styled.TouchableOpacity`
    width:50%;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`
const BottomBoxText = styled.Text`
    margin-left:10px;
    ${Styles.m_font};
    color:${Color.gray};
`
export default DetailPage;