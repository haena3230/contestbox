// 대회 리스트
import React, { useEffect } from 'react';
import {View,Text, Image} from 'react-native';
import styled from 'styled-components/native'
// 접수예정,접수중,접수마감,취소,마감임박
import {PreRecruit,Recruit,NoRecruit,CancelRecruit,ImmenentRecruit} from '~/Components/Recruit';
import {Styles,Color, IconSize} from '~/Styles';
import moment from 'moment';
// component
import {HashTag, ListBoxCategory} from '~/Components/HashTag';
import FillStarIcon from '~/Assets/star_black_24dp.svg'
import StarIcon from '~/Assets/star_outline_black_24dp.svg'
import ViewIcon from '~/Assets/visibility_black_24dp.svg'
import CommentIcon from '~/Assets/comment-regular.svg'

interface TextListProps{
    recruit:string;
    deadline:string;
    title:string;
    host:string;
    viewcount:number;
    categories:Array<{id:string,label:string}>;
    poster:string;
    viewScrap:boolean;
    isScrap:boolean;
    onPress:()=>void;
}
export const status=(status,deadline)=>{
    // 현재로부터 7일 미만이면 마감임박
    let now = moment();        
    let after = moment(now).add(7,'days');
    
    switch(status){
        case 'NOTSTARTED':
            return <PreRecruit />;
        case 'INPROGRESS':
            if(moment(now).isBefore(deadline)&&moment(after).isAfter(deadline))       
                return <ImmenentRecruit />;
            else return <Recruit />;
        case 'COMPLETED':
            return <NoRecruit />;
    }
}
const TextList=({recruit,deadline,title,host,viewcount,categories,poster,viewScrap,isScrap,onPress}:TextListProps)=>{
    
    return(
        <ListBox onPress={onPress}>
            {!poster?null:(
                <Image 
                    style={{width:'27%', aspectRatio:0.7,justifyContent:'center', borderRadius:5}}
                    source={require('~/Assets/poster.png')}/>
                // <Poster source={{
                //     uri:`${poster},w_594,h_840`
                // }}/>      
            )}
            <View style={{width:'73%',paddingHorizontal:10}}>
                {/* top */}
                <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                    <Recruitbox>
                        {status(recruit,deadline)}
                    </Recruitbox>
                    {viewScrap?(
                        isScrap?(<FillStarIcon width={IconSize.bicon} height={IconSize.bicon} fill={Color.y_color}/>):
                        (<StarIcon width={IconSize.bicon} height={IconSize.bicon} fill={Color.y_color}/>)
                    ):null}
                </View>
                {/* middle */}
                <Title numberOfLines={1}>{title}</Title>
                <SmallText>{host}</SmallText>
                {/* bottom */}
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:15}}>
                    {!categories?null:(
                        <TagBox>
                            {categories.slice(0,2).map((tag)=>
                            <ListBoxCategory key={tag.id.toString()} category={tag.label}/>
                            )}
                            {categories.length>2?(
                            <ListBoxCategory category={'+'+ (categories.length-2)}/>
                            ):null}
                        </TagBox>
                        )}
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                <ViewIcon width={IconSize.sicon} height={IconSize.sicon} fill={Color.place_holder} style={{marginHorizontal:5,top:1}}/>
                                <SmallText>{viewcount}</SmallText>
                        </View>
                </View>
            </View>
            
        </ListBox>
    )
}


export const ListBox = styled.TouchableOpacity`
    width:100%;
    flex-direction:row;  
    align-items:center;
    background-color:white;
    border-radius:10px;
    border-width:1px;
    border-color:${Color.border};
    margin-vertical:5px;
    padding:5px;
`

export const TagBox=styled.View`
  flex-direction:row;
  flex-wrap:wrap;
`

const Recruitbox=styled.View`
    flex-direction:row;
`
const Title=styled.Text`
    ${Styles.mb_font};
    font-weight:700;
    color:${Color.b_color};
    margin-vertical:5px;

`
const SmallText=styled.Text`
    ${Styles.ss_font};
    color:${Color.place_holder}
`
export default TextList;
