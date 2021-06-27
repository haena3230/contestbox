// community detail page
import React, { useRef, useState } from 'react';
import { Image, Keyboard, Text, TextInput, View } from 'react-native';
import { PageHeader } from '~/Components/Header';
import { Container, Styles, Color, IconSize } from '~/Styles';
import { CommunityDetailPageProps } from '~/Types';
import styled from 'styled-components/native'
import { CommentBar } from '~/Components/CommunityFeed';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SendIcon from '~/Assets/send_black_24dp.svg'
import { InfoModalComponent } from '~/Components/Modal';
import ToTop from '~/Components/ToTop';
import { TouchableWithoutFeedback } from 'react-native';


const CommunityDetailPage = (props:CommunityDetailPageProps)=>{
    const {category} = props.route.params
    // totop
    const scrollRef=useRef<ScrollView>();
    const[totop,setTotop]=useState<Boolean>(false);
    const onPressToTop=()=>{
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        })
    };
    return(
        <View style={{flex:1}}>
            <ScrollView ref={scrollRef}
            onScroll={(e)=>{
                if (e.nativeEvent.contentOffset.y===0){
                    setTotop(false);
                }                            
            }}
            onScrollBeginDrag={()=>setTotop(true)}
            showsVerticalScrollIndicator={false}
            >
                <Container>
                    <PageHeader pageName={category} onPressClose={()=>props.navigation.goBack()}/>
                <BoxContainer>
                    <BoxHeader>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image style={{width:30, height:30, borderRadius:15}} source={require('~/Assets/FirstBanner.png')}/>
                            <NameFont style={{marginLeft:10}}>Name Zone</NameFont>
                        </View>
                        <SSFont>10분전</SSFont>
                    </BoxHeader>
                    <Title>제목입니다아아아ㅏ아아ㄴ;ㅣㅇ라;니알;니아랑ㄴ;란ㅇ;ㅣ라;ㅣㅇ나링란이러ㅏㄹ푸ㅏㅜㅏ퍼ㅜ아퍼ㅜㄹ어풀어파</Title>
                    <Content>내용입니다ㅏ앙아아ㅏ아아ㅏ앙아아아아아아아아ㅏ아아아ㅏ아ㅏ아아아아ㅏ아아</Content>
                    <CommentBar comments={3}/>
                </BoxContainer>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                </Container>
                <View style={{height:60}}/>
            </ScrollView>
            <BottomBar />
            {totop?
            <View style={{bottom:60}}><ToTop onPressToTop={onPressToTop}/></View>:null}
        </View>
    )
}

const Comment = () =>{
    return(
        <View style={{flexDirection:'row', width:'100%',marginVertical:5}}>
            <View style={{width:'10%', alignItems:'center'}}>
                <Image style={{width:25, height:25, borderRadius:15}} source={require('~/Assets/FirstBanner.png')}/>
            </View>
            <CommentContainer>
                <BoxHeader>
                    <NameFont>이름임</NameFont>
                    <SSFont>10분전</SSFont>
                </BoxHeader>
                <Content>댓글입니다아아아아아아</Content>
            </CommentContainer>
        </View>
    )
}

const BottomBar = ()=>{
    const [text,setText] = useState<null|string>('')
    const[infoModal,setInfoModal]=useState<boolean>(false);
    const onSubmet=()=>{
    if(!text){
      setInfoModal(true);
      setTimeout(()=>{
        setInfoModal(false);
      },1500);
    }
    else{
      null
    }
  }
    return(
        <BottomBarContainer>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput 
                style={{
                    backgroundColor:Color.border,borderRadius:10,paddingLeft:10, width:'85%'
                }} 
                placeholder={'댓글을 입력하세요...'} 
                value={text} 
                onChangeText={(text)=>{setText(text)}} 
                onSubmitEditing={onSubmet}
                maxLength={100}
                />
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={onSubmet} >
                <SendIcon width={IconSize.bicon} height={IconSize.bicon} fill={Color.p_color}/>
            </TouchableOpacity>
            <InfoModalComponent 
            Info={'내용을 입력해 주세요'}
            modalVisible={infoModal}
            />
        </BottomBarContainer>
    )
}

// content
const BoxContainer = styled.View`
    background-color:${Color.artbox}
    border-width:1px;
    border-color:${Color.border};
    border-radius:5px;
    padding:10px;
    margin-Bottom:5px;
`

const BoxHeader = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center
`
const NameFont = styled.Text`
    font-weight:bold;
    ${Styles.m_font}
    color:${Color.b_color}
`
const SSFont = styled.Text`
    ${Styles.s_m_font}
    color:${Color.gray}
`
const Title = styled.Text`
    margin-vertical:10px
    ${Styles.mb_m_font}
    color:${Color.b_color}
    font-weight:bold
`
const Content = styled.Text`
    ${Styles.m_m_font};
`

// comment
const CommentContainer = styled.View`
    background-color:${Color.border}
    border-radius:7px;
    padding-horizontal:10px;
    width:90%;
`

// bottom bar
const BottomBarContainer = styled.View`
    background-color:${Color.artbox}
    border-top-width:1px;
    border-color:${Color.border};
    padding:10px;
    position:absolute;
    bottom:0;
    flex-direction:row;
    align-items:center;
    justify-content:space-between
    width:100%
`

export default CommunityDetailPage