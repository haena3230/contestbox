import React,{useRef} from 'react';
import {ScrollView, Image} from 'react-native';
import styled from 'styled-components/native';
import {Color} from '~/Styles';
import LinearGradient from 'react-native-linear-gradient';
// data
import { useQuery } from '@apollo/client';
import {GET_CATEGORY_LIST_HOTS,GET_CATEGORY_LIST_LATEST,GET_CATEGORY_LIST_IMM} from '~/queries';
import {CategoryListPageProps } from '~/Types';
// component
import Loading from '~/Components/Loading';
import { ErrorPage } from '~/Components/Error';
import { status } from '~/Components/TextList';
import { PosterText, Recruitbox } from '~/Pages/HomePage';

interface pageInfoProps{
    endCursor:string,
    hasNextPage:boolean
}

interface CategoryListDataProps{
    categoryIdArr:Array<string>
    props:CategoryListPageProps
}
// 인기
export const CategoryListDataHOT=({categoryIdArr,props}:CategoryListDataProps)=>{
    const scrollRef=useRef<ScrollView>();
    let listData=``;
    let pageInfo:pageInfoProps={
        endCursor:null,
        hasNextPage:null
    }
    const { loading, error, data,fetchMore,refetch } = useQuery(GET_CATEGORY_LIST_HOTS,{
        variables:{
            cursor:pageInfo.endCursor,
            categories:categoryIdArr
        },
        fetchPolicy:'network-only'
    });
    
    // refetch
    const onRefresh=async ()=>{
        try{
            await refetch({
                categories:categoryIdArr
            })
            console.log('refetch')
        } catch(e){
            console.log('refetch err')
        }
    }
    if (loading) return <Loading />;
    if (error) return <ErrorPage onPress={onRefresh} />
    if(data&&data.contests.edges){
        listData=data.contests.edges.map((contest)=>
            <PosterContainer key = {contest.node.id.toString()} onPress={()=>
                props.navigation.push('DetailPage',{
                    listId:contest.node.id
                })
                }>
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
                <PosterText numberOfLines={2}>{contest.node.id}</PosterText>
            </PosterContainer>
        )
        pageInfo = data.contests.pageInfo;
    }

    return(
        <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            onScroll={(e)=>{
                if (e.nativeEvent.contentOffset.x + e.nativeEvent.layoutMeasurement.width >= e.nativeEvent.contentSize.width && pageInfo.hasNextPage===true){
                    console.log(pageInfo.endCursor)
                    fetchMore({
                        variables:{
                            cursor:pageInfo.endCursor,
                            categories:categoryIdArr
                        }}) 
                }}}>
            {listData}   
        </ScrollView>
    )
}

// 최신
export const CategoryListDataLATEST=({categoryIdArr,props}:CategoryListDataProps)=>{
    const scrollRef=useRef<ScrollView>();

    let listData=``;
     let pageInfo:pageInfoProps={
        endCursor:null,
        hasNextPage:null
    }
    const { loading, error, data,fetchMore,refetch } = useQuery(GET_CATEGORY_LIST_LATEST,{
        variables:{
            cursor:pageInfo.endCursor,
            categories:categoryIdArr
        },
        fetchPolicy:'network-only'
    });
    // refetch
    const onRefresh=async ()=>{
        console.log('refetch')
        try{
            await refetch({
                categories:categoryIdArr
            })
            console.log('refetch')
        } catch(e){
            console.log('refetch err')
        }
    }
    if (loading) return <Loading />;
    if (error) return <ErrorPage onPress={onRefresh} />
    if(data&&data.contests.edges){
        listData=data.contests.edges.map((contest)=>
            <PosterContainer key = {contest.node.id.toString()} onPress={()=>
                props.navigation.push('DetailPage',{
                    listId:contest.node.id
                })
                }>
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
        pageInfo=data.contests.pageInfo;
    }

    return(
        <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            onScroll={(e)=>{
                if (e.nativeEvent.contentOffset.x + e.nativeEvent.layoutMeasurement.width >= e.nativeEvent.contentSize.width && pageInfo.hasNextPage===true){
                    fetchMore({
                        variables:{
                            cursor:pageInfo.endCursor,
                            categories:categoryIdArr,
                    }})
                }}}>
            {listData}   
        </ScrollView>
    )
}

// 마감임박
export const CategoryListDataIMM=({categoryIdArr,props}:CategoryListDataProps)=>{
    const scrollRef=useRef<ScrollView>();

    let listData=``;
    let pageInfo:pageInfoProps={
        endCursor:null,
        hasNextPage:null
    }
    const { loading, error, data,fetchMore,refetch } = useQuery(GET_CATEGORY_LIST_IMM,{
        variables:{
            cursor:pageInfo.endCursor,
            categories:categoryIdArr
        },
        fetchPolicy:'network-only'
    });
    // refetch
    const onRefresh=async ()=>{
        console.log('refetch')
        try{
            await refetch({
                categories:categoryIdArr
            })
            console.log('refetch')
        } catch(e){
            console.log('refetch err')
        }
    }
    if (loading) return <Loading />;
    if (error) return <ErrorPage onPress={onRefresh} />
    if(data&&data.contests.edges){
        listData=data.contests.edges.map((contest)=>
            <PosterContainer key = {contest.node.id.toString()} onPress={()=>
                props.navigation.push('DetailPage',{
                    listId:contest.node.id
                })
                }>
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
        pageInfo=data.contests.pageInfo;
    }

    return(
        <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            onScroll={(e)=>{
                if (e.nativeEvent.contentOffset.x + e.nativeEvent.layoutMeasurement.width >= e.nativeEvent.contentSize.width && pageInfo.hasNextPage===true){
                    fetchMore({
                        variables:{
                            cursor:pageInfo.endCursor,
                            categories:categoryIdArr,
                    }})
                }}}>
            {listData}   
        </ScrollView>
    )
}

const PosterContainer=styled.TouchableOpacity`
  align-items:center;
  width:150px;
  aspect-ratio:0.7;
  margin-left:10px;
`


