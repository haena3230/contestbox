// Manage My Page
import React, { useState } from 'react'
import { Image,TouchableOpacity,Text, View, TextInput, Keyboard } from 'react-native'
import { MyPageProps } from '~/Types'
import styled from 'styled-components/native'
// component
import { Color, Container, IconSize, Styles} from '~/Styles'
import {PageHeader} from '~/Components/Header';
import CameraIcon from '~/Assets/camera_alt_black_24dp.svg'
import { InfoModalComponent } from '~/Components/Modal'
import { Btn } from '~/Components/Btn'



const ManageMyPage=({navigation}:MyPageProps)=>{
    const [nickname,setNickname]= useState<string|null>()
    const[infoModal,setInfoModal]=useState<boolean>(false);

    return(
        <Container>
            <PageHeader pageName={'개인정보 변경'} onPressClose={()=>navigation.goBack()}/>
            <View style={{flex:1, justifyContent:'center'}}>
                <Box>
                    <ItemText>프로필 변경</ItemText>
                        <TouchableOpacity style={{alignItems:'center'}}>
                            <Image style={{width:100, height:100, borderRadius:50}} source={require('~/Assets/FirstBanner.png')} />
                            <View style={{backgroundColor:Color.gray, borderRadius:15, padding:5,position:'relative', bottom:30,left:30}}>
                                <CameraIcon height={IconSize.icon} width={IconSize.icon} fill={Color.w_color}/>
                            </View>
                        </TouchableOpacity>
                    <ItemText>닉네임 변경</ItemText>
                    <View style={{borderBottomWidth:1, borderColor:Color.gray,marginHorizontal:10}}>
                        <TextInput 
                            style={Styles.m_font} 
                            placeholder={'Contestbox'} 
                            value={nickname} 
                            onChangeText={(text)=>{setNickname(text)}} 
                            onSubmitEditing={()=>Keyboard.dismiss()}
                            maxLength={30}
                            />
                    </View>
                </Box>
                <InfoModalComponent 
                    Info={'변경하시겠습니까?'}
                    modalVisible={infoModal}
                />
            </View>
            <Btn color={Color.p_color} text={'적용하기'} onPress={()=>null} widthPercent={100}/>
        </Container>
    )
}

export default ManageMyPage
const Box = styled.View`
    background-color:${Color.artbox};
    border-width:1px;
    border-radius:10px;
    border-color:${Color.border};
    padding:10px;
`
const ItemText = styled.Text`
    ${Styles.m_m_font}
`