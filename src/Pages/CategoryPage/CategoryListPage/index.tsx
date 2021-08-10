import React,{useState,useEffect} from 'react';
import {View,ScrollView, TouchableOpacity, Image,FlatList} from 'react-native';
import styled from 'styled-components/native';
import { Color, SectionTitle} from '~/Styles';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
// data
import { useQuery } from '@apollo/client';
import {ArrayProps, CategoryListPageProps } from '~/Types';
import { GET_CATEGORY_LIST_HOTS, GET_CATEGORY_LIST_LATEST } from '~/queries';
// component
import {CategoryListTag} from '~/Components/HashTag';
import { pickedIdArray} from '~/Components/Filter';
import { PageHeader } from '~/Components/Header';
import Loading from '~/Components/Loading';
import { ErrorPage } from '~/Components/Error';
import { PosterText, Recruitbox } from '~/Pages/HomePage';
import { status } from '~/Components/TextList';



const CategoryListPage=(props:CategoryListPageProps)=>{
    useEffect(()=>{
        console.log('categoryListPage');
        console.log(categoryId)
    },[])
    // category & type & condition 
    const {categoryArray,categoryIdArr} =props.route.params;
    // state
    const [category,setCategory]=useState<Array<ArrayProps>>(categoryArray)
    let categoryId = categoryIdArr
    
    // 카테고리 선택
    const onPressCateBtn=(data,index)=>{
        let tmpArray=category;
        // 새로 하나 선택하거나 마지막 취소 
        if(categoryId.length==1 && index == 0){
            tmpArray[0].value=!tmpArray[0].value;
        }
        tmpArray[index+1].value=!data.value;
        setCategory(tmpArray)
        categoryId = (pickedIdArray(tmpArray))

        props.navigation.replace('CategoryListPage',{
            categoryArray:category,
            categoryIdArr:categoryId
        })
    }

    
    return(
        <View style={{backgroundColor:Color.background, paddingVertical:10}}>
            <ScrollView                   
            showsVerticalScrollIndicator={false}
            >
            <PaddingBox>
                <PageHeader onPressClose={()=>props.navigation.goBack()} pageName={category[0].label}/>
                {categoryArray.length>1?(
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {category.slice(1).map((data,index)=>{
                            return(
                                <TouchableOpacity key={data.id} onPress={()=>onPressCateBtn(data,index)} >
                                    <CategoryListTag text={data.label} picked={data.value}  />
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>):null}
            
                {/* hot list  */}
                <SectionTitle>인기대회</SectionTitle>
            </PaddingBox>
                <HotList 
                    categoryIdArr={categoryIdArr}
                />
            <PaddingBox>
                <SectionTitle>최근대회</SectionTitle>
            </PaddingBox>
                <RecentList 
                    categoryIdArr={categoryIdArr}
                />            
            </ScrollView>
        </View>
    )
}

interface ListProp{
    categoryIdArr: Array<string>,
}

// 인기 대회
const HotList = ({categoryIdArr}:ListProp)=>{
    const navigation = useNavigation()
    const { loading, error, data, fetchMore, refetch } = useQuery(GET_CATEGORY_LIST_HOTS,{
        variables:{
            first:8,
            after:null,
            categories:categoryIdArr,
        },
        fetchPolicy:'network-only'
    });
    
    // refetch
    const onRefresh=async ()=>{
        try{
            await refetch({
                first:8,
                after:null,
                categories:categoryIdArr,
            })
            console.log('refetch')
        } catch(e){
            console.log('refetch err')
        }
    }   
    if (loading) return <Loading />;
    if (error) return <ErrorPage onPress={onRefresh} />
    return(
        <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data.hotContests.edges}
            renderItem={({item})=>
                    <CategoryListPoster 
                    key = {item.node.id.toString()} 
                    onPress={()=>navigation.navigate('DetailPage',{
                            listId:item.node.id
                        })} 
                    contest={item}/>
            }
            keyExtractor={(item) => item.node.id}
            onEndReached={()=>{
                if(data.hotContests.pageInfo.hasNextPage){
                    fetchMore({
                        variables:{
                            first:8,
                            after:data.hotContests.pageInfo.endCursor,
                            categories:categoryIdArr,
                        }}) 
                        console.log('fetchmore')
                    }
                else if(!data.hotContests.pageInfo.hasNextPage){
                        console.log('no more')
                }
            }}
        />
    )
}

// 최근 대회
const RecentList = ({categoryIdArr}:ListProp)=>{
    const navigation = useNavigation()
    const { loading, error, data, fetchMore, refetch } = useQuery(GET_CATEGORY_LIST_LATEST,{
        variables:{
            first:8,
            after:null,
            categories:categoryIdArr,
        },
        fetchPolicy:'network-only'
    });
    
    // refetch
    const onRefresh=async ()=>{
        try{
            await refetch({
                first:8,
                after:null,
                categories:categoryIdArr,
            })
            console.log('refetch')
        } catch(e){
            console.log('refetch err')
        }
    }   
    if (loading) return <Loading />;
    if (error) return <ErrorPage onPress={onRefresh} />
    return(
        <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data.latestContests.edges}
            renderItem={({item})=>
                    <CategoryListPoster 
                    key = {item.node.id.toString()} 
                    onPress={()=>
                        navigation.navigate('DetailPage',{
                            listId:item.node.id
                        })
                    } 
                    contest={item}/>
            }
            keyExtractor={(item) => item.node.id}
            onEndReached={()=>{
                if(data.latestContests.pageInfo.hasNextPage){
                    fetchMore({
                        variables:{
                            first:8,
                            after:data.latestContests.pageInfo.endCursor,
                            categories:categoryIdArr,
                        }}) 
                        console.log('fetchmore')
                    }
                else if(!data.latestContests.pageInfo.hasNextPage){
                        console.log('no more')
                }
            }}
        />
    )
}

interface contestProp{
    contest:{
        node:{
            title:string,
            application:{
                status:string,
                period:{
                    endAt:string,
                }
            },
            posterURL:string
        }
    },
    onPress:()=>void;
}

const CategoryListPoster = ({contest,onPress}:contestProp) =>{
    return(
        <PosterContainer onPress={onPress}>
            <Recruitbox>
                {status(contest.node.application.status, contest.node.application.period.endAt)}
            </Recruitbox>
            <Image
                source={{uri:`${contest.node.posterURL},w_297,h_420`}}
                style={{width:'100%',height:'100%',borderRadius:10}}
            />
            <LinearGradient 
                colors={['transparent', Color.b_color]} 
                start={{ x: 0.5, y: 0.3 }} end={{ x: 0.5, y: 1 }}
                style={{position:'absolute',width:'100%',height:'100%', opacity:0.7,borderRadius:10}} />
            <PosterText numberOfLines={2}>{contest.node.title}</PosterText>
        </PosterContainer>
    )
}


const PosterContainer=styled.TouchableOpacity`
  align-items:center;
  width:150px;
  aspect-ratio:0.7;
  margin-left:10px;
`

const PaddingBox = styled.View`
    padding-horizontal:10px;
`


export default CategoryListPage;


