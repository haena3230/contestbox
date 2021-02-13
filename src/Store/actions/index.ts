// 액션
export const CATEGORIES = 'CATEGORIES'

export const categoryAction= (categories:Array<string>)=>{
    return{
        type:CATEGORIES,
        categoriesArray:categories,
    }
}