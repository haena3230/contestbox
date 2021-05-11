import React,{useState,useRef, useEffect} from 'react';
import {View,ScrollView, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Styles,Color} from '~/Styles';
// data
import {CategoryListPageProps } from '~/Types';
// component
import {CategoryListTag} from '~/Components/HashTag';
import ToTop from '~/Components/ToTop';
import { pickedIdArray} from '~/Components/Filter';
import { PageHeader } from '~/Components/Header';
import { CategoryListDataHOT,CategoryListDataLATEST,CategoryListDataIMM } from '~/Components/CategoryListComponent';


const CategoryListPage=(props:CategoryListPageProps)=>{
    useEffect(()=>{
        console.log('categoryListPage');
        console.log(categoryId)
    },[])
    // category & type & condition 
    const {categoryArray,categoryIdArr} =props.route.params;
    // state
    const [category,setCategory]=useState<Array<{id:string,label:string,value:boolean}>>(categoryArray)
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

    // totop
    const [totop,setTotop]=useState<boolean>(false);
    const scrollRef=useRef<ScrollView>();
    const onPressToTop=()=>{
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        })
    };
    
    return(
        <View>
            <ScrollView 
                style={{backgroundColor:Color.background}} 
                ref={scrollRef}
                onScroll={(e)=>{     
                    if (e.nativeEvent.contentOffset.y===0){
                        setTotop(false);
                    }                    
                }}
                onScrollBeginDrag={()=>setTotop(true)}
                >
                <PageHeader onPressClose={()=>props.navigation.goBack()} pageName={category[0].label} />
                {categoryArray.length>1?(
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft:10}}>
                            {category.slice(1).map((data,index)=>{
                                return(
                                    <TouchableOpacity key={data.id} onPress={()=>onPressCateBtn(data,index)} >
                                        <CategoryListTag text={data.label} picked={data.value}  />
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    ):(
                        null
                    )}
                <Title>
                    <Text style={Styles.m_b_font}>인기대회</Text>
                </Title>
                <CategoryListDataHOT categoryIdArr={categoryId} props={props}/>
                <Title>
                    <Text style={Styles.m_b_font}>최근대회</Text>
                </Title>
                <CategoryListDataLATEST categoryIdArr={categoryId} props={props}/>
                <Title>
                    <Text style={Styles.m_b_font}>마감임박</Text>
                </Title>
                <CategoryListDataIMM categoryIdArr={categoryId} props={props}/>
                <View style={{height:10}}/>
            </ScrollView>
            {totop?(
                <ToTop onPressToTop={()=>onPressToTop()}/>
            ):(
                null
            )}
        </View>
    )
}


const Title=styled.Text`
  padding:20px 10px 10px 10px;
`

export default CategoryListPage;


