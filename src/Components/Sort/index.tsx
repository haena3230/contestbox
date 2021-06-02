// 정렬 순서 모달
import React from "react";
import {TouchableOpacity} from "react-native";
import styled from 'styled-components/native';
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
                    <Sort hashtag={'추천순'} picked={one} onPressTag={onPressTagOne}/>
                    <Sort hashtag={'조회순'} picked={two} onPressTag={onPressTagTwo} />         
                    <Sort hashtag={'등록순'} picked={three} onPressTag={onPressTagThree}/>
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
        <TouchableOpacity onPress={onPressTag} style={{paddingHorizontal:5}}>
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

export default SortComponent;