// community add page
import React, { useState } from 'react';
import { Keyboard, TextInput, TouchableWithoutFeedback } from 'react-native';
import { SubmitHeader } from '~/Components/Header';
import { Container,Color, Styles } from '~/Styles';
import { CommunityAddPageProps } from '~/Types';
import styled from 'styled-components/native'

const CommunityAddPage=({navigation}:CommunityAddPageProps)=>{
    const[title,setTitle]=useState<null|string>();
    const[body,setBody]=useState<null|string>();
    const[infoModal,setInfoModal]=useState<boolean>(false);

    return(
        <Container>
            <SubmitHeader onPressClose={()=>navigation.goBack()} pageName={'게시글 작성'} onPressSubmit={()=>null}/>
            <BoxContainer style={{height:'90%'}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput 
                    style={{
                        backgroundColor:Color.border,
                        borderRadius:5,
                        padding:5,
                        paddingLeft:10,

                    }} 
                    placeholder={'제목을 입력하세요'} 
                    value={title} 
                    onChangeText={(text)=>{setTitle(text)}} 
                    maxLength={35}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput 
                        style={{
                            marginTop:10,
                            backgroundColor:Color.border,
                            borderRadius:5,
                            padding:5,
                            paddingLeft:10,
                            height:'90%'
                            
                        }} 
                        placeholder={'내용을 입력하세요'} 
                        value={body} 
                        onChangeText={(text)=>{setBody(text)}} 
                        maxLength={1000}
                        multiline={true}
                        textAlignVertical={'top'}
                        />
                </TouchableWithoutFeedback>
            </BoxContainer>
        </Container>
    )
}

export default CommunityAddPage

// content
const BoxContainer = styled.View`
    background-color:${Color.artbox}
    border-width:1px;
    border-color:${Color.border};
    border-radius:5px;
    padding:10px;
    margin-vertical:5px;
`

