// navigation을 다루는 페이지
import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// page
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import CategoryPage from './CategoryPage';
import CategoryListPage from './CategoryPage/CategoryListPage';
import DetailPage from './DetailPage';

// icon
import Home from '~/Assets/Home.svg';
import Flame from '~/Assets/fire-solid.svg';
import Search from '~/Assets/compass-solid.svg';

// style
import {Color,Styles,IconSize,DWidth} from '~/Styles';
import styled from 'styled-components/native';

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
                focused?<Search height={IconSize.icon} width={IconSize.icon} color={Color.p_color}/>
              :<Search height={IconSize.icon} width={IconSize.icon} color={Color.g4_color} />
                );
            } else if (route.name === '홈') {
              return (
                focused?<Home height={IconSize.icon} width={IconSize.icon} fill={Color.p_color} />
                :<Home height={IconSize.icon} width={IconSize.icon} fill={Color.g4_color} />
              
              );
            } else if (route.name === '카테고리') {
              return (
                focused?<Flame height={IconSize.icon} width={IconSize.icon} color={Color.p_color} />
                :<Flame height={IconSize.icon} width={IconSize.icon} color={Color.g4_color} />
              );
            } 
          },
          tabBarLabel: ({ focused}) => {
            let label;
            switch (route.name) {
              case '검색':
                return label = focused ? <FocusedText>검색</FocusedText> 
                : <NText>검색</NText> 
              case '홈':
                return label = focused ? <FocusedText>홈</FocusedText> 
                : <NText>홈</NText> 
              case '카테고리':
                return label = focused ? <FocusedText>카테고리</FocusedText> 
                : <NText>카테고리</NText> 
            }
            return label
          }
        })}
      >
        <Tab.Screen name="검색" component={SearchPage} />
        <Tab.Screen name="홈" component={HomePage} />
        <Tab.Screen name="카테고리" component={CategoryStackNavi} />
    </Tab.Navigator>
  );
}

const CategoryStackNavi=()=>{
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="CategoryPage" component={CategoryPage} />
        <Stack.Screen name="CategoryListPage" component={CategoryListPage} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
    </Stack.Navigator>
  )
}

// main stack
const MainStackNavi=()=>{
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="MainTabNavi" component={MainTabNavi} />
        {/* <Stack.Screen name="FilterPage" component={FilterPage} /> */}
    </Stack.Navigator>
  )
}

export default MainStackNavi;

const FocusedText=styled.Text`
  color : ${Color.p_color};
  ${Styles.ss_font};
`
const NText=styled.Text`
  color : ${Color.g4_color};
  ${Styles.ss_font};
`