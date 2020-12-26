// 두번째 메인 탭 ListPage.tsx
import React,{useEffect, useState} from 'react';
import {ScrollView,View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {Color,Container, IconSize, Styles,DHeight,DWidth} from '~/Styles';

// components
import Header from '~/Components/Header';
import MenuIcon from '~/Assets/list-outline.svg';
import MapIcon from '~/Assets/map-marked-alt-solid.svg';
import ListIcon from '~/Assets/list-ul-solid.svg';
import SortDown from '~/Assets/sort-down-solid.svg';
import FilterIcon from '~/Assets/options-outline.svg';
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
  // list data
  const[list,setList]=useState<Array<any>>([])
  const[load,setLoad]=useState<boolean>(false);
  
  // 정렬 버튼
  const[sortState,setSortState]=useState<string>('추천순');
  const[sort,setSort]=useState<boolean>(false);
  const[one,setOne]=useState<boolean>(true);
  const[two,setTwo]=useState<boolean>(false);
  const[three,setThree]=useState<boolean>(false);
  const onPressTagOne=()=>{
    setOne(true);
    setTwo(false);
    setThree(false);
    setSort(!sort);
    setSortState('추천순');
  }
  const onPressTagTwo=()=>{
    setOne(false)
    setTwo(true)
    setThree(false)
    setSort(!sort);
    setSortState('조회순');
  }
  const onPressTagThree=()=>{
    setOne(false)
    setTwo(false)
    setThree(true)
    setSort(!sort);
    setSortState('등록순');
  }
  const onPressSort=()=>{
    setSort(!sort);
  }
  // map,list view
  const[map,setMap]=useState(false);
  const onPressMap=()=>{
    setMap(!map);
  }
  // filter
  const[filter,setFilter]=useState(false);
  const onPressFilter=()=>{
    setFilter(!filter);
  }
  useEffect(()=>{
    setList(listdata);
    setLoad(true)
  },[])
  return (
    <View>
      <Header />
      <Container style={{height:DHeight-110}}>
        <ScrollView style={{width:'100%'}}>
          <Bar>
            <TouchableOpacity onPress={onPressSort} style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={Styles.s_font}>{sortState}</Text>
              <View style={{padding:5}}>
                <SortDown width={IconSize.icon} height={IconSize.icon} color={Color.g3_color}/>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={onPressFilter} style={style.IconBorder}>
                  <FilterIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressMap} style={style.IconBorder}>
              {map?(
                  <MapIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
              ):(
                  <ListIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
              )}
              </TouchableOpacity>
            </View>
          </Bar>
          {map?(
            <View>
                {list.map((list)=>{
                  return(
                    <TextList key = {list.id.toString()} recruit={list.recruit} tags={list.tags} title={list.title} viewcount={list.viewcount}/>
                  )
                })}
            </View>
          ):(
              <View>
                <Text>지도</Text>
              </View>
          )}
          
        </ScrollView>
        
      </Container>
      <SortComponent 
        onPressCancle={onPressSort} 
        modalVisible={sort} 
        one={one}
        two={two}
        three={three}
        onPressTagOne={onPressTagOne}
        onPressTagTwo={onPressTagTwo}
        onPressTagThree={onPressTagThree}
        />
    </View>
  );
};



 const Bar =styled.View`
  width:100%;
  flex-direction:row;
  justify-content:space-between;
 `

 const style=StyleSheet.create({
    IconBorder:{
      borderWidth:1,
      borderColor:Color.g1_color,
      borderRadius:5,
      padding:5,
      margin:2,
    },
 })

export default ListPage;
