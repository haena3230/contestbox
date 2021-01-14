// 정렬 순서 모달
import React from "react";
import {TouchableOpacity,View} from "react-native";
import styled from 'styled-components/native';
import {Styles,Color}  from '~/Styles';
import {HashTag} from '~/Components/HashTag';
import Modal from 'react-native-modal';

interface MadalProps{
    modalVisible:boolean;
    onPressCancle:()=>void;
    one:boolean;
    two:boolean;
    three:boolean;
    onPressTagOne:()=>void;
    onPressTagTwo:()=>void;
    onPressTagThree:()=>void;
}
export const SortComponent = ({modalVisible,onPressCancle,one,two,three,onPressTagOne,onPressTagTwo,onPressTagThree}:MadalProps) => {
  return (
        <Modal
            isVisible={modalVisible}
            backdropOpacity={0.6}
            onBackdropPress={onPressCancle}
        >
            <ModalView>
                <Tag>
                    <Sort hashtag={'추천순'} picked={one} onPressTag={onPressTagOne}/>
                    <Sort hashtag={'조회순'} picked={two} onPressTag={onPressTagTwo} />         
                    <Sort hashtag={'등록순'} picked={three} onPressTag={onPressTagThree}/>
                </Tag>
                <TouchableOpacity onPress={onPressCancle}>
                    <Exit>닫기</Exit>
                </TouchableOpacity>
            </ModalView>
        </Modal>
  );
};

interface SortProps{
    hashtag:string;
    picked:boolean;
    onPressTag:()=>void;
}
const Sort=({hashtag,picked,onPressTag}:SortProps)=>{
    return(
        <TouchableOpacity onPress={onPressTag}>
            <HashTag hashtag={hashtag} picked={picked}/>
        </TouchableOpacity>
    )
}

const ModalView =styled.View`
    width:100%;
    background-color:white;
    padding:30px;
    border-radius:10px;
    flex-direction:row;
    flex-wrap:wrap;   
    justify-content:space-between;
    align-items:center;
    position:absolute;
    bottom:0px;

`
const Tag=styled.View`
    flex-direction:row;
`

const Exit=styled.Text`
    ${Styles.m_font};
    color:${Color.p_color};
`

export default SortComponent;