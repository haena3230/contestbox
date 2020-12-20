// navigation을 다루는 페이지
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainPage from './MainPage';
import ListPage from './ListPage';
import CommunityPage from './CommunityPage';
import NoticePage from './NoticePage';

const Tab = createBottomTabNavigator();

function MainTabNavi() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MainPage" component={MainPage} />
      <Tab.Screen name="ListPage" component={ListPage} />
      <Tab.Screen name="CommunityPage" component={CommunityPage} />
      <Tab.Screen name="NoticePage" component={NoticePage} />
    </Tab.Navigator>
  );
}

export default MainTabNavi;
