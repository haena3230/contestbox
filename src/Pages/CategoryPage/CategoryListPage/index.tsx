import React,{useState,useRef} from 'react';
import {View,Text} from 'react-native';
import styled from 'styled-components/native';
import {Styles,Color,Container} from '~/Styles';
import { ScrollView } from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';

import { useQuery } from '@apollo/client';
import {GET_LISTS} from '~/queries';
import { useRoute } from '@react-navigation/native';
import {CategoryRouteProp} from '~/Types';

// component
import {SortComponent} from '~/Components/Sort'
import {SortBtn,FilterBtn,MapBtn,ListBtn} from '~/Components/Btn';
import Loading from '~/Components/Loading';
import TextList,{TagBox,ListBox} from '~/Components/TextList';
import {HashTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';


const CategoryListPage=()=>{
    // navi
    const navigation =useNavigation();
    const route=useRoute<CategoryRouteProp>();
    const {title}:any= route.params.category;

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
    //map
    const [map,setMap]=useState(false);

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
            recruit={data.node.application.status} 
            deadline={data.node.application.period.endAt}
            title={data.node.title} 
            viewcount={data.node.hits}
            />
            {data.node.categories!==null?(
            <TagBox>
                {data.node.categories.slice(0,3).map((tag)=>
                <HashTag key={tag.id.toString()} hashtag={tag.label} picked={false}/>
                )}
                {data.node.categories.length>3?(
                <HashTag hashtag={'+'+ (data.node.categories.length-3)} picked={false}/>
                ):(
                null
                )}
            </TagBox>
            ):null}
        </ListBox>
        )
    }
    return(
        <Container>
            {map?(
                <View>
                    <CategoryBox>
                        <Category># 카테고리</Category>
                    </CategoryBox>
                    <Bar>
                        <View />
                        <View style={{flexDirection:'row'}}>
                            <FilterBtn />
                            <ListBtn onPressMap={()=>setMap(!map)}/>
                        </View>
                    </Bar>
                    <View style={{marginBottom:10}}>
                        <Text>dd</Text>
                    </View>
                </View>
            ):(
                <View>
                <ScrollView style={{padding:5}} ref={scrollRef}>
                    <CategoryBox>
                        <Category># 카테고리</Category>
                    </CategoryBox>
                    <Bar>
                        <SortBtn onPressSort={onPressSort} state={sortState}/>
                        <View style={{flexDirection:'row'}}>
                            <FilterBtn />
                            <MapBtn onPressMap={()=>setMap(!map)}/>
                        </View>
                    </Bar>
                    <View style={{marginBottom:10}}>
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
    )
}

const CategoryBox=styled.View`
   justify-content:center;
   align-items:center;
   padding-vertical:30px;
`

const Category=styled.Text`
    ${Styles.b_font};
    font-weight:bold;
`

const Bar = styled.View`
    flex-direction:row;
    justify-content:space-between;
`
export default CategoryListPage;