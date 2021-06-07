// 내가쓴 글, 내가 쓴 댓글 정보 모아보기
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { MyPageProps } from '~/Types'
import styled from 'styled-components/native'
// component 
import { PageHeader } from '~/Components/Header' 
import { Color, Container, IconSize, Styles } from '~/Styles'
import MenuIcon from '~/Assets/more_horiz_black_24dp.svg'
import { ConfirmModalComponent } from '~/Components/Modal'

const MyPostPage=({navigation}:MyPageProps)=>{
    // true. 내가쓴 글 false. 댓글
    const [section,setSection]=useState<boolean>(true)    
    return(
        <View style={{flex:1}}>
            <PageHeader pageName={'내가 쓴 글'} onPressClose={()=>navigation.goBack()} />
                {section?(
                    <Container>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>setSection(true)}>
                                <PickedMenuText>나의 글</PickedMenuText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setSection(false)}>
                                <MenuText>나의 댓글</MenuText>
                            </TouchableOpacity>
                        </View>
                        <PostContainer>
                            <Post />
                            <View style={{borderWidth:0.5,borderColor:Color.border,marginVertical:10}}/>
                            <Post />
                        </PostContainer>
                    </Container>
                ):(
                    <Container>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>setSection(true)}>
                                <MenuText>나의 글</MenuText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setSection(false)}>
                                <PickedMenuText>나의 댓글</PickedMenuText>
                            </TouchableOpacity>
                        </View>
                        <Comment />
                    </Container>
                )}
        </View>
    )
}

const Post=()=>{
    const[menu,setMenu]=useState<boolean>(false);
    return(
        <PostBox>
            <TouchableOpacity style={{flex:0.8}}>
                <Title numberOfLines={1}>사이트 임시 중단 안ffkfkffflfllf라라라ㅏ라라ㅏ라fkkffkfkk내</Title>
                <View style={{flexDirection:'row', alignItems:'center',paddingVertical:3}}>
                    <View style={{borderRightWidth:1, borderColor:Color.border,paddingRight:5}}>
                        <InfoText>자유게시판</InfoText>
                    </View>                 
                    <View style={{borderRightWidth:1, borderColor:Color.border,paddingHorizontal:5}}>
                        <InfoText>10분 전</InfoText>
                    </View>
                    <View style={{paddingHorizontal:5}}>
                        <InfoText>댓글 3개</InfoText>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:0.2, alignItems:'flex-end'}} onPress={()=>setMenu(true)}>
                <MenuIcon width={IconSize.icon} height={IconSize.icon} fill={Color.gray}/>
            </TouchableOpacity>
            <ConfirmModalComponent 
                Info={'삭제하시겠습니까?'} 
                modalVisible={menu} 
                onPressConfirm={()=>null} 
                onPressCancle={()=>setMenu(false)}/>
        </PostBox>
    )
}

const Comment=()=>{
    const[menu,setMenu]=useState<boolean>(false);
    return(
        <CommentBox>
            <TouchableOpacity style={{flex:0.8}}>
                <Title numberOfLines={1}>제목입니다</Title>
                <CommentText>
                    댓글입니다.
                </CommentText>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:0.2, alignItems:'flex-end'}} onPress={()=>setMenu(true)}>
                <MenuIcon width={IconSize.icon} height={IconSize.icon} fill={Color.gray}/>
            </TouchableOpacity>
            <ConfirmModalComponent 
                Info={'삭제하시겠습니까?'} 
                modalVisible={menu} 
                onPressConfirm={()=>null} 
                onPressCancle={()=>setMenu(false)}/>
        </CommentBox>
    )
}

const PostContainer = styled.View`
    border-radius:10px;
    border-width:1px;
    border-color:${Color.border};
    background-color:${Color.artbox};
    padding:10px;
    justify-content:center;
`
const PostBox = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`

const CommentBox=styled.View`
    border-radius:10px;
    background-color:${Color.border};
    padding:10px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;

`
const MenuText=styled.Text`
    ${Styles.m_b_font}
    margin:5px;
`
const PickedMenuText=styled.Text`
    ${Styles.m_b_font}
    margin:5px;
    color:${Color.p_color}
`
const Title = styled.Text`
    ${Styles.m_font}
    font-weight:bold;
    color:${Color.b_color}
`
const InfoText = styled.Text`
    ${Styles.s_font}
    color:${Color.gray}
`
const CommentText=styled.Text`
    ${Styles.s_font}
    color:${Color.b_color}
    margin-vertical:5px
`

export default MyPostPage