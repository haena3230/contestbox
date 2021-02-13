// type
import {RouteProp} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// navigation
type StackParamList={
  HomePage:undefined;
  SearchPage:undefined;
  SearchListPage:{search:string};
  SearchFilterPage:undefined;
  CategoryPage:undefined;
  CategoryListPage:{categories:Array<any>}
  CategoryFilterPage:undefined;
  FilterPage:undefined;
  DetailPage:{listId:string};
};

export interface SearchPageProps{
  navigation:StackNavigationProp<StackParamList,'SearchPage'>
}

export interface SearchListPageProps{
  navigation:StackNavigationProp<StackParamList,'SearchPage'>
  route:RouteProp<StackParamList,'SearchListPage'>
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
  route: RouteProp<StackParamList, 'DetailPage'>;
}






