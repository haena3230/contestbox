// type
import {RouteProp} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface ArrayProps{
  id:string,label:string,value:boolean
}
// navigation
type StackParamList={
  HomePage:undefined;
  SearchPage:undefined;
  SearchListPage:{
    search:string;
    typeArray:null|Array<ArrayProps>,
    conditionArray:null|Array<ArrayProps>
  };
  SearchFilterPage:{
    search:string;
    typeArray:null|Array<ArrayProps>,
    conditionArray:null|Array<ArrayProps>
  };
  CategoryPage:undefined;
  CategoryListPage:{
    categoryArray:Array<ArrayProps>
    typeArray:null|Array<ArrayProps>,
    conditionArray:null|Array<ArrayProps>
  };
  DetailPage:{listId:string};
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


// sort 
export interface SortStatus{
  statusName:string,
  status:string,
  statusArr:Array<boolean>
}







