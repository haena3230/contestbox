
import { ArrayProps } from '~/Types';
// 함수

// category treeview 저장
export const CategoryView=(array:Array<{id,label,parentID}>)=>{
  let i=0;
  let categories = new Array();
  while(array[i]!==undefined){
    let tmp = new Array();
    let j=0;
    if(array[i].parentID===null){
      tmp.push(array[i]);
      while(array[j]!==undefined){
        if(array[i].id===array[j].parentID){
          tmp.push(array[j]);
        } j++;
      }
      categories.push(tmp);
    }
    i++
  }
  return categories;
}

// 첫번째는 picked된 value 들어간 배열 생성함수
export const newStateArrayHot=(array:Array<any>)=>{
    if(!array){
        return []
    }
    else{
        let i;
        let state=[]
        state.push({
                id:array[0].id,
                label:array[0].label,
                value:true
            })
        for(i=1;i<array.length;i++){
            state.push({
                id:array[i].id,
                label:array[i].label,
                value:false
            })}
        return state;
    }
}

// 카테고리페이지 value 들어간 배열 생성함수
export const newStateArray=(array:Array<any>,pickedId:string|null)=>{
    if(!array){
        return []
    }
    else{
        let i;
        let state=[]
        state.push({
                id:array[0].id,
                label:array[0].label,
                value:true
            })
        for(i=1;i<array.length;i++){
            if(array[i].id==pickedId)
                state.push({
                    id:array[i].id,
                    label:array[i].label,
                    value:true
                })
            else
                state.push({
                    id:array[i].id,
                    label:array[i].label,
                    value:false
                })
        }
        return state;
    }
}
// search page value들어간 배열 생성
export const newStateArraySearch=(array:Array<any>)=>{
    if(!array){
        return []
    }
    else{
        let i;
        let state=[]
        for(i=0;i<array.length;i++){
            state.push({
                id:array[i].id,
                label:array[i].label,
                value:false
            })
        }
        return state;
    }
}

// filter page value 바꾸기
export const changeValue = (array:Array<ArrayProps>, id:string) =>{
    let i;
    let len = array.length
    for(i=0;i<len;i++){
        if(array[i].id == id){
            array[i].value = !array[i].value
            break;
        }
    }
    return array
}

// filter page picked 배열(id, label) return하기
export const returnPicked = (array:Array<ArrayProps>) =>{
    let state = []
    let i;
    let len = array.length
    for(i = 0 ; i < len ; i++){
        if(array[i].value)
            state.push({id : array[i].id, label : array[i].label})
    }
    return state
}

// filter 하나삭제
export const deleteFilter = (array:Array<ArrayProps>,id:string)=>{
    let i
    let len = array.length
    for (i=0;i<len;i++){
        if(array[i].id==id){
            array[i].value = false
            break
        }           
    }
    return array
}

// filter 모두삭제
export const allDelete = (array:Array<ArrayProps>) =>{
    let i;
    let len = array.length

    for(i=0;i<len;i++){
        array[i].value = false
    }
    return array
}

// 선택된 id만 포함된 배열
export const pickedIdArray=(array:Array<any>)=>{
    if(!array){
        return []
    }
    else{
        let idArray=[];
        let result=array.filter(d=>{
        return d.value===true
        });
        result.forEach((e)=>{
            idArray.push(e.id)
        });
        return(idArray);
    }
}

// 선택된 id만 포함된 배열(다차원)
export const pickedIdArraies=(array:Array<any>)=>{
    let idArray=[];
    let i=0;
    while(array[i]!=undefined){
        let result=array[i].filter(d=>{
        return d.value===true
        });
        result.forEach((e)=>{
            idArray.push(e.id)
        });
        i++;
    };
    return(idArray);
}



