// community page
import React, { useState } from 'react'
import { View,TouchableOpacity, Text,ScrollView } from 'react-native'
import { Color, Container,  Styles } from '~/Styles'
import styled from 'styled-components/native'
// component
import { CategoryListTag } from '~/Components/HashTag';
import Header from '~/Components/Header';
import {CommunityListBtn,CommunityMenuBtn} from '~/Components/Btn';
import { BoxFeed, ListFeed } from '~/Components/CommunityFeed';
import AddBtn from '~/Components/AddPost';
import { CommunityPageProps } from '~/Types';

const test = [{label: '전체', value:false}, {label: '자유게시판', value:false}, {label: '팀원구해요', value:false}, {label: '후기', value:false}, {label: '공지', value:false}];

const CommunityPage= ({navigation}:CommunityPageProps)=>{
    const [boxFeed,setBoxFeed] = useState<boolean>(true)
    const [sort,setSort] = useState<boolean>(true);

    const onPressFeed = ()=>{
        navigation.navigate('CommunityDetailPage',{
            category:'전체'
        });
    }
    return(
        <View style={{flex:1}}>
            <ScrollView>
                <Header />
                <Container>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {test.map((data)=>{
                            return(
                                <TouchableOpacity key={data.label} onPress={()=>null} >
                                    <CategoryListTag text={data.label} picked={data.value}  />
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    <CommunityBar boxFeed={boxFeed} sort={sort} onPressFeedList={()=>setBoxFeed(!boxFeed)} onPressSort={()=>setSort(!sort)}/>
                    {/* feed */}
                    {boxFeed?(
                        <View>
                            <TouchableOpacity onPress={onPressFeed}>
                                <BoxFeed 
                                    category={'자유게시판'} 
                                    time={'10분전'} 
                                    title={'제목입니당당당당다라다랃라다랃라다라다라달다랃라다'}
                                    body={'바디입니다ㅏㅏ다다ㅏ다다바디입니다ㅏㅏ다다ㅏ다다바디입니다ㅏㅏ다다ㅏ다다바디입니다ㅏㅏ다다ㅏ다다바디입니다ㅏㅏ다다ㅏ다다'}
                                    url={['2','2']}
                                    comments={3}
                                    />
                            </TouchableOpacity>
                        </View>
                    ):(
                        <View>
                            <TouchableOpacity onPress={onPressFeed}>
                                <ListFeed 
                                    category={'자유게시판'}
                                    title={'제목입니다다다다다ㅏ다다다'}
                                    time={'2분전'}
                                    comments={3}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </Container>
            </ScrollView>
            <AddBtn onPressAddBtn={onPressFeed}/>
        </View>
    )
}

interface CommunityBarProps{
    boxFeed:boolean;
    sort:boolean;
    onPressFeedList:()=>void;
    onPressSort:()=>void;
}
const CommunityBar = ({boxFeed,sort,onPressFeedList,onPressSort}:CommunityBarProps)=>{
    return(
        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:10}}>
                {sort?(
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={Styles.m_m_font}>총 28개</Text>
                        <View style={{borderRightWidth:1,borderColor:Color.border, height:20,marginHorizontal:10}} />
                        <CommunityBarSort onPress={onPressSort} picked={true} text={'최신순'}/>
                        <CommunityBarSort onPress={onPressSort} picked={false} text={'조회순'}/>
                    </View>

                ):(
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={Styles.m_m_font}>총 28개</Text>
                        <View style={{borderRightWidth:1,borderColor:Color.border, height:20,marginHorizontal:10}} />
                        <CommunityBarSort onPress={onPressSort} picked={false} text={'최신순'}/>
                        <CommunityBarSort onPress={onPressSort} picked={true} text={'조회순'}/>
                    </View>
                )}
            {boxFeed?(
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CommunityListBtn onPress={onPressFeedList} picked={false}/>
                    <CommunityMenuBtn onPress={onPressFeedList} picked={true}/>
                </View>
            ):(
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CommunityListBtn onPress={onPressFeedList} picked={true}/>
                    <CommunityMenuBtn onPress={onPressFeedList} picked={false}/>
                </View>
            )}
            
        </View>
    )
}
interface CommunityBarSortProps{
    text:string;
    picked:boolean;
    onPress:()=>void;
}
const CommunityBarSort =({text,picked,onPress}:CommunityBarSortProps)=>{
    return(
        <TouchableOpacity onPress={onPress} style={{marginRight:10}}>
            {picked?(
                <BarText color={Color.p_color}>{text}</BarText>
            ):(
                <BarText color={Color.b_color}>{text}</BarText>
            )}
        </TouchableOpacity>
    )
}
interface BarTextProps{
    color:string;
}
const BarText = styled.Text`
    ${Styles.m_m_font}
    color:${(props:BarTextProps)=>props.color};
`

export default CommunityPage