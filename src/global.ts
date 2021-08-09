// 변수 저장 cache
import {  makeVar } from '@apollo/client';


// export interface treeCategoriesProp {
//     id: string;
//     label: string;
//     parentID:boolean;
// }
export const treeCategoriesVar = makeVar<Array<any>>([]);
export const typesVar = makeVar<Array<any>>([])
export const conditionsVar = makeVar<Array<any>>([])
export const sortVar = makeVar<{
    statusName:string,
    status:string,
    statusArr:Array<boolean>
}>({
    statusName:'추천순',
    status:'LATEST',
    statusArr:[true,false,false]
})
