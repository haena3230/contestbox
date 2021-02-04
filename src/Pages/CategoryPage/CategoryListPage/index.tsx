import React,{useState,useRef} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {Styles,Container} from '~/Styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// data
import { useQuery } from '@apollo/client';
import {GET_LISTS} from '~/queries';
import {CategoryListPageProps} from '~/Types';

// component
import {SortComponent} from '~/Components/Sort'
import {FilterBtn,ListBtn} from '~/Components/Btn';
import Loading from '~/Components/Loading';
import TextList,{TagBox,ListBox} from '~/Components/TextList';
import {HashTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';
import Map from '~/Components/Map';


const CategoryListPage=(props:CategoryListPageProps)=>{
    const {category,categoryId}=props.route.params;

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
    const { loading, error, data } = useQuery(GET_LISTS,{
        variables:{categories:[categoryId]}
    });
    let template=``;
    if (loading) return <Loading />;
    if (error){
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(error.graphQLErrors)
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    }
    if(data&&data.contests.edges){
        template=data.contests.edges.map((data)=>
        <ListBox key = {data.node.id.toString()} onPress={()=>props.navigation.navigate('DetailPage',{
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
                        <Category># {category}</Category>
                    </CategoryBox>
                    <BarBox onPressMap={()=>setMap(!map)}/>
                    <View style={{width:'100%',height:'60%'}}>
                        <Map />
                    </View>
                </View>
            ):(
                <ScrollView style={{padding:5}} ref={scrollRef}>
                    <CategoryBox>
                        <Category># {category}</Category>
                    </CategoryBox>
                    <Categories />
                     <BarBox onPressMap={()=>setMap(!map)}/>
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
            )}
            <ToTop onPressToTop={onPressToTop}/>
        </Container>
    )
}

// category && btn
interface HeaderBoxProps{
    onPressMap:()=>void;
}
const BarBox=({onPressMap}:HeaderBoxProps)=>{
    return(
        <Bar>
            <View />
            <View style={{flexDirection:'row'}}>
                <FilterBtn onPressFilter={()=>null}/>
                <ListBtn onPressMap={onPressMap}/>
            </View>
        </Bar>
    )
}

// 카테고리 선택
const Categories=()=>{
    return(
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
                <HashTag hashtag='test' picked={false}/>
            </TouchableOpacity>
        </ScrollView>
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