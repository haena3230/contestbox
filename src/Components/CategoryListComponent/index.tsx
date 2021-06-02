import React,{useState,useRef} from 'react';
import {View,ScrollView,RefreshControl, Image} from 'react-native';
import styled from 'styled-components/native';
import {Styles,Color} from '~/Styles';
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
            after:pageInfo.endCursor,
            first:10,
            sort:'HITS',
            categories:categoryIdArr
        },
        fetchPolicy:'no-cache'
    });
    // refetch
    const [refreshing,setRefreshing]=useState(false);
    const onRefresh=async ()=>{
        console.log('refetch')
        setRefreshing(true);
        try{
            await refetch({
                first:10,
                sort:'HITS',
                categories:categoryIdArr
            })
            setRefreshing(false);
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
    // pagination
    const onEndReached=()=>{
        if(pageInfo.hasNextPage===true)
            {   
                fetchMore({
                    variables:{
                        after:pageInfo.endCursor,
                        first:10,
                        sort:'HITS',
                        categories:categoryIdArr,
                    }
                })
            }
    }

    return(
        <View style={{marginLeft:10}}>
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                ref={scrollRef}
                onScroll={(e)=>{
                    if (e.nativeEvent.contentOffset.x + e.nativeEvent.layoutMeasurement.width >= e.nativeEvent.contentSize.width){
                        onEndReached()
                    }                 
                }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh}
                        colors={[Color.p_color]}
                        />}
                >
                {listData}   
            </ScrollView>
            {pageInfo.hasNextPage?<Loading />:null}
        </View>
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
            after:pageInfo.endCursor,
            first:10,
            sort:'LATEST',
            categories:categoryIdArr
        },
        fetchPolicy:'no-cache'
    });
    // refetch
    const [refreshing,setRefreshing]=useState(false);
    const onRefresh=async ()=>{
        console.log('refetch')
        setRefreshing(true);
        try{
            await refetch({
                first:10,
                sort:'LATEST',
                categories:categoryIdArr
            })
            setRefreshing(false);
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
    // pagination
    const onEndReached=()=>{
        if(pageInfo.hasNextPage===true)
            {   
                fetchMore({
                    variables:{
                        after:pageInfo.endCursor,
                        first:10,
                        sort:'LATEST',
                        categories:categoryIdArr,
                    }
                })
            }
    }

    return(
        <View style={{marginLeft:10}}>
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                ref={scrollRef}
                onScroll={(e)=>{
                    if (e.nativeEvent.contentOffset.x + e.nativeEvent.layoutMeasurement.width >= e.nativeEvent.contentSize.width){
                        onEndReached()
                    }                 
                }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh}
                        colors={[Color.p_color]}
                        />}
                >
                {listData}   
            </ScrollView>
            {pageInfo.hasNextPage?<Loading />:null}
        </View>
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
            after:pageInfo.endCursor,
            first:10,
            sort:'HITS',
            categories:categoryIdArr
        },
        fetchPolicy:'no-cache'
    });
    // refetch
    const [refreshing,setRefreshing]=useState(false);
    const onRefresh=async ()=>{
        console.log('refetch')
        setRefreshing(true);
        try{
            await refetch({
                first:10,
                sort:'HITS',
                categories:categoryIdArr
            })
            setRefreshing(false);
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
    // pagination
    const onEndReached=()=>{
        if(pageInfo.hasNextPage===true)
            {   
                fetchMore({
                    variables:{
                        after:pageInfo.endCursor,
                        first:10,
                        sort:'HITS',
                        categories:categoryIdArr,
                    }
                })
            }
    }

    return(
        <View style={{marginLeft:10}}>
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                ref={scrollRef}
                onScroll={(e)=>{
                    if (e.nativeEvent.contentOffset.x + e.nativeEvent.layoutMeasurement.width >= e.nativeEvent.contentSize.width){
                        onEndReached()
                    }                 
                }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh}
                        colors={[Color.p_color]}
                        />}
                >
                {listData}   
            </ScrollView>
            {pageInfo.hasNextPage?<Loading />:null}
        </View>
    )
}

const PosterContainer=styled.TouchableOpacity`
  align-items:center;
  width:150px;
  aspect-ratio:0.7;
  margin-right:10px;
`


