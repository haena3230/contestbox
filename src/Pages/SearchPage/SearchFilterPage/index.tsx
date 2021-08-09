// SearchFilterPage
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View} from 'react-native';
import {Color} from '~/Styles';
// components
import {MenuContainer,MenuBox,MenuTitle, AllDeleteText, PickedMenuBox, PickedCategoryMenuBox, FilterCategoryBtn} from '~/Components/Filter';
import { PageHeader } from '~/Components/Header';
import {Btn, SortDownBtn,SortUpBtn} from '~/Components/Btn';
import {FilterPickedTag, HashTag} from '~/Components/HashTag';

import { SearchFilterPageProps } from '~/Types';


const SearchFilterPage =(props:SearchFilterPageProps)=>{
    const [typeMenu,setTypeMenu]=useState<boolean>(false);
    const [conditionMenu,setConditionMenu]=useState<boolean>(false);
    const [categoryMenu,setCategoryMenu]=useState<boolean>(false);
    // reset modal 
    const [resetModal,setResetModal]=useState<boolean>(false);
    return(
        <View style={{backgroundColor:Color.background,flex:1}}>
            <View style={{padding:10}}>
                <PageHeader pageName={'필터'} onPressClose={()=>null}/>
            </View>
            <ScrollView style={{marginBottom:60}}>
                {/* picked  */}
                <View style={{borderBottomWidth:1, borderBottomColor:Color.border}}>
                    <ScrollView
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false}
                        style={{flexWrap:'wrap',flexDirection:'row'}}>
                        <FilterPickedTag text={'경진'}/>
                        <FilterPickedTag text={'경진'}/>
                        <FilterPickedTag text={'경진'}/>
                        <FilterPickedTag text={'경진'}/>
                        <FilterPickedTag text={'경진'}/>
                        <FilterPickedTag text={'경진'}/>
                    </ScrollView>
                    <TouchableOpacity onPress={()=>null} style={{alignItems:'flex-end',marginRight:20, paddingVertical:10}}>
                        <AllDeleteText>모두삭제</AllDeleteText>
                    </TouchableOpacity>
                </View>
                {/* type */}
                <MenuContainer>
                    <MenuBox  onPress={()=>setTypeMenu(!typeMenu)}>
                        <MenuTitle>
                            종류
                        </MenuTitle>
                        {typeMenu?
                            <SortUpBtn />
                            :<SortDownBtn />
                        }
                    </MenuBox>
                    {typeMenu?(
                        <PickedMenuBox>
                            <HashTag hashtag={'경진대회'} picked={true}/>
                            <HashTag hashtag={'경시대회'} picked={false}/>
                            <HashTag hashtag={'공모전'} picked={false}/>
                        </PickedMenuBox>
                    ):null}
                </MenuContainer>
                {/* condition */}
                <MenuContainer>
                    <MenuBox  onPress={()=>setConditionMenu(!conditionMenu)}>
                        <MenuTitle>
                            참여대상
                        </MenuTitle>
                        {conditionMenu?
                            <SortUpBtn />
                            :<SortDownBtn />
                        }
                    </MenuBox>
                    {conditionMenu?(
                        <PickedMenuBox>
                            <HashTag hashtag={'13세 미만'} picked={true}/>
                            <HashTag hashtag={'중고등학생'} picked={false}/>
                            <HashTag hashtag={'대학생'} picked={false}/>
                            <HashTag hashtag={'성인'} picked={false}/>
                        </PickedMenuBox>
                    ):null}
                </MenuContainer>
                {/* category */}
                <MenuContainer>
                    <MenuBox  onPress={()=>setCategoryMenu(!categoryMenu)}>
                        <MenuTitle>
                            카테고리
                        </MenuTitle>
                        {categoryMenu?
                            <SortUpBtn />
                            :<SortDownBtn />
                        }
                    </MenuBox>
                    {categoryMenu?(
                        <PickedCategoryMenuBox>
                            <FilterCategoryBtn category={'스포츠'} picked ={true}/>
                            <FilterCategoryBtn category={'IT'} picked ={false}/>
                            <FilterCategoryBtn category={'미술'} picked ={false}/>
                            <FilterCategoryBtn category={'음악'} picked ={false}/>
                        </PickedCategoryMenuBox>
                    ):null}
                </MenuContainer>
            </ScrollView>
            <View style={{alignItems:'center', position:'absolute',bottom:10, width:'100%'}}>
                    <Btn color={Color.p_color} onPress={()=>null} text={'적용하기'} widthPercent={90}/>
            </View>
        </View>
    )
}


export default SearchFilterPage;