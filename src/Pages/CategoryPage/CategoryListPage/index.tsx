import React,{useState,useRef} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {Styles,Container} from '~/Styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// data
import { useQuery } from '@apollo/client';
import {GET_LISTS} from '~/queries';
import {CategoryListPageProps} from '~/Types';
import {addCategoryFilterAction,deleteCategoryFilterAction} from '~/Store/actions';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from '~/App';
// component
import {SortComponent} from '~/Components/Sort'
import {FilterBtn,ListBtn,SortBtn,MapBtn} from '~/Components/Btn';
import Loading from '~/Components/Loading';
import TextList,{TagBox,ListBox} from '~/Components/TextList';
import {HashTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';
import Map from '~/Components/Map';

const test=[
      {
        "id": "5ff71d24d897dcf49985befb",
        "label": "QWE"
      },
      {
        "id": "5ff73629f5d17f0542f96857",
        "label": "QWE"
      },
      {
        "id": "5ff73baccc4b793069417ff2",
        "label": "QWE"
      },
      {
        "id": "5ff75309313783bd56ed9cd6",
        "label": "QWE"
      },
      {
        "id": "6005ca896816d395485299a1",
        "label": "TEST"
      }
    ]

const CategoryListPage=(props:CategoryListPageProps)=>{
    const {category,categoryId}=props.route.params;
    const dispatch = useDispatch()
    const storeCategories=(filter:object)=>{
        dispatch(addCategoryFilterAction(filter))
    }
    const deleteCategories=(filter:object)=>{
        dispatch(deleteCategoryFilterAction(filter))
    }
    const filter= useSelector((state:RootState)=>state.query.filterArray)
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
        setSortStatus('LATEST');
        setSort(!sort);
        setSortState('추천순');
    }
    const onPressTagTwo=()=>{
        setOne(false)
        setTwo(true)
        setThree(false)
        setSortStatus('HITS');
        setSort(!sort);
        setSortState('조회순');
    }
    const onPressTagThree=()=>{
        setOne(false)
        setTwo(false)
        setThree(true)
        setSortStatus('LATEST');
        setSort(!sort);
        setSortState('등록순');
    }
    const onPressSort=()=>{
        setSort(!sort);
    }
    //map
    const [map,setMap]=useState(false);

    // list data
    const [sortStatus,setSortStatus]=useState<string>('LATEST')
    const { loading, error, data } = useQuery(GET_LISTS,{
        variables:{categories:[categoryId],sort:sortStatus}
    });
    let listData=``;
    if (loading) return <Loading />;
    if (error){
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(error.graphQLErrors)
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    }
    if(data&&data.contests.edges){
        listData=data.contests.edges.map((data)=>
        <ListBox key = {data.node.id.toString()} onPress={()=>{
            props.navigation.navigate('DetailPage',{
                listId:data.node.id,
            })
        }}>
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
                    <View style={{height:'15%'}}>
                        <CategoryBox>
                            <Category># {category}</Category>
                        </CategoryBox>
                    </View>
                    <BarBox 
                        height ={'10%'} 
                        isMap={true} 
                        onPressMap={()=>setMap(!map)} 
                        onPressFilter={()=>props.navigation.navigate('CategoryFilterPage')}
                        onPressSort={()=>null} 
                        sortState={null} />
                    <View style={{width:'100%',height:'75%'}}>
                        <Map />
                    </View>
                </View>
            ):(
                <View>
                    <TouchableOpacity onPress={()=>storeCategories(test[0])}>
                        <Text>add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>deleteCategories(test[0])}>
                        <Text>delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>console.log(filter)}>
                        <Text>확인</Text>
                    </TouchableOpacity>
                    <ScrollView style={{padding:5}} ref={scrollRef}>
                        <CategoryBox>
                            <Category># {category}</Category>
                        </CategoryBox>
                        <Categories />
                        <BarBox 
                            height={30}
                            isMap={false} 
                            onPressMap={()=>setMap(!map)}
                            onPressFilter={()=>props.navigation.navigate('CategoryFilterPage')}
                            onPressSort={()=>setSort(!sort)} 
                            sortState={sortState}
                        />
                        <View style={{marginBottom:10}}>
                            {listData}
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

// category && btn
interface HeaderBoxProps{
    isMap:boolean;
    onPressMap:()=>void;
    onPressFilter:()=>void;
    onPressSort:()=>void;
    sortState:string;
    height:string|number;
}
const BarBox=({isMap,onPressMap,onPressFilter,onPressSort,sortState,height}:HeaderBoxProps)=>{
    return(
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'flex-end',
            marginLeft:5,
            height:height,
            }}>
            {isMap?(<View />):(<SortBtn onPressSort={onPressSort} state={sortState}/>)}
            <View style={{flexDirection:'row'}}>
                <FilterBtn onPressFilter={onPressFilter}/>
                {isMap?(
                    <ListBtn onPressMap={onPressMap}/>
                ):(
                    <MapBtn onPressMap={onPressMap}/>
                )}
            </View>
        </View>
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
export default CategoryListPage;