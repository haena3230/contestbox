// 두번째 메인 탭 ListPage.tsx
import React,{useState} from 'react';
import {View, Text,Modal,TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

// components
import Header from '~/Components/Header';
import {Container} from '~/Pages/MainPage';
import {HashTagButton} from '~/Components/HashTag';
import ModalComponent from '~/Components/Modal';
const onetag=['경시','공모','경진']
const twotag=['AI','IT','창의력','아이디어','UCC','포스터']
const threetag=['제한없음','초등학생','중학생','고등학생','청소년','대학생','성인','마이스터고']

const ListPage = () => {
  const [modalOne,setModalOne]=useState(false);
  const [modalTwo,setModalTwo]=useState(false);
  const [modalThree,setModalThree]=useState(false);
  const onPressModalOne=()=>{
    setModalOne(!modalOne);
  }
   const onPressModalTwo=()=>{
    setModalTwo(!modalTwo);
  }
   const onPressModalThree=()=>{
    setModalThree(!modalThree);
  }
  return (
    <View style={{width:'100%',height:'100%'}}>
      <Header />
      <Container>
        <Sort>
          <TouchableOpacity onPress={onPressModalOne}>
            <HashTagButton hashtag={'종류'} />
            <ModalComponent 
              modalVisible={modalOne} 
              title={'종류'} 
              tag={onetag} 
              onPressConfirm={()=>{
                setModalOne(false);
              }} onPressCancle={()=>{
                setModalOne(false);
              }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressModalTwo}>
            <HashTagButton hashtag={'카테고리'} />
            <ModalComponent 
              modalVisible={modalTwo} 
              title={'카테고리'} 
              tag={twotag} 
              onPressConfirm={()=>{
                setModalTwo(false);
              }} onPressCancle={()=>{
                setModalTwo(false);
              }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressModalThree}>
            <HashTagButton hashtag={'참여조건'} />
            <ModalComponent 
              modalVisible={modalThree} 
              title={'참여조건'} 
              tag={threetag} 
              onPressConfirm={()=>{
                setModalThree(false);
              }} onPressCancle={()=>{
                setModalThree(false);
              }} />
          </TouchableOpacity>
        </Sort>
          
      </Container>
    </View>
  );
};

const Sort =styled.View`
  width:100%;
  flex-direction:row;
  padding-vertical:10px;
`


export default ListPage;
