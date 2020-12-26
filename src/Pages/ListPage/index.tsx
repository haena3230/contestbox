// 두번째 메인 탭 ListPage.tsx
import React,{useEffect, useState} from 'react';
import {ScrollView,View,TouchableOpacity,Text} from 'react-native';
import styled from 'styled-components/native';
import {Color,DHeight,Container} from '~/Styles';

// components
import Header from '~/Components/Header';
import MenuIcon from '~/Assets/list-outline.svg';
import MapIcon from '~/Assets/map-outline.svg';
import TextList from '~/Components/TextList';
import SortComponent from '~/Components/Sort';

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
  // 정렬 버튼
  const[sort,setSort]=useState(false);
  const onPressSort=()=>{
    setSort(!sort);
  }
  const onPressView=()=>{
    setLeft(!left);
  }
  useEffect(()=>{
    setList(listdata);
    setLoad(true)
  },[])
  return (
    <View>
      <Header />
      <Container>
        <Bar>
          <TouchableOpacity onPress={onPressSort}>
            <Text>최신순</Text>
          </TouchableOpacity>
          <View>
            <Text>test</Text>
          </View>
        </Bar>
      </Container>
      <SortComponent onPressCancle={onPressSort} modalVisible={sort}/>
    </View>
  );
};

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
            borderColor:Color.g1_color}}
            onPress={onPressView}>
            <MapIcon height={20} width={20} color={Color.g3_color}/>
        </TouchableOpacity>
      ):(
        <TouchableOpacity style={{
            padding:5,
            borderRadius:5,
            borderWidth:1,
            borderColor:Color.g1_color}}
            onPress={onPressView}>
            <MenuIcon height={20} width={20} color={Color.g3_color}/>
        </TouchableOpacity>
      )}
    </View>

  )
}

 const Bar =styled.View`
  width:100%;
  flex-direction:row;
  justify-content:space-between;
 `

export default ListPage;
