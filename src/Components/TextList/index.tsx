// 대회 리스트
import React, { useEffect } from 'react';
import {View,Text} from 'react-native';
import styled from 'styled-components/native'
// 접수예정,접수중,접수마감,취소,마감임박
import {PreRecruit,Recruit,NoRecruit,CancelRecruit,ImmenentRecruit} from '~/Components/Recruit';
import {Styles,Color} from '~/Styles';
import moment from 'moment';

interface TextListProps{
    recruit:string;
    deadline:string;
    title:string;
    viewcount:number;
}
const TextList=({recruit,deadline,title,viewcount}:TextListProps)=>{
    const status=(status)=>{
        switch(status){
            case 'NOTSTARTED':
                return <PreRecruit />;
            case 'INPROGRESS':
                return <Recruit />;
            case 'COMPLETED':
                return <NoRecruit />;
        }
    }
    const Immenent=(deadline)=>{
        // 현재로부터 7일 미만이면 마감임박
        let now = moment();        
        let after = moment(now).add(7,'days');
        if(moment(now).isBefore(deadline)&&moment(after).isAfter(deadline))       
        return <ImmenentRecruit />;
    }
    return(
        <View>
            <Recruitbox>
                {status(recruit)}
                {Immenent(deadline)}
            </Recruitbox>
            <Title numberOfLines={1}>{title}</Title>
            <ViewCount>조회수 {viewcount}</ViewCount>
        </View>
    )
}


export const ListBox = styled.TouchableOpacity`
    background-color:white;
    border-radius:10px;
    border-width:1px;
    border-color:${Color.g1_color};
    padding:20px;
    margin-vertical:5px;
`

export const TagBox=styled.View`
  flex-direction:row;
  flex-wrap:wrap;
  margin-top:5px;
`
const Recruitbox=styled.View`
    flex-direction:row;
`
const Title=styled.Text`
    margin-top:10px;
    ${Styles.m_font};

`
const ViewCount=styled.Text`
    margin-top:5px;
    ${Styles.ss_font};
`
export default TextList;

 // list data
//   const { loading, error, data } = useQuery(GET_LISTS);
//   let template=``;
//   if (loading) return <Loading />;
//   if (error) return <Text>Error</Text>;
//   if(data&&data.contests.edges){
//     template=data.contests.edges.map((data)=>
//     <ListBox key = {data.node.id.toString()} onPress={()=>navigation.navigate('DetailPage',{
//       listId:data.node.id,
//     })}>
//       <TextList 
//         recruit={data.node.application.status} 
//         deadline={data.node.application.period.endAt}
//         title={data.node.title} 
//         viewcount={data.node.hits}
//         />
//         {data.node.categories!==null?(
//           <TagBox>
//             {data.node.categories.slice(0,3).map((tag)=>
//               <HashTag key={tag.id.toString()} hashtag={tag.label} picked={false}/>
//             )}
//             {data.node.categories.length>3?(
//               <HashTag hashtag={'+'+ (data.node.categories.length-3)} picked={false}/>
//             ):(
//               null
//             )}
//           </TagBox>
//         ):null}
//       </ListBox>
//     )