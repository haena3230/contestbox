// type
import {RouteProp} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// tag
interface ArrayProps{
  id:string,label:string,value:boolean
}

// sort 
export interface SortStatus{
  statusName:string,
  status:string,
  statusArr:Array<boolean>
}

// navigation
type StackParamList={
  HomePage:undefined;
  SearchPage:undefined;
  SearchListPage:{
    search:string;
    typeIdArray:Array<string>,
    conditionIdArray:Array<string>
  };
  SearchFilterPage:{
    search:string;
    typeIdArray:Array<string>,
    conditionIdArray:Array<string>
  };
  CategoryPage:undefined;
  CategoryListPage:{
    categoryArray:Array<ArrayProps>
    categoryIdArr:Array<string>
  };
  DetailPage:{listId:string};
  CommunityPage:undefined
  CommunityDetailPage:{category:string}
  CommunityAddPage:undefined
  MyPage:undefined;
  ManageMyPage:undefined;
  ScrapListPage:undefined;
  MyPostPage:undefined;
  LoginPage:undefined
};

export interface SearchPageProps{
  navigation:StackNavigationProp<StackParamList,'SearchPage'>
}

export interface SearchListPageProps{
  navigation:StackNavigationProp<StackParamList,'SearchPage'>
  route: RouteProp<StackParamList, 'SearchListPage'>;
}

export interface SearchFilterPageProps{
  navigation:StackNavigationProp<StackParamList,'SearchListPage'>
  route: RouteProp<StackParamList, 'SearchFilterPage'>;
}

export interface HomaPageProps{
  navigation:StackNavigationProp<StackParamList,'HomePage'>
}

export interface CategoryPageProps{
  navigation:StackNavigationProp<StackParamList,'CategoryPage'>
}

export interface CategoryListPageProps {
  navigation: StackNavigationProp<StackParamList, 'DetailPage'>;
  route: RouteProp<StackParamList, 'CategoryListPage'>;
}

export interface DetailPageProps {
  navigation: StackNavigationProp<StackParamList, 'SearchListPage'>;
  route: RouteProp<StackParamList, 'DetailPage'>;
}

export interface CommunityPageProps{
  navigation:StackNavigationProp<StackParamList,'CommunityPage'>
}

export interface CommunityDetailPageProps {
  navigation: StackNavigationProp<StackParamList, 'CommunityPage'>;
  route: RouteProp<StackParamList, 'CommunityDetailPage'>;
}


export interface MyPageProps {
  navigation: StackNavigationProp<StackParamList, 'MyPage'>;
}









