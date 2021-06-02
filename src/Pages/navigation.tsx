// navigation을 다루는 페이지
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// page
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import SearchListPage from './SearchPage/SearchListPage';
import SearchFilterPage from './SearchPage/SearchFilterPage';
import CategoryPage from './CategoryPage';
import CategoryListPage from './CategoryPage/CategoryListPage';
import DetailPage from './DetailPage';
import LoginPage from './LoginPage';
import CommunityPage from './CommunityPage';
import CommunityDetailPage from './CommunityPage/CommunityDetailPage';
import CommunityAddPage from './CommunityPage/CommunityAddPage';
import MyPage from './MyPage';
import ManageMyPage from './MyPage/ManageMyPage';

// icon
import Search from '~/Assets/search-solid.svg';
import Category from '~/Assets/category_black_24dp.svg'
import Home from '~/Assets/home_black_24dp.svg';
import Community from '~/Assets/forum_black_24dp.svg'
import User from '~/Assets/assignment_ind_black_24dp.svg'

// style
import {Color,Styles,IconSize,DWidth} from '~/Styles';
import styled from 'styled-components/native';
import ScrapListPage from './MyPage/ScrapListPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// main bottom tab
function MainTabNavi() {
  return (
      <Tab.Navigator
        initialRouteName="홈"
        
        tabBarOptions={{
          activeBackgroundColor: Color.p_l_color,
          keyboardHidesTabBar:true,
          style:{
            height:DWidth>480? 80:50,
            width:DWidth>480? 480:DWidth,   
          },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({focused}) => {
            if (route.name === '검색') {
              return (
                focused?<Search height={IconSize.sicon} width={IconSize.sicon} color={Color.p_color}/>
              :<Search height={IconSize.sicon} width={IconSize.sicon} color={Color.gray} />
                );
            } else if (route.name === '카테고리') {
              return (
                focused?<Category height={IconSize.icon} width={IconSize.icon} fill={Color.p_color} />
                :<Category height={IconSize.icon} width={IconSize.icon} fill={Color.gray} />
              );
            } else if (route.name === '홈') {
              return (
                focused?<Home height={IconSize.bicon} width={IconSize.bicon} fill={Color.p_color} />
                :<Home height={IconSize.bicon} width={IconSize.bicon} fill={Color.gray} />
              
              );
            } else if (route.name === '커뮤니티') {
              return (
                focused?<Community height={IconSize.icon} width={IconSize.icon} fill={Color.p_color} />
                :<Community height={IconSize.icon} width={IconSize.icon} fill={Color.gray} />
              
              );
            } else if (route.name === 'My') {
              return (
                focused?<User height={IconSize.icon} width={IconSize.icon} fill={Color.p_color} />
                :<User height={IconSize.icon} width={IconSize.icon} fill={Color.gray} />
              
              );
            } 

          },
          tabBarLabel: ({ focused}) => {
            let label;
            switch (route.name) {
              case '검색':
                return label = focused ? <FocusedText>검색</FocusedText> 
                : <NText>검색</NText> 
              case '카테고리':
                return label = focused ? <FocusedText>카테고리</FocusedText> 
                : <NText>카테고리</NText> 
              case '홈':
                return null
              case '커뮤니티':
                return label = focused ? <FocusedText>커뮤니티</FocusedText> 
                : <NText>커뮤니티</NText>
              case 'My':
                return label = focused ? <FocusedText>My</FocusedText> 
                : <NText>My</NText>  
              
            }
            return label
          }
        })}
      >
        <Tab.Screen name="검색" component={SearchPage} />
        <Tab.Screen name="카테고리" component={CategoryPage} />
        <Tab.Screen name="홈" component={HomePage} />
        <Tab.Screen name="커뮤니티" component={CommunityPage} />
        <Tab.Screen name="My" component={MyPage} />
    </Tab.Navigator>
  );
}

// main stack
const MainStackNavi=()=>{
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="MainTabNavi" component={MainTabNavi} />
        <Stack.Screen name="CategoryListPage" component={CategoryListPage} />
        <Stack.Screen name="SearchListPage" component={SearchListPage} />
        <Stack.Screen name="SearchFilterPage" component={SearchFilterPage} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
        <Stack.Screen name="CommunityDetailPage" component={CommunityDetailPage} />
        <Stack.Screen name="CommunityAddPage" component={CommunityAddPage} />
        <Stack.Screen name="ManageMyPage" component={ManageMyPage} />
        <Stack.Screen name="ScrapListPage" component={ScrapListPage} />
    </Stack.Navigator>
  )
}

export default MainStackNavi;

const FocusedText=styled.Text`
  color : ${Color.p_color};
  ${Styles.s_font};
`
const NText=styled.Text`
  color : ${Color.b_color};
  ${Styles.s_font};
`