// 두번째 메인 탭 ListPage.tsx
import React,{useEffect, useState} from 'react';
import {ScrollView,View,TouchableOpacity,Text} from 'react-native';
import styled from 'styled-components/native';
import {Color,DHeight} from '~/Styles';

// components
import Header from '~/Components/Header';
import {HashTagButton} from '~/Components/HashTag';
import ModalComponent from '~/Components/Modal';
import MenuIcon from '~/Assets/list-outline.svg';
import MapIcon from '~/Assets/map-outline.svg';
import TextList from '~/Components/TextList';

const onetag=['경시','공모','경진']
const twotag=['AI','IT','창의력','아이디어','UCC','포스터']
const threetag=['제한없음','초등학생','중학생','고등학생','청소년','대학생','성인','마이스터고']

const listdata=[
  {
    id:1,
    title:'test제목임다',
    recruit:false,
    tags:['AI','IT','창의력'],
    viewcount:4,
  },
   {
    id:2,
    title:'fnfnfn',
    recruit:true,
    tags:['AI','IT','창의력'],
    viewcount:3,
  },
   {
    id:3,
    title:'test제목임다',
    recruit:false,
    tags:['AI','IT','창의력'],
    viewcount:4,
  },
   {
    id:4,
    title:'test제목임다',
    recruit:false,
    tags:['AI','IT','창의력'],
    viewcount:4,
  },
]

const ListPage = () => {
  const[list,setList]=useState<Array<any>>([])
  const[load,setLoad]=useState<boolean>(false);
  const[left,setLeft]=useState<boolean>(true);
  const onPressView=()=>{
    setLeft(!left);
  }
  useEffect(()=>{
    setList(listdata);
    setLoad(true)
  },[])
  return (
    <View style={{width:'100%'}}>
      <Header />
      {left&&load?(
          <View style={{padding:10,height:DHeight-110}}>
            <ScrollView>
            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <SortCom />
              <ViewChange left={left} onPressView={onPressView} />
            </View>
              {list.map((list)=>{
                return(
                  <View style={{paddingVertical:5}}>
                    <TextList key={list.id} recruit={list.recruit} tags={list.tags} title={list.title} viewcount={list.viewcount}/>
                  </View>
                )
              })}
            </ScrollView>
          </View>
      ):(
          <View style={{margin:10}}>
            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <SortCom />
              <ViewChange left={left} onPressView={onPressView} />
            </View>
            <View style={{backgroundColor:Color.w_color, width:'100%',height:'100%',borderRadius:10}}>
            </View>
          </View>
      )}
     
    </View>
  );
};

const SortCom=()=>{
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
  );
}

interface ViewChangeProps{
  left:boolean;
  onPressView:()=>void;
}
const ViewChange=({left,onPressView}:ViewChangeProps)=>{
   return(
    <View>
      {left?(
        <TouchableOpacity style={{
            padding:5,
            borderWidth:1,
            borderRadius:5,
            borderColor:Color.l_color}}
            onPress={onPressView}>
            <MapIcon height={20} width={20} color={Color.g_color}/>
        </TouchableOpacity>
      ):(
        <TouchableOpacity style={{
            padding:5,
            borderRadius:5,
            borderWidth:1,
            borderColor:Color.l_color}}
            onPress={onPressView}>
            <MenuIcon height={20} width={20} color={Color.g_color}/>
        </TouchableOpacity>
      )}
    </View>

  )
}

const Sort =styled.View`
  flex-direction:row;
  padding-vertical:10px;
`


export default ListPage;
