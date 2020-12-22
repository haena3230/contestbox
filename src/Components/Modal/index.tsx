// modal 
import React, { useState } from "react";
import {Alert, Text,TouchableOpacity,View} from "react-native";
import styled from 'styled-components/native';
import {Styles,Color}  from '~/Styles';
import {HashTag} from '~/Components/HashTag';
import Modal from 'react-native-modal';

interface MadalProps{
    modalVisible:boolean;
    title:string;
    tag:Array<string>;
    onPressConfirm:()=>void;
    onPressCancle:()=>void;
}
const ModalComponent = ({modalVisible,title,tag,onPressConfirm,onPressCancle}:MadalProps) => {
  return (
        <Modal
            isVisible={modalVisible}
            backdropOpacity={0.6}
            onBackdropPress={onPressCancle}
        >
            <View style={{ flex: 1,justifyContent: "center", alignItems: "center"}}>
                <ModalView>
                    <ModalTitle>{title}</ModalTitle>
                    <ModalTag>
                        {tag.map((tag)=>{
                            return(
                                <View key = {tag}>
                                    <HashTag hashtag={tag} />
                                </View>
                            )
                        })}
                    </ModalTag>
                    <ModalConfirm>
                        <TouchableOpacity onPress={onPressConfirm}>
                            <Confirm>적용</Confirm>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressCancle}>
                            <Text style={Styles.m_font}>닫기</Text>
                        </TouchableOpacity>
                    </ModalConfirm>
                </ModalView>
            </View>
        </Modal>
  );
};

const ModalView =styled.View`
    width:90%;
    background-color:white;
    padding:30px;
    border-radius:10px;
`
const ModalTitle =styled.Text`
    ${Styles.b_font};
    padding-bottom:20px;
`
const ModalTag =styled.View`
    flex-direction:row;
    flex-wrap:wrap;
`
const ModalConfirm=styled.View`
    width:100%;
    flex-direction:row;
    justify-content:flex-end;
    padding-top:10px;
`
const Confirm=styled.Text`
    ${Styles.m_font};
    color:${Color.p_color};
    padding-right:30px;
`

export default ModalComponent;