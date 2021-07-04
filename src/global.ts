// 변수 저장 cache
import {  makeVar } from '@apollo/client';


// export interface treeCategoriesProp {
//     id: string;
//     label: string;
//     parentID:boolean;
// }
export const treeCategoriesVar = makeVar<Array<any>>([]);

