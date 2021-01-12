// navigation을 다루는 페이지
import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


// page
import SearchPage from './SearchPage';
import ListPage from './ListPage';
import DetailPage from './ListPage/DetailPage';
import FilterPage from './ListPage/FilterPage';
import HomePage from './HomePage';
// icon
import Home from '~/Assets/Home.svg';
import Flame from '~/Assets/fire-solid.svg';
import Search from '~/Assets/compass-regular.svg';

// style
import {Color,IconSize,DWidth} from '~/Styles';

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
                focused?<Search height={IconSize.icon} width={IconSize.icon} fill={Color.p_color} />
              :<Search height={IconSize.icon} width={IconSize.icon} fill={Color.g4_color} />
                );
            } else if (route.name === '홈') {
              return (
                focused?<Home height={IconSize.icon} width={IconSize.icon} fill={Color.p_color} />
                :<Home height={IconSize.icon} width={IconSize.icon} fill={Color.g4_color} />
              
              );
            } else if (route.name === '대회') {
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
                return label = focused ? <Text style={{ color:Color.p_color }}>검색</Text> : null
              case '홈':
                return label = focused ? <Text style={{ color:Color.p_color }}>홈</Text> : null
              case '대회':
                return label = focused ? <Text style={{ color:Color.p_color }}>대회</Text> : null
            }
            return label
          }
        })}
      >
        <Tab.Screen name="검색" component={SearchPage} />
        <Tab.Screen name="홈" component={HomePage} />
        <Tab.Screen name="대회" component={ListStackNavi} />
    </Tab.Navigator>
  );
}

const ListStackNavi=()=>{
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="ListPage" component={ListPage} />
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
        <Stack.Screen name="FilterPage" component={FilterPage} />
    </Stack.Navigator>
  )
}

export default MainStackNavi;
