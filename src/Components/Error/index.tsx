import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import BirdIcon from '~/Assets/kiwi-bird-solid.svg';
import { Color, Container, IconSize, Styles } from '~/Styles';
import styled from 'styled-components/native'
import Mailer from 'react-native-mail';
import MailIcon from '~/Assets/forward_to_inbox_black_24dp.svg'

interface ErrorProps{
    onPress:()=>void;
}
export const ErrorPage=({onPress}:ErrorProps)=>{    
  const handleEmail = () => {
    Mailer.mail({
      subject: '[ContestBox] Customer Feedback',
      recipients: ['cs.contestbox@gmail.com'],
      body: '[<b>contestbox 앱 관련 피드백 및 문의사항을 작성해 주세요.]</b>',
      isHTML: true,
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }
    return(
    <Container>
        <TouchableOpacity style={{flex:0.9,alignItems:'center',justifyContent:'center'}}
            onPress={onPress}
        >
            <BirdIcon width={'30%'} height={'30%'} color={Color.gray} />
            <View style={{padding:20}}>
                <Text style={Styles.b_m_font}>Oops!</Text>
            </ View>
            <Text style={Styles.b_m_font}>로드하는 중에 오류가 발생했습니다.</Text>
            <SText>탭하여 다시 시도 하세요.</SText>
        </TouchableOpacity>
        <BtnBox onPress={handleEmail}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <BtnText>의견 남기기</BtnText>
                <MailIcon width={IconSize.icon} height={IconSize.icon} fill={Color.r_color}/>
            </View>
            <SText>의견을 남겨 주시면 빠르게 서비스를 개선하겠습니다</SText>
        </BtnBox>
    </Container>
    )
}

const BtnBox = styled.TouchableOpacity`
    flex:0.1;
    align-items:center;
    justify-content:center;
    margin-bottom:10px;
    padding:10px;
    background-color:${Color.artbox}
    border-width:1px;
    border-radius:10px;
    border-color:${Color.r_color}
`

const BtnText=styled.Text`
    ${Styles.mb_font}
    color:${Color.r_color};
    font-weight:bold;
    padding:10px;
`
const SText=styled.Text`
    ${Styles.s_font}
    color:${Color.gray}
`

