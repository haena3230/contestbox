// 두번째 메인 탭 ListPage.tsx
import React,{useEffect, useState,useRef} from 'react';
import {ScrollView,View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {Color,Container, IconSize, Styles} from '~/Styles';
import {useNavigation} from '@react-navigation/native';

// components
import Header from '~/Components/Header';
import MapIcon from '~/Assets/map-marked-alt-solid.svg';
import ListIcon from '~/Assets/list-ul-solid.svg';
import SortDown from '~/Assets/sort-down-solid.svg';
import FilterIcon from '~/Assets/filter-solid.svg';
import TextList from '~/Components/TextList';
import SortComponent from '~/Components/Sort';
import ToTop from '~/Components/ToTop';

// data
// import { useQuery, gql } from '@apollo/client';
// import { template } from '@babel/core';

// const GET_CATEGORIES = gql`
//   query {
//     getCategories {
//       label
//     }
//   }
// `;


const ListPage = () => {
  const navigation=useNavigation();

  // totop
  const scrollRef=useRef<ScrollView>();
  const onPressToTop=()=>{
    scrollRef.current.scrollTo({
          y: 0,
          animated: true,
    })
  };
  // list data
  // const { loading, error, data } = useQuery(GET_CATEGORIES);
  // let template=``;
  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error</Text>;
  // if(data&&data.getCategories){
  //   template=data.getCategories.map((data)=>
  //     <Text>{data.label}</Text>
  //   )
  // }

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
  const onPressFilter=()=>{
    navigation.navigate('FilterPage');
  }
  useEffect(()=>{
    setList(listdata);
    setLoad(true)
  },[])
  return (
      <Container>
        <Header />
        {/* <View>{template}</View> */}
        <ScrollView style={{width:'100%', paddingHorizontal:5}} ref={scrollRef}>
          <Bar>
            <TouchableOpacity onPress={onPressSort} style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={Styles.s_font}>{sortState}</Text>
              <View style={{padding:5,marginBottom:3}}>
                <SortDown width={IconSize.sicon} height={IconSize.sicon} color={Color.g3_color}/>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={onPressFilter} style={style.IconBorder}>
                  <FilterIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressMap} style={style.IconBorder}>
              {map?(
                  <ListIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
              ):(
                  <MapIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
              )}
              </TouchableOpacity>
            </View>
          </Bar>
          {map?(
              <View>
                <Text>지도</Text>
              </View>
          ):(
              <View>
                {list.map((list)=>{
                  return(
                    <TextList key = {list.id.toString()} recruit={list.recruit} tags={list.tags} title={list.title} viewcount={list.viewcount}/>
                  )
                })}
            </View>
          )}
          
        </ScrollView>
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
        <ToTop onPressToTop={onPressToTop}/>
      </Container>
  );
};



 const Bar =styled.View`
  width:100%;
  flex-direction:row;
  justify-content:space-between;
  margin-top:20px;
  padding-horizontal:5px;
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