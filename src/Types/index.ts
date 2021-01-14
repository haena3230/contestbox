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

export type ListScreenRouteProp=RouteProp<StackParamList,'DetailPage'>;

export type ListPageNavigationProp=StackNavigationProp<
  StackParamList,
  'DetailPage'
>;


