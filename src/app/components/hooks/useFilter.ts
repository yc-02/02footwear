import { create } from 'zustand'



type FilterState = {
    selectedsize:string[]
    selectedBrand:string[]
  };
  

export const FilterStore = create<FilterState>()(() => ({
    selectedsize:[],
    selectedBrand:[],
  })
  );

export default function useFilter(){
    const {selectedsize,selectedBrand}=FilterStore()
    return{
        selectedsize,
        selectedBrand,
        setSize:(size:string)=>{
            FilterStore.setState({selectedsize:[...selectedsize,size]})
        },
        removeSize:(size:string)=>{
          const sizeToRemove = size
          const newSizes = selectedsize.filter(size=>size!==sizeToRemove)
          FilterStore.setState({selectedsize:newSizes})
        },
        setBrand:(brand:string)=>{
          FilterStore.setState({selectedBrand:[...selectedBrand,brand]})
        },
        removeBrand:(brand:string)=>{
          const brandToRemove = brand
          const newBrands = selectedBrand.filter(brand=>brand!==brandToRemove)
          FilterStore.setState({selectedBrand:newBrands})
        },
        reset:()=>{
          FilterStore.setState({selectedsize:[],selectedBrand:[]})
        }

    }
 
  }