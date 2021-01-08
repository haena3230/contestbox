// 두번째 메인 탭 ListPage.tsx
import React,{useState,useRef} from 'react';
import {ScrollView,View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {Color,Container, IconSize, Styles} from '~/Styles';
// navi
import {useNavigation} from '@react-navigation/native';
import {ListPageNavigationProp} from '~/Types';
// components
import Header from '~/Components/Header';
import MapIcon from '~/Assets/map-marked-alt-solid.svg';
import ListIcon from '~/Assets/list-ul-solid.svg';
import SortDown from '~/Assets/sort-down-solid.svg';
import FilterIcon from '~/Assets/filter-solid.svg';
import TextList from '~/Components/TextList';
import SortComponent from '~/Components/Sort';
import ToTop from '~/Components/ToTop';
import {HashTag} from '~/Components/HashTag';
import Map from '~/Components/Map';
import Loading from '~/Components/Loading';
// data
import { useQuery } from '@apollo/client';
import {GET_LISTS} from '~/queries';
const ListPage = () => {
  const navigation=useNavigation<ListPageNavigationProp>();

  // totop
  const scrollRef=useRef<ScrollView>();
  const onPressToTop=()=>{
    scrollRef.current.scrollTo({
          y: 0,
          animated: true,
    })
  };
  
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

  // list data
  const { loading, error, data } = useQuery(GET_LISTS);
  let template=``;
  if (loading) return <Loading />;
  if (error) return <Text>Error</Text>;
  if(data&&data.contests.edges){
    template=data.contests.edges.map((data)=>
    <ListBox key = {data.node.id.toString()} onPress={()=>navigation.navigate('DetailPage',{
      listId:data.node.id,
    })}>
      <TextList 
        recruit={false} 
        title={data.node.title} 
        viewcount={data.node.hits}
        />
        {data.node.categories!==null?(
          <TagBox>
            {data.node.categories.map((tag)=>
              <HashTag key={tag.id.toString()} hashtag={tag.label} picked={false}/>
            )}
          </TagBox>
        ):null}
      </ListBox>
    )
  }
  return (
      <Container>
        <Header />
        {map?(
          <View style={{height:'80%'}}>
            <Bar>
                <View />
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={onPressFilter} style={style.IconBorder}>
                      <FilterIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onPressMap} style={style.IconBorder}>
                      <ListIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
                  </TouchableOpacity>
                </View>
            </Bar>
              <Map />
          </View>
        ):(
          <View style={{height:'92%'}}>
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
                      <MapIcon width={IconSize.icon} height={IconSize.icon} color={Color.g4_color} />
                  </TouchableOpacity>
                </View>
              </Bar>
                <View>
                    {template}
                </View>
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
            </ScrollView>
            <ToTop onPressToTop={onPressToTop}/>
          </View>
        )}
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
const ListBox = styled.TouchableOpacity`
    background-color:white;
    border-radius:10px;
    border-width:1px;
    border-color:${Color.g1_color};
    padding:20px;
    margin-vertical:5px;
`

const TagBox=styled.View`
  flex-direction:row;
  flex-wrap:wrap;
  margin-top:5px;
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
