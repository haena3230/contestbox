// 액션
export const CATEGORIES = 'CATEGORIES'

export const categoryAction= (test:Array<string>)=>{
    return{
        type:CATEGORIES,
        testArray:test,
    }
}
