// type
import {RouteProp} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// navigation
type StackParamList={
  CategoryPage:undefined;
  CategoryListPage:{category:string}
  FilterPage:undefined;
  DetailPage:{listId:string};

};

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






