import { create } from 'zustand'



type FilterState = {
    selectedsize:string[]
  };
  

export const FilterStore = create<FilterState>()(() => ({
    selectedsize:[]
  })
  );

export default function useFilter(){
    const {selectedsize}=FilterStore()
    return{
        selectedsize,
        setSize:(size:string)=>{
            FilterStore.setState({selectedsize:[...selectedsize,size]})
        },
        removeSize:(size:string)=>{
          const sizeToRemove = size
          const newSizes = selectedsize.filter(size=>size!==sizeToRemove)
          FilterStore.setState({selectedsize:newSizes})
        }
    }
 
  }