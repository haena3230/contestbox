// community Feed
import React from 'react'
import {Image, Text, View} from 'react-native'
import {Styles,Color, DWidth, IconSize} from '~/Styles';
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommentIcon from '~/Assets/comment-regular.svg';

interface BoxFeedProps{
    category:string;
    time:string;
    title:string;
    body:string;
    onPressBody:()=>void;
    url:Array<string>
    comments:number
}
let Width = DWidth-60
let HalfWidth = DWidth/2-35
export const BoxFeed = ({category,time,title,body,onPressBody,url,comments}:BoxFeedProps) =>{
    return(
        <BoxFeedContainer>
            {/* header */}
            <Row>
                <Image style={{width:40, height:40, borderRadius:15,marginRight:10}} source={
                    require('~/Assets/FirstBanner.png')
                }/>
                <View>
                    <MFont>User Name</MFont>
                    <Row>
                        <SFont style={Styles.s_font}>{category}</SFont>
                        <View style={{borderRightWidth:1,borderColor:Color.border, height:15,marginHorizontal:10}} />
                        <SFont>{time}</SFont>
                    </Row>
                </View>
            </Row>
            {/* content */}
            <BoxFeedBox>
                <Text style={Styles.m_b_font} numberOfLines={1}>
                    {title}
                </Text>
                <SFont numberOfLines={2} style={{marginVertical:5}}>{body}</SFont>
                <TouchableOpacity onPress={onPressBody}>
                    <SSFont>더보기...</SSFont>
                </TouchableOpacity>
                {/* image */}
                {!url?null:url.length==1?(
                        <Image style={{height:Width,width:Width, resizeMode:'cover',overflow:'hidden'}} source={
                            require('~/Assets/FirstBanner.png')
                        }/>
                    ):(
                        <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between'}} onPress={onPressBody}>
                            <Image style={{height:HalfWidth,width:HalfWidth, resizeMode:'cover',overflow:'hidden'}} source={
                                require('~/Assets/FirstBanner.png')
                            }/>
                            <Image style={{height:HalfWidth,width:HalfWidth, resizeMode:'cover',overflow:'hidden'}} source={
                                require('~/Assets/SecondBanner.png')} />
                            <View style={{height:HalfWidth,width:HalfWidth, backgroundColor:Color.b_color,opacity:0.5,position:'absolute', bottom:0,right:0}} />
                            <ImgFont>+ {url.length-1}</ImgFont>
                        </TouchableOpacity>
                    )}
            </BoxFeedBox>
            <Row style={{marginTop:10, justifyContent:'flex-end'}}>
                <CommentIcon width={IconSize.sicon} height={IconSize.sicon} color={Color.b_color}/>
                <SFont style={{marginLeft:10}}>{comments} 댓글</SFont>
            </Row>
        </BoxFeedContainer>
    )
}

// boxfeed 
const BoxFeedContainer = styled.View`
    background-color:${Color.artbox}
    border-width:1px;
    border-color:${Color.border};
    border-radius:5px;
    padding:10px;
    margin-vertical:5px;
`
const BoxFeedBox = styled.View`
    background-color:${Color.border}
    border-radius:5px;
    padding:10px;
    margin-top:10px;
`

const Row = styled.View`
    flex-direction:row;
    align-items:center;
`

const MFont = styled.Text`
    font-weight:bold;
    ${Styles.m_font}
    color:${Color.b_color}
`
const SFont = styled.Text`
    ${Styles.s_font}
    color:${Color.b_color}
`
const SSFont = styled.Text`
    ${Styles.s_m_font}
    color:${Color.gray}
`
const ImgFont = styled.Text`
    ${Styles.b_b_font};
    color:${Color.w_color};
    position:absolute;
    bottom:0;
    right:15px
`


